from fastapi import APIRouter

from app.services.shopify_services import (
    get_orders,
    get_order_by_id
)
router = APIRouter()

@router.get("/orders")
def fetch_orders():
    return get_orders()

@router.get("/orders/{order_id}")   
def fetch_order(order_id: int):
    return get_order_by_id(order_id) 