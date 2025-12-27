from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import requests

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Define Models
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


# Mailgun Email Function
def send_email_via_mailgun(to_email: str, subject: str, text: str, html: str = None):
    """Send email using Mailgun API"""
    try:
        mailgun_api_key = os.environ.get('MAILGUN_API_KEY')
        mailgun_domain = os.environ.get('MAILGUN_DOMAIN', 'sandbox9876543210abcdef1234567890abcde.mailgun.org')
        sender_email = os.environ.get('SENDER_EMAIL')
        
        url = f"https://api.mailgun.net/v3/{mailgun_domain}/messages"
        
        data = {
            "from": f"Portfolio Contact <{sender_email}>",
            "to": [to_email],
            "subject": subject,
            "text": text
        }
        
        if html:
            data["html"] = html
        
        response = requests.post(
            url,
            auth=("api", mailgun_api_key),
            data=data,
            timeout=10
        )
        
        if response.status_code == 200:
            logger.info(f"Email sent successfully to {to_email}")
            return True
        else:
            logger.error(f"Failed to send email: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        logger.error(f"Error sending email: {str(e)}")
        return False


# Routes
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running"}


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    """Handle contact form submissions - store in DB and send email"""
    try:
        # Create contact message object
        contact_dict = input.model_dump()
        contact_obj = ContactMessage(**contact_dict)
        
        # Store in database
        doc = contact_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        await db.contact_messages.insert_one(doc)
        
        # Send email notification to receiver
        receiver_email = os.environ.get('RECEIVER_EMAIL')
        email_subject = f"Portfolio Contact: {contact_obj.subject}"
        email_text = f"""
New contact form submission from your portfolio website:

Name: {contact_obj.name}
Email: {contact_obj.email}
Subject: {contact_obj.subject}

Message:
{contact_obj.message}

---
Received at: {contact_obj.timestamp.strftime('%Y-%m-%d %H:%M:%S UTC')}
        """
        
        email_html = f"""
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #2c3e50; border-bottom: 3px solid #e74c3c; padding-bottom: 10px;">
            New Contact Form Submission
        </h2>
        
        <div style="background-color: white; padding: 20px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> {contact_obj.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> 
                <a href="mailto:{contact_obj.email}" style="color: #3498db;">{contact_obj.email}</a>
            </p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> {contact_obj.subject}</p>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #ecf0f1; border-left: 4px solid #3498db; border-radius: 3px;">
                <p style="margin: 0;"><strong>Message:</strong></p>
                <p style="margin: 10px 0 0 0; white-space: pre-wrap;">{contact_obj.message}</p>
            </div>
        </div>
        
        <p style="margin-top: 20px; font-size: 12px; color: #7f8c8d;">
            Received at: {contact_obj.timestamp.strftime('%Y-%m-%d %H:%M:%S UTC')}
        </p>
    </div>
</body>
</html>
        """
        
        # Send email (non-blocking, don't fail if email fails)
        send_email_via_mailgun(receiver_email, email_subject, email_text, email_html)
        
        return contact_obj
        
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process contact form")


@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (admin endpoint)"""
    try:
        messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for msg in messages:
            if isinstance(msg['timestamp'], str):
                msg['timestamp'] = datetime.fromisoformat(msg['timestamp'])
        
        return messages
    except Exception as e:
        logger.error(f"Error retrieving contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve messages")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
