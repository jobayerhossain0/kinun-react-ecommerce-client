import { useQuery } from '@tanstack/react-query';
import usePageTitle from '../hooks/usePageTitle';
import Skeleton from 'react-loading-skeleton';

const Dashboard = () => {
  usePageTitle('Dashboard');

  //products fetching
  const {
    data: products = [],
    isFetching: isProductsFetching,
    isLoading: isProductsLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      fetch('https://kinun.onrender.com/api/products').then(res => res.json()),
  });

  //categories fetching
  const {
    data: categories = [],
    isFetching: isCategoriesFetching,
    isLoading: isCategoriesLoading,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      fetch('https://kinun.onrender.com/api/categories').then(res =>
        res.json()
      ),
  });

  //brands fetching
  const {
    data: brands = [],
    isFetching: isBrandsFetching,
    isLoading: isBrandsLoading,
  } = useQuery({
    queryKey: ['brands'],
    queryFn: () =>
      fetch('https://kinun.onrender.com/api/brands').then(res => res.json()),
  });

  return (
    <main>
      <h4 className="font-bold text-2xl mb-10">Dashboard</h4>

      <div className="flex gap-10">
        {isProductsFetching || isProductsLoading ? (
          <Skeleton
            className="shadow"
            height={100}
            width={100}
            borderRadius={8}
          />
        ) : (
          <div className="flex flex-col items-center border p-4 rounded-xl shadow">
            <h2 className="text-4xl font-bold">{products.products.length}</h2>

            <h5 className="text-xl font-semibold">Products</h5>
          </div>
        )}

        {isCategoriesFetching || isCategoriesLoading ? (
          <Skeleton
            className="shadow"
            height={100}
            width={100}
            borderRadius={8}
          />
        ) : (
          <div className="flex flex-col items-center border p-4 rounded-xl shadow">
            <h2 className="text-4xl font-bold">
              {categories.categories.length}
            </h2>
            <h5 className="text-xl font-semibold">Categories</h5>
          </div>
        )}

        {isBrandsFetching || isBrandsLoading ? (
          <Skeleton
            className="shadow"
            height={100}
            width={100}
            borderRadius={8}
          />
        ) : (
          <div className="flex flex-col items-center border p-4 rounded-xl shadow">
            <h2 className="text-4xl font-bold">{brands.brands.length}</h2>
            <h5 className="text-xl font-semibold">Brands</h5>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
