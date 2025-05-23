import { useQuery } from '@tanstack/react-query';
import { Button, FileInput, Label, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddProduct = () => {
  const { handleSubmit, register, reset } = useForm();
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [loading, setLoading] = useState(false);

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

  const imgHostApiKey = import.meta.env.VITE_APP_IMAGEBB_API_KEY;

  const handleAddPost = data => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);

    const url = `https://api.imgbb.com/1/upload?key=${imgHostApiKey}`;

    axios.post(url, formData).then(res => {
      setLoading(true);
      if (res.status === 200) {
        const product = {
          name: data.name,
          description,
          shortDescription,
          price: data.price,
          image: res.data.data.url,
          category: data.category,
          brand: data.brand,
        };

        fetch(`https://kinun.onrender.com/api/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              reset();
              setDescription('');
              setShortDescription('');
              toast.success(`Successfully added the product`);
              setLoading(false);
            }
          });
      }
    });
  };

  // if (isFetchingCategories) return <LoadingSpinner />;
  if (isLoadingCategories) return <LoadingSpinner />;
  // if (isFetchingBrands) return <LoadingSpinner />;
  if (isLoadingBrands) return <LoadingSpinner />;

  return (
    <main className="">
      <h4 className="font-bold text-2xl mb-10">Add A Product</h4>
      <form action="" onSubmit={handleSubmit(handleAddPost)}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput {...register('name')} type="text" sizing="md" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="shortDescription" value="Short description" />
          </div>
          <ReactQuill
            className="h-48 block"
            theme="snow"
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
            Add
          </Button>
        </div>
      </form>
    </main>
  );
};

export default AddProduct;
