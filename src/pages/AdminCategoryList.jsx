import { useQuery } from '@tanstack/react-query';
import { Button, Table } from 'flowbite-react';
import React, { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import EditCategoryModal from '../modals/EditCategoryModal';
import { HiPlus } from 'react-icons/hi';
import UploadCategoryModal from '../modals/UploadCategoryModal';
import DeletePopup from '../modals/DeletePopup';

const AdminCategoryList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [openUploadCategoryModal, setOpenUploadCategoryModal] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  const {
    data: categories = [],
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      fetch('https://kinun.onrender.com/api/categories').then(res =>
        res.json()
      ),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <main>
      <div className="mb-2">
        {' '}
        <Button color="light" onClick={() => setOpenUploadCategoryModal(true)}>
          Add Category
          <HiPlus className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <h4 className="font-bold text-2xl mb-10">Categories</h4>
      <div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Category name</Table.HeadCell>

            <Table.HeadCell>Action</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {categories.categories.map(category => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={category._id}
              >
                <Table.Cell>
                  <span className="font-semibold">{category.name}</span>
                </Table.Cell>

                <Table.Cell>
                  <Button
                    className="text-white"
                    color="warning"
                    size="xs"
                    onClick={() => {
                      setOpenEditCategoryModal(true);
                      setCategoryData(category);
                    }}
                  >
                    Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className="text-white"
                    color="failure"
                    size="xs"
                    onClick={() => {
                      setOpenModal(true);
                      setCategoryId(category._id);
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
      <UploadCategoryModal
        openUploadCategoryModal={openUploadCategoryModal}
        setOpenUploadCategoryModal={setOpenUploadCategoryModal}
        refetch={refetch}
      />
      <EditCategoryModal
        openEditCategoryModal={openEditCategoryModal}
        setOpenEditCategoryModal={setOpenEditCategoryModal}
        categoryData={categoryData}
        refetch={refetch}
      />
      <DeletePopup
        openModal={openModal}
        setOpenModal={setOpenModal}
        path={'categories'}
        id={categoryId}
        refetch={refetch}
        deletingName={'Category'}
      />
    </main>
  );
};

export default AdminCategoryList;
