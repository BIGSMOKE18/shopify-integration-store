from fastapi import FastAPI
from app.routers.product_router import router as product_router
from app.routers.order_router import router as order_router
from app.routers.customer_router import router as customer_router
from app.routers.storefront_router import router as storefront_router
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(
    title="Shopify Integration API",
    version="1.0.0"
)

app.include_router(product_router)
app.include_router(order_router)
app.include_router(customer_router)
app.include_router(storefront_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Shopify Integration Backend Running"
    }