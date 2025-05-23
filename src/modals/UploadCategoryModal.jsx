import { Button, Modal, TextInput } from 'flowbite-react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const UploadCategoryModal = ({
  openUploadCategoryModal,
  setOpenUploadCategoryModal,
  refetch,
}) => {
  const { handleSubmit, register, reset } = useForm();

  const handleUploadCategory = data => {
    fetch(`https://kinun.onrender.com/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          reset();
          setOpenUploadCategoryModal(false);
          refetch();
          toast.success('Successfully added category');
        }
      });
  };

  return (
    <Modal
      show={openUploadCategoryModal}
      size="md"
      onClose={() => setOpenUploadCategoryModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Upload category
          </h3>
          <form action="" onSubmit={handleSubmit(handleUploadCategory)}>
            <div>
              <TextInput
                {...register('name')}
                placeholder="Category name"
                required
              />
            </div>
            <div className="mt-3">
              <Button type="submit" color="success">
                Add
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UploadCategoryModal;
