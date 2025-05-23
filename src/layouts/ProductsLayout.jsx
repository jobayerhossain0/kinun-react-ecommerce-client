import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/LoadingSpinner';
import { Accordion, Checkbox, Label, Radio, Select } from 'flowbite-react';
import SearchProduct from '../components/SearchProduct';
import { ApiUrlContext } from '../contexts/ApiUrlProvider';
import CatNBrandSkeleton from '../loadingSkeletons/CatNBrandSkeleton';

const ProductsLayout = () => {
  const { setCategoryQuery, setBrandQuery, setSortQuery, data } =
    useContext(ApiUrlContext);

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
  const {
    data: brands = [],
    isFetching: isBrandsFetching,
    isLoading: isBrandsLoading,
  } = useQuery({
    queryKey: ['brands'],
    queryFn: () =>
      fetch('https://kinun.onrender.com/api/brands').then(res => res.json()),
  });

  const handleCategory = e => setCategoryQuery(e.target.value);

  const handleBrand = e => setBrandQuery(e.target.value);

  const handleProductSort = e => setSortQuery(e.target.value);

  return (
    <main className="bg-[#F2F4F8]">
      <div className="container mx-auto px-4">
        <SearchProduct />
      </div>
      <div className="container mx-auto flex flex-col lg:flex-row gap-4 px-4">
        <div className="basis-1/5 py-4 px-4 lg:px-0">
          {isCategoriesFetching || isCategoriesLoading ? (
            <CatNBrandSkeleton />
          ) : (
            <div className="w-full bg-white rounded-md shadow ">
              <Accordion alwaysOpen>
                <Accordion.Panel>
                  <Accordion.Title>Category</Accordion.Title>
                  <Accordion.Content>
                    <fieldset className="flex max-w-md flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <Radio
                          id="allCategories"
                          name="categories"
                          value={''}
                          onChange={handleCategory}
                        />
                        <Label htmlFor="allCategories">All</Label>
                      </div>
                      {categories?.categories?.map(category => (
                        <div
                          className="flex items-center gap-2"
                          key={category._id}
                        >
                          <Radio
                            id={category.slug}
                            name="categories"
                            value={category.slug}
                            onChange={handleCategory}
                          />
                          <Label htmlFor={category.slug}>{category.name}</Label>
                        </div>
                      ))}
                    </fieldset>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>
          )}

          {isBrandsFetching || isBrandsLoading ? (
            <CatNBrandSkeleton />
          ) : (
            <div className="w-full bg-white rounded-md shadow mt-2">
              <Accordion alwaysOpen>
                <Accordion.Panel>
                  <Accordion.Title>Brand</Accordion.Title>
                  <Accordion.Content>
                    <fieldset className="flex max-w-md flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <Radio
                          id="allBrands"
                          name="brands"
                          value={''}
                          onChange={handleBrand}
                        />
                        <Label htmlFor="allBrands">All</Label>
                      </div>
                      {brands?.brands?.sort().map(brand => (
                        <div
                          className="flex items-center gap-2"
                          key={brand._id}
                        >
                          <Radio
                            id={brand.slug}
                            name="brands"
                            value={brand.slug}
                            onChange={handleBrand}
                          />
                          <Label htmlFor={brand.slug}>{brand.name}</Label>
                        </div>
                      ))}
                    </fieldset>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>
          )}
        </div>
        <div className="basis-full py-4">
          <div>
            <div className="bg-white py-2 px-2 mb-2 flex items-center justify-between rounded-lg shadow">
              <h2 className="text-lg font-bold">Products</h2>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">Sort By: </p>
                <div>
                  <Select
                    className="w-full"
                    sizing="sm"
                    onChange={handleProductSort}
                  >
                    <option value="">Default</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="-price">Price (High to Low)</option>
                  </Select>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsLayout;
