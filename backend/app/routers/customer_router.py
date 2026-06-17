from fastapi import APIRouter

from app.models.customer_model import (
    CustomerCreate,
    CustomerUpdate
)

from app.services.shopify_services import (
    get_customers,
    get_customer_by_id,
    create_customer,
    update_customer
)

router = APIRouter()

@router.get("/customers")
def fetch_customers():
    return get_customers()

@router.get("/customers/{customer_id}")
def fetch_customer(customer_id: int):
    return get_customer_by_id(customer_id)

@router.post("/customers")
def add_customer(customer: CustomerCreate):

    return create_customer(
        customer.first_name,
        customer.last_name,
        customer.email
    )

@router.put("/customers/{customer_id}")
def edit_customer(
    customer_id: int,
    customer: CustomerUpdate
):

    return update_customer(
        customer_id,
        customer.first_name,
        customer.last_name,
        customer.email
    )            