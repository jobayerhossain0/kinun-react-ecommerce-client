import { Link } from 'react-router-dom';
import useFetchProducts from '../hooks/useFetchProducts';
import FeaturedProductsSkeleton from '../loadingSkeletons/FeaturedProductsSkeleton';
import ProductCard from './ProductCard';
import { Button } from 'flowbite-react';

const FeaturedProducts = () => {
  const { data, isLoading } = useFetchProducts();
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-bold text-3xl mb-10">
          Featured Products
        </h2>

        {isLoading ? (
          <FeaturedProductsSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {data?.products
              .sort(() => Math.random() - 0.5)
              .map((product, index) => {
                if (index < 5)
                  return <ProductCard product={product} key={product._id} />;
              })}
          </div>
        )}
        <div className="mt-5 text-center h-20 flex items-center justify-center">
          <Link to="/products">
            <Button
              className="mx-auto md:m-0 shadow"
              gradientDuoTone="purpleToBlue"
              data-aos="zoom-in"
            >
              View All
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
