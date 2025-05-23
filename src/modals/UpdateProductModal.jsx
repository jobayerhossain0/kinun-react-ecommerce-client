import { useQuery } from '@tanstack/react-query';
import {
  Button,
  FileInput,
  Label,
  Modal,
  Select,
  TextInput,
} from 'flowbite-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';

const UpdateProductModal = ({
  openUpdateProductModal,
  setOpenUpdateProductModal,
  id,
  refetch,
}) => {
  const { handleSubmit, register, reset } = useForm();
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    data: product = [],
    isFetching: isFetchingProduct,
    isLoading: isLoadingProduct,
  } = useQuery({
    queryKey: ['product'],
    queryFn: () =>
      fetch(`https://kinun.onrender.com/api/products/id/${id}`).then(res =>
        res.json()
      ),
  });

  const {
    data: categories = [],
    isFetching: isFetchingCategories,
    isLoading: isLoadingCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      fetch('https://kinun.onrender.com/api/categories').then(res =>
        res.json()
      ),
  });

  const {
    data: brands = [],
    isFetching: isFetchingBrands,
    isLoading: isLoadingBrands,
  } = useQuery({
    queryKey: ['brands'],
    queryFn: () =>
      fetch(`https://kinun.onrender.com/api/brands`).then(res => res.json()),
  });

  const handleUpdateProduct = () => {};

  return (
    <Modal
      className="h-[60vh]"
      show={openUpdateProductModal}
      size="5xl"
      onClose={() => setOpenUpdateProductModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        {isFetchingCategories ||
          isLoadingCategories ||
          isFetchingBrands ||
          isLoadingBrands ||
          isFetchingProduct ||
          (isLoadingProduct && (
            <div className="w-full h-full flex items-center justify-center">
              <p>Loading...</p>
            </div>
          ))}

        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Update Product
          </h3>
          <form action="" onSubmit={handleSubmit(handleUpdateProduct)}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                {...register('name')}
                type="text"
                sizing="md"
                defaultValue={product.name}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="shortDescription" value="Short description" />
              </div>
              <ReactQuill
                className="h-48 block"
                theme="snow"
                defaultValue={product.description}
                value={shortDescription}
                onChange={setShortDescription}
              />
            </div>
            <div className="mt-12">
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <ReactQuill
                className="h-48 block"
                theme="snow"
                defaultValue={product.shortDescription}
                value={description}
                onChange={setDescription}
              />
            </div>
            <div className="mt-12">
              <div className="mb-2 block">
                <Label htmlFor="price" value="Price" />
              </div>
              <TextInput
                {...register('price')}
                type="number"
                sizing="md"
                defaultValue={product.price}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="image" value="Image" />
              </div>
              <FileInput {...register('image')} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="select" value="Category" />
              </div>

              <Select {...register('category')}>
                {categories?.categories?.map(category => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="select" value="Brand" />
              </div>

              <Select {...register('brand')}>
                {brands?.brands?.map(brand => (
                  <option value={brand._id} key={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="mt-3">
              <Button type="submit" color="success">
                Update
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProductModal;
