import { useQuery } from '@tanstack/react-query';
import { Button, Table } from 'flowbite-react';
import React, { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import EditCategoryModal from '../modals/EditCategoryModal';
import { HiPlus } from 'react-icons/hi';
import UploadCategoryModal from '../modals/UploadCategoryModal';
import UploadBrandModal from '../modals/UploadBrandModal';
import DeletePopup from '../modals/DeletePopup';

const AdminBrandList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [openUploadCategoryModal, setOpenUploadCategoryModal] = useState(false);
  const [openUploadBrandModal, setOpenUploadBrandModal] = useState(false);
  const [brandId, setBrandId] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  const {
    data: brands = [],
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['brands'],
    queryFn: () =>
      fetch('https://kinun.onrender.com/api/brands').then(res => res.json()),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <main>
      <div className="mb-2">
        {' '}
        <Button color="light" onClick={() => setOpenUploadBrandModal(true)}>
          Add Brand
          <HiPlus className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <h4 className="font-bold text-2xl mb-10">Brands</h4>
      <div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Brand name</Table.HeadCell>

            <Table.HeadCell>Action</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {brands?.brands?.map(brand => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={brand._id}
              >
                <Table.Cell>
                  <span className="font-semibold">{brand.name}</span>
                </Table.Cell>

                <Table.Cell>
                  <Button
                    className="text-white"
                    color="warning"
                    size="xs"
                    onClick={() => {
                      setOpenEditCategoryModal(true);
                      setCategoryData(brand);
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
                      setBrandId(brand._id);
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
        path={'brands'}
        id={brandId}
        refetch={refetch}
        deletingName={'Brand'}
      />
      <UploadBrandModal
        openUploadBrandModal={openUploadBrandModal}
        setOpenUploadBrandModal={setOpenUploadBrandModal}
        refetch={refetch}
      />
    </main>
  );
};

export default AdminBrandList;
