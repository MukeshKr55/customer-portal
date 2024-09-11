// src/services/api.js
import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com/";

export const fetchProducts = () => {
  return axios.get(`${API_BASE_URL}products`);
};

export const fetchOrders = () => {
  return axios.get(`${API_BASE_URL}orders`);
};

// Add more API calls as needed
