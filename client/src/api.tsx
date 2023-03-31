import axios from 'axios';
import {useQuery, useMutation, UseMutationResult, useQueryClient} from '@tanstack/react-query';

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

export async function getUser() {
  const response = await axios.get(`${BASE_URL}/user`, { withCredentials: true });
  return response.data;
}

export const useUser = () => {
  return useQuery(['user'], getUser);
};


export const fetchWiki = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/getWikiPage/${id}`, {
    headers: { 'Content-type': 'application/json' },
  });
  return response.data;
};

export const useWiki = (id: string) => {
  return useQuery(['wiki', id], () => fetchWiki(id));
};

export const fetchAllNews = async () => {
  const response = await axios.get(`${BASE_URL}/getNews`, {
    headers: { 'Content-type': 'application/json' },
  });
  return response.data;
};

export const useAllNews = () => {
  return useQuery(['news'], fetchAllNews);
};


export const fetchNews = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/getNews/${id}`, {
    headers: { 'Content-type': 'application/json' },
  });
  return response.data;
};

export const useNews = (id: string) => {
  return useQuery(['news', id], () => fetchNews(id));
};


// @ts-ignore
export const changeQuantity = async ({ order, optionId, newQuantity }) => {
  try {
    const response = await axios.patch(`http://localhost:8000/changeQuantity/${order}`, { optionId, quantity: newQuantity }, { withCredentials: true});
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    // @ts-ignore
    throw new Error(error.response?.data?.message ?? "Something went wrong");
  }
};

export const useChangeQuantityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(changeQuantity, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });
};

export const payNow = async (totalPrice: any) => {
  try {
    const response = await axios.post("http://localhost:8000/payNow", {
      totalPrice: totalPrice
    }, { withCredentials: true });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchHistory = async () => {
  const response = await axios.get(`${BASE_URL}/getPurchaseHistory`, {
    headers: { 'Content-type': 'application/json' },
    withCredentials: true
  });
  return response.data;
};

export const useHistory = () => {
  return useQuery(['history'], fetchHistory);
};