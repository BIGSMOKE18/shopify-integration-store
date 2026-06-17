import requests

from app.config.settings import (
    SHOPIFY_STORE_URL,
    SHOPIFY_API_VERSION,
    SHOPIFY_STOREFRONT_TOKEN
)


def get_storefront_products():

    url = (
        f"https://{SHOPIFY_STORE_URL}"
        f"/api/{SHOPIFY_API_VERSION}/graphql.json"
    )

    headers = {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN
    }

    query = """
    {
      products(first: 20) {
        nodes {
          id
          title
          description
          handle
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
    """

    response = requests.post(
        url,
        headers=headers,
        json={"query": query}
    )

    return response.json()


def get_product_by_handle(handle):

    url = (
        f"https://{SHOPIFY_STORE_URL}"
        f"/api/{SHOPIFY_API_VERSION}/graphql.json"
    )

    headers = {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN
    }

    query = f"""
    {{
      product(handle: "{handle}") {{
        id
        title
        description

        variants(first: 1) {{
          nodes {{
            price {{
              amount
              currencyCode
            }}
          }}
        }}

        images(first: 5) {{
          nodes {{
            url
          }}
        }}
      }}
    }}
    """

    response = requests.post(
        url,
        headers=headers,
        json={"query": query}
    )

    return response.json()