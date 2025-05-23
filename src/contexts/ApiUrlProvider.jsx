import { useQuery } from '@tanstack/react-query';
import { createContext, useState } from 'react';
import useFetchProducts from '../hooks/useFetchProducts';

export const ApiUrlContext = createContext();

const ApiUrlProvider = ({ children }) => {
  const [productApi, setProductApi] = useState(
    `https://kinun.onrender.com/api/products/`
  );
  const [categoryQuery, setCategoryQuery] = useState('');
  const [brandQuery, setBrandQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('');

  const { data, isLoading } = useFetchProducts(
    categoryQuery,
    brandQuery,
    sortQuery
  );

  // const {
  //   data: products = [],
  //   isFetching,
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: () => fetch(productApi).then(res => res.json()),
  // });

  const value = {
    categoryQuery,
    setCategoryQuery,
    brandQuery,
    setBrandQuery,
    sortQuery,
    setSortQuery,
    data,
    isLoading,
  };

  return (
    <ApiUrlContext.Provider value={value}>{children}</ApiUrlContext.Provider>
  );
};

export default ApiUrlProvider;
