import { Combobox, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const SearchProduct = () => {
  const {
    data: products = [],
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      fetch(`https://kinun.onrender.com/api/products`).then(res => res.json()),
  });

  const [selected, setSelected] = useState(products?.products);
  const [query, setQuery] = useState('');

  const filteredProducts =
    query === ''
      ? products?.products
      : products?.products.filter(product =>
          product.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative pt-4">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            placeholder="Search product"
            displayValue={product => product.name}
            onChange={event => setQuery(event.target.value)}
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
            {filteredProducts?.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredProducts?.map(product => (
                <Combobox.Option
                  key={product._id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-2 pr-4 ${
                      active ? 'bg-purple-700 text-white' : 'text-gray-900'
                    }`
                  }
                  value={product.name}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        <Link
                          to={`/products/${product.category.slug}/${product.slug}`}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              className="border"
                              src={product.image}
                              width={50}
                              height={50}
                              alt=""
                            />
                            <span className="font-semibold">
                              {product.name}
                            </span>
                          </div>
                        </Link>
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default SearchProduct;
