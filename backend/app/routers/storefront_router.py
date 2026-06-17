from fastapi import APIRouter

from app.services.storefront_service import get_storefront_products
from app.services.storefront_service import (
    get_storefront_products,
    get_product_by_handle
)

router = APIRouter()

@router.get("/storefront/products")
def fetch_storefront_products():

    return get_storefront_products()

@router.get("/storefront/products/{handle}")
def fetch_product(handle: str):

    return get_product_by_handle(handle)    