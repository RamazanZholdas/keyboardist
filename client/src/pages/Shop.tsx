import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import Select from 'react-select';
import { useItems, useSearch, useSort } from '../api';

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

const Shop = () => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'rgb(75, 85, 99)',
      border: 'none',
      borderRadius: 5,
      boxShadow: 'none',
      minHeight: 'auto',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgb(75, 85, 99)',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const sortFromUrl = searchParams.get('sort');
  const { productName } = useParams<{ productName?: string }>();
  const {
    data: items,
    isLoading,
    isError,
  } = sortFromUrl ? useSort(sortFromUrl) : productName ? useSearch(productName) : useItems();
  // const { data: items, isLoading, isError } = useItems();
  const [sortType, setSortType] = useState('');
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortType = event.target.value;
    console.log('Selected sort type:', newSortType);
    setSortType(newSortType);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('sort', newSortType);
    navigate(`?sort=${newSortType}`);
  };
  const options = [
    { value: 'aser', label: 'aser' },
    { value: 'apple', label: 'apple' },
  ];

  if (isLoading) {
    return (
      <div className="minHeight">
        <div className="flex items-center justify-center space-x-2 animate-bounce">
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <div className="w-8 h-8 bg-green-400 rounded-full"></div>
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 xl:px-0 py-4">
      <div className="text-white">
        <h1 className="font-extrabold text-4xl text-center mb-10">Shop</h1>

        <div className="flex gap-4 text-lg font-bold justify-between">
          <div id="filters" className="flex gap-4 flex-wrap">
            <div className="item">
              <Select
                options={options}
                isMulti
                placeholder="Brand"
                className="text-white"
                styles={customStyles}
              />
            </div>
          </div>
          <div id="sort">
            <select
              className="px-4 py-2 w-full bg-gray-600 rounded-md border-transparent focus:border-gray-500 focus:ring-0 text-md w-40 appearance-none"
              onChange={handleSortChange}
              value={sortType}>
              <option value="">Sort</option>
              <option value="price_asc">Price asc</option>
              <option value="price_desc">Price desc</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 my-10 pb-96">
        {items &&
          items.map((product: Product) => (
            <Link to={`/product/${product.order}`} key={product.order}>
              <div className="bg-gray-600/40 rounded-md p-5 text-white flex flex-col justify-center items-center">
                <div className="mb-4">
                  <img src={product.images[0]} alt="arrival" className="h-64 object-contain" />
                </div>
                <div>
                  <h1 className="font-extrabold mb-2">{product.name}</h1>
                  <h2 className="font-bold">{product?.options[0]['price']} $</h2>
                </div>
              </div>
            </Link>
          ))}

        {/*{products.map((product: Product) => (*/}
        {/*  <Link to={`/product/${product.order}`}>*/}
        {/*    <div className="bg-gray-600/40 rounded-md p-5 text-white flex flex-col justify-center items-center">*/}
        {/*      <div className="mb-4">*/}
        {/*        <img src={product.images[0]} alt="arrival" className="h-64 object-contain" />*/}
        {/*      </div>*/}
        {/*      <div>*/}
        {/*        <h1 className="font-extrabold mb-2">{product.name}</h1>*/}
        {/*        <h2 className="font-bold">{product?.options[0]['price']} $</h2>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </Link>*/}
        {/*))}*/}
      </div>
    </div>
  );
};

export { Shop };

{
  /*<Link to="/product">
          <div className="bg-gray-600/40 rounded-md p-5 text-white flex flex-col justify-center items-center">
            <div className="mb-4">
              <img
                src="https://cdn.shopify.com/s/files/1/1473/3902/products/0_96b338f0-446d-43ed-83a0-7a26c5d3dead_900x.jpg?v=1665646319"
                alt="arrival"
                className="h-64 object-contain"
              />
            </div>
            <div>
              <h1 className="font-extrabold mb-2">Luna 80</h1>
              <h2 className="font-bold">499 $</h2>
            </div>
          </div>
        </Link> */
}
