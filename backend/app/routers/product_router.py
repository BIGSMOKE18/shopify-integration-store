from fastapi import APIRouter
from app.services.shopify_services import get_products

router = APIRouter()

@router.get("/products")
def fetch_products():
    return get_products()

from app.models.product_model import ProductCreate
from app.services.shopify_services import (create_product, get_products)

@router.post("/products")
def add_product(product: ProductCreate):
    return create_product(
        product.title,
        product.price
    )


from app.models.product_model import (ProductCreate, ProductUpdate)
from app.services.shopify_services import (create_product, get_products, update_product)

@router.put("/products/{product_id}")
def edit_product(product_id: int, product: ProductUpdate):
    return update_product(
        product_id,
        product.title,
        product.price
    )

from app.services.shopify_services import (create_product, get_products, update_product, delete_product)

@router.delete("/product/{product_id}")
def remove_product(product_id: int):
    return delete_product(product_id)
