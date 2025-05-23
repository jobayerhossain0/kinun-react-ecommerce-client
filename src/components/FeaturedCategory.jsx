import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const FeaturedCategory = () => {
  const {
    data: categories = [],
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      fetch('https://kinun.onrender.com/api/categories').then(res =>
        res.json()
      ),
  });

  if (isFetching) return <LoadingSpinner />;
  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="container mx-auto py-10 px-4 lg:px-0">
        <h2 className="text-center font-bold text-3xl mb-2">
          Featured Category
        </h2>
        <p className="text-center font-semibold">
          Select your Desired Product from Featured Category!
        </p>

        <div className="flex justify-center items-center flex-wrap gap-10 ">
          {categories.categories.map(category => {
            return (
              <Link to={`/products/${category.slug}`} key={category._id}>
                <div className="py-8 px-10 my-5 shadow hover:shadow-2xl rounded-xl border">
                  <p className="font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500">
                    {category.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategory;
