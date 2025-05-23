import React, { useContext, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';
import { ApiUrlContext } from '../contexts/ApiUrlProvider';
import usePageTitle from '../hooks/usePageTitle';
import ProductSkeleton from '../loadingSkeletons/ProductSkeleton';
import PageTitle from '../components/PageTitle';

const Products = () => {
  const { data, isLoading } = useContext(ApiUrlContext);

  if (isLoading) return <ProductSkeleton />;

  if (data?.products?.length === 0)
    return (
      <main>
        <h2 className="text-center text-xl mt-10">
          There is no product available in this category!
        </h2>
      </main>
    );

  return (
    <main className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <PageTitle titleName={'Products'} />
      {data?.products?.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </main>
  );
};

export default Products;
