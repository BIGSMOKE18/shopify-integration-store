import requests

from app.config.settings import(
    SHOPIFY_STORE_URL,
    SHOPIFY_ADMIN_TOKEN,
    SHOPIFY_API_VERSION
)

def get_products():
    url = (
        f"https://{SHOPIFY_STORE_URL}"
        f"/admin/api/{SHOPIFY_API_VERSION}/products.json"
    )
    headers = {
        "X-Shopify-Access-Token":SHOPIFY_ADMIN_TOKEN,
        "Content-Type": "application/json"
    }

    response=requests.get(url,headers=headers)

    

    return response.json()

def create_product(title:str, price:float):

    url = (
        f"https://{SHOPIFY_STORE_URL}"
        f"/admin/api/{SHOPIFY_API_VERSION}/products.json"
    )
    headers = {
        "X-Shopify-Access-Token":SHOPIFY_ADMIN_TOKEN,
        "Content-Type": "application/json"
    }

    payload = {
        "product": {
            "title": title,
            "variants":[
                {
                    "price": str(price)
                }
            ]
        }
    }

    response=requests.post(url,headers=headers,json=payload)

    return response.json()


def update_product(product_id:int, title:str, price:float):

    url = (
        f"https://{SHOPIFY_STORE_URL}"
        f"/admin/api/{SHOPIFY_API_VERSION}/products/{product_id}.json"
    )
    headers = {
        "X-Shopify-Access-Token":SHOPIFY_ADMIN_TOKEN,
        "Content-Type": "application/json"
    }

    payload = {
        "product": {
            "id": product_id,
            "title": title,
            "variants":[
                {
                    "price": str(price)
                }
            ]
        }
    }

    response=requests.put(url,headers=headers,json=payload)

    return response.json()


def delete_product(product_id):

    url = (
        f"https://{SHOPIFY_STORE_URL}"
        f"/admin/api/{SHOPIFY_API_VERSION}"
        f"/products/{product_id}.json"
    )

    headers = {
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        "Content-Type": "application/json"
    }

    response = requests.delete(
        url,
        headers=headers
    )

    return {
        "status_code": response.status_code,
        "message": "Product deleted successfully"
    }


def get_orders():

    url = (
        f"https://{SHOPIFY_STORE_URL}"
        f"/admin/api/{SHOPIFY_API_VERSION}"
        f"/orders.json"
    )

    headers = {
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        "Content-Type": "application/json"
    }

    response = requests.get(
        url,
        headers=headers
    )

    return response.json()        

def get_order_by_id(order_id):

    url = (
        f"https://{SHOPIFY_STORE_URL}"
        f"/admin/api/{SHOPIFY_API_VERSION}"
        f"/orders/{order_id}.json"
    )

    headers = {
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        "Content-Type": "application/json"
    }

    response = requests.get(
        url,
        headers=headers
    )

    return response.json()


def get_customers():

    url = (
        f"https://{SHOPIFY_STORE_URL}"
        f"/admin/api/{SHOPIFY_API_VERSION}"
        f"/customers.json"
    )

    headers = {
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        "Content-Type": "application/json"
    }

    response = requests.get(
        url,
        headers=headers
    )

    return response.json()

def get_customer_by_id(customer_id):

    url = (
        f"https://{SHOPIFY_STORE_URL}"
        f"/admin/api/{SHOPIFY_API_VERSION}"
        f"/customers/{customer_id}.json"
    )

    headers = {
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        "Content-Type": "application/json"
    }

    response = requests.get(
        url,
        headers=headers
    )

    return response.json()


def create_customer(
    first_name,
    last_name,
    email
):

    url = (
        f"https://{SHOPIFY_STORE_URL}"
        f"/admin/api/{SHOPIFY_API_VERSION}"
        f"/customers.json"
    )

    headers = {
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        "Content-Type": "application/json"
    }

    payload = {
        "customer": {
            "first_name": first_name,
            "last_name": last_name,
            "email": email
        }
    }

    response = requests.post(
        url,
        headers=headers,
        json=payload
    )

    return response.json()

def update_customer(
    customer_id,
    first_name,
    last_name,
    email
):

    url = (
        f"https://{SHOPIFY_STORE_URL}"
        f"/admin/api/{SHOPIFY_API_VERSION}"
        f"/customers/{customer_id}.json"
    )

    headers = {
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        "Content-Type": "application/json"
    }

    payload = {
        "customer": {
            "id": customer_id,
            "first_name": first_name,
            "last_name": last_name,
            "email": email
        }
    }

    response = requests.put(
        url,
        headers=headers,
        json=payload
    )

    return response.json()                    