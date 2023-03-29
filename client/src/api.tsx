import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

const BASE_URL = 'http://localhost:8000';

export const fetchItems = async () => {
  const { data } = await axios.get(`${BASE_URL}/getAllItems`);
  return data;
};

export const useItems = () => {
  return useQuery(['items'], fetchItems);
};

export interface Item {
  id: number;
  name: string;
  brand: string;
  description: string;
  images: string[];
  product_type: string;
  order: number;
  options: { [key: string]: string }[];
}

export const fetchItem = async (order: string): Promise<Item> => {
  const { data } = await axios.get<Item>(`${BASE_URL}/getProduct/${order}`);
  return data;
};

export const useItem = ({ order }: { order: string }) => {
  return useQuery<Item, Error>(['item', order], () => fetchItem(order));
};

export const fetchCart = async () => {
  const response = await axios.get(`${BASE_URL}/getCart`, {
    headers: { 'Content-type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
};

export const useCart = () => {
  return useQuery(['cart'], fetchCart);
};
//alish respond here
//
export const fetchSearch = async (productName: string) => {
  const response = await axios.get(`${BASE_URL}/getAllItems/${productName}`, {
    headers: { 'Content-type': 'application/json' },
  });
  return response.data;
};

export const useSearch = (productName: string) => {
  return useQuery(['search', productName], () => fetchSearch(productName));
};

export async function logout() {
  try {
    const response = await axios.post(
      'http://localhost:8000/logout',
      {},
      { withCredentials: true },
    );
    window.location.reload();
    return true; // User was logged out successfully
  } catch (error) {
    return false; // Error occurred while logging out
  }
}
