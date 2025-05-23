import { Button, Modal, TextInput } from 'flowbite-react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const EditCategoryModal = ({
  openEditCategoryModal,
  setOpenEditCategoryModal,
  categoryData,
  refetch,
}) => {
  const { handleSubmit, register } = useForm();

  const handleEditCategory = data => {
    fetch(`https://kinun.onrender.com/api/categories/${categoryData?.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOpenEditCategoryModal(false);
          refetch();
          toast.success('Category updated successfully');
        }
      });
  };

  console.log(categoryData);

  return (
    <Modal
      show={openEditCategoryModal}
      size="md"
      onClose={() => setOpenEditCategoryModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit category
          </h3>
          <form action="" onSubmit={handleSubmit(handleEditCategory)}>
            <div>
              <TextInput
                {...register('name')}
                defaultValue={categoryData?.name}
                required
              />
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

export default EditCategoryModal;
