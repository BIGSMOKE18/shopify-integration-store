import api from "./api";

export const getProducts = async () => {
  const response = await api.get(
    "/storefront/products"
  );

  return response.data;
};

export const getProduct = async (
  handle
) => {
  const response = await api.get(
    `/storefront/products/${handle}`
  );

  return response.data;
};