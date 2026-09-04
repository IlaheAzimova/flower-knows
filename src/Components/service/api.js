import axios from "axios";

const BASE_URL = "https://flower-knows-data.vercel.app/api";

export async function getProducts() {
    const response = await axios.get(`${BASE_URL}/products`);
    const data = response.data;
    return Array.isArray(data) ? data : (data.products || []);
}

export async function getCategories() {
    const response = await axios.get(`${BASE_URL}/categories`);
    const data = response.data;
    return Array.isArray(data) ? data : (data.categories || []);
}

export async function getPreviousCollections() {
    const response = await axios.get(`${BASE_URL}/previouscollections`);
    return response.data?.collections || [];
}