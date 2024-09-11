// src/utils/api.js

const API_BASE_URL = "https://fakestoreapi.com";

// Fetch products
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// src/utils/api.js

// Fetch user's order history (use a mock userId, e.g. 1)
export const fetchOrderHistory = async (userId = 1) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/carts/user/${userId}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};
