from pydantic import BaseModel, EmailStr

class CustomerCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr

class CustomerUpdate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr    