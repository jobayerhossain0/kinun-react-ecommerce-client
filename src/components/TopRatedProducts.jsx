import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import ProductCard from './ProductCard';
import { Button } from 'flowbite-react';

const TopRatedProducts = () => {
  const {
    data: products = [],
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: 'products',
    queryFn: () =>
      fetch('https://kinun.onrender.com/api/products').then(res => res.json()),
  });

  if (isFetching) return <LoadingSpinner />;
  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="container mx-auto py-10 px-4 lg:px-0">
        <h2 className="text-center font-bold text-3xl mb-2">
          Top Rated Products
        </h2>
        <p className="text-center font-semibold">
          Check out our top rated products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-20">
          {products.products
            .sort((a, b) => b.rating.rate - a.rating.rate)
            .map(product => {
              if (index < 4)
                return <ProductCard key={product._id} product={product} />;
            })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/products/all">
            <Button
              className="mx-auto md:m-0 shadow"
              gradientDuoTone="purpleToBlue"
            >
              All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopRatedProducts;
