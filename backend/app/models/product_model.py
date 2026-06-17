from pydantic import BaseModel

class ProductCreate(BaseModel):
    title: str
    price: float

class ProductUpdate(BaseModel):
    title: str
    price: float    