from mcp.server.fastmcp import FastMCP

from app.services.shopify_services import (
    get_products,
    get_orders,
    get_order_by_id,
    get_customers,
    get_customer_by_id
)

mcp = FastMCP("Shopify MCP Server")


@mcp.tool()
def search_products():
    """
    Fetch all Shopify products
    """
    return get_products()


@mcp.tool()
def fetch_orders():
    """
    Fetch all Shopify orders
    """
    return get_orders()


@mcp.tool()
def fetch_order(order_id: int):
    """
    Fetch a Shopify order by ID
    """
    return get_order_by_id(order_id)


@mcp.tool()
def fetch_customers():
    """
    Fetch all Shopify customers
    """
    return get_customers()


@mcp.tool()
def fetch_customer(customer_id: int):
    """
    Fetch a Shopify customer by ID
    """
    return get_customer_by_id(customer_id)


print("MCP Server Started Successfully...")

if __name__ == "__main__":
    mcp.run()