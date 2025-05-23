import { useQuery } from '@tanstack/react-query';
import { Button, Table } from 'flowbite-react';
import React, { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import DeletePopup from '../modals/DeletePopup';
import UpdateProductModal from '../modals/UpdateProductModal';

const AdminProductList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateProductModal, setOpenUpdateProductModal] = useState(false);
  const [productId, setProductId] = useState(null);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      fetch('https://kinun.onrender.com/api/products').then(res => res.json()),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <main>
      <h4 className="font-bold text-2xl mb-10">All Products</h4>
      <div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>

            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products?.products?.map(product => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={product._id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <Link
                    to={`/products/${product.category.slug}/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.name}
                  </Link>
                </Table.Cell>

                <Table.Cell>{product.category.name}</Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>

                <Table.Cell>
                  <Link to={`/product/update/${product._id}`}>
                    <Button className="text-white" color="warning" size="xs">
                      Update
                    </Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className="text-white"
                    color="failure"
                    size="xs"
                    onClick={() => {
                      setOpenModal(true);
                      setProductId(product._id);
                    }}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <UpdateProductModal
        openUpdateProductModal={openUpdateProductModal}
        setOpenUpdateProductModal={setOpenUpdateProductModal}
        id={productId}
        refetch={refetch}
      />

      <DeletePopup
        openModal={openModal}
        setOpenModal={setOpenModal}
        path={'products'}
        id={productId}
        refetch={refetch}
        deletingName={'Product'}
      />
    </main>
  );
};

export default AdminProductList;
