import React, {useEffect, useState} from 'react';
import { useCart, useChangeQuantityMutation } from '../api';
import { Link } from 'react-router-dom';


type Product = {
  id: number;
  name: string;
  brand: string;
  description: string;
  images: string[];
  product_type: string;
  order: number;
  options: { [key: string]: string }[];
};


const Cart = () => {
  const [total, setTotal] = useState(0);
  const { data: products, isLoading, error } = useCart();
  useEffect(() => {
    let newTotal = 0;
    products?.map((product: Product) => {
      newTotal += parseInt(product.options[0].price) * parseInt(product.options[0].quantity);
    });
    setTotal(newTotal);
  }, [products]);

  const { mutate, isLoading: changeLoading } = useChangeQuantityMutation();

  const handleQuantityChange = (order: string, optionId: string, newQuantity: string) => {
    mutate(
        { order, optionId, newQuantity },
        {
          onSuccess: (data) => {
            console.log('Quantity changed successfully:', data);
          },
          onError: (error) => {
            console.log('Error changing quantity:', error);
          },
        }
    );
  };

  if (isLoading) {
    return (
      <div className="minHeight">
        <div className="flex items-center justify-center space-x-2 animate-bounce">
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <div className="w-8 h-8 bg-green-400 rounded-full"></div>
          <div className="w-8 h-8 bg-black rounded-full"></div>
        </div>
      </div>
    );
  }

  if (products == null) {
    return (
      <div className="minHeight flex flex-col items-center justify-center ">
        <h1 className="text-white font-bold text-4xl">Cart is empty</h1>
        <Link to="/shop">
          <button className="mt-5">
            <p className="relative inline-block text-md font-medium text-white  group active:text-cyan-500 focus:outline-none focus:ring">
              <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-cyan-500 group-hover:translate-y-0 group-hover:translate-x-0"></span>
              <span className="relative block px-8 py-3 bg-cyan-300 border border-current">
                Go Shopping
              </span>
            </p>
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 xl:px-0 py-4 minHeight">
      <div className="text-white">
        <div className="p-4">
          <div className="font-extrabold grid-cols-6 hidden md:grid border-b-2 border-gray-500 pb-4">
            <div className="col-span-3">
              <h1>Product</h1>
            </div>
            <div className="col-span-1 text-right">
              <h1>Price</h1>
            </div>
            <div className="col-span-1 text-right">
              <h1>Quantity</h1>
            </div>
            <div className="col-span-1 text-right">
              <h1>Total</h1>
            </div>
          </div>

          {products?.map((product: Product, index: number) => (
            <div key={index} className="grid grid-cols-2 md:grid-cols-6 my-4 border-b-2 border-gray-500 pb-4">
              <div className="col-span-2 md:col-span-3 flex">
                <img src={product?.images[0]} alt="" className="max-h-32" />
                <div>
                  <h1 className="pl-4 font-bold">{product?.name}</h1>
                  <p className="pl-4 capitalize">{product?.options[0]['option']}</p>
                </div>
              </div>
              <h1 className="text-left font-bold md:text-right col-span-2 md:col-span-1 py-2 md:py-0">
                {product?.options[0]['price']}$
              </h1>
              <div className="col-span-2 md:col-span-1 flex justify-start md:justify-end">
                <div className="flex flex-row h-10 w-24 rounded-lg relative bg-transparent">
                  <button className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                          onClick={() => handleQuantityChange(product?.order.toString(), product?.options[0]['optionId'], "-1")} disabled={isLoading}>
                    <span className="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input
                    type="text"
                    className="outline-none focus:outline text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                    name="custom-input-number"
                    value={product?.options[0]['quantity']}></input>
                  <button className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                          onClick={() => handleQuantityChange(product?.order.toString(), product?.options[0]['optionId'], "1")} disabled={isLoading || (product.options[0]['inStock'] == product.options[0]['quantity'])}>
                    <span className="my-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
              <h1 className="font-bold mt-4 md:hidden">Total</h1>
              <h1 className="text-right mt-4 md:mt-0 md:block">
                {parseInt(product?.options[0]['price']) * parseInt(product?.options[0]['quantity'])}
                $
              </h1>
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h1 className="mb-2">Add a note to your order</h1>
              <textarea
                name=""
                id=""
                className="rounded-md w-full md:w-80 h-20 text-black p-2"></textarea>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="mb-2 font-extrabold">Subtotal: {total}$</h1>
              <h2 className="mb-2">Taxes and shipping calculated at checkout</h2>
              <Link to={`/checkout?total=${total}`} className="px-4 py-2 bg-cyan-300 font-bold rounded-md">CHECK OUT</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Cart };
