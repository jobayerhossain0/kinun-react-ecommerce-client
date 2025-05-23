import { useQuery } from '@tanstack/react-query';

function useFetchProducts(categoryQuery = '', brandQuery = '', sortQuery = '') {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [categoryQuery, brandQuery, sortQuery],
    queryFn: () =>
      fetch(
        `https://kinun.onrender.com/api/products/?category=${categoryQuery}&brand=${brandQuery}&sort=${sortQuery}`
      ).then(res => res.json()),
  });

  return { data, isLoading, refetch };
}

export default useFetchProducts;
