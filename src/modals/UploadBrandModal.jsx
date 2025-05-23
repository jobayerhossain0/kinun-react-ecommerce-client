import { Button, Modal, TextInput } from 'flowbite-react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const UploadBrandModal = ({
  openUploadBrandModal,
  setOpenUploadBrandModal,
  refetch,
}) => {
  const { handleSubmit, register, reset } = useForm();

  const handleUploadBrand = data => {
    fetch(`https://kinun.onrender.com/api/brands`, {
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
          setOpenUploadBrandModal(false);
          refetch();
          toast.success('Successfully added brand');
        }
      });
  };

  return (
    <Modal
      show={openUploadBrandModal}
      size="md"
      onClose={() => setOpenUploadBrandModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Upload brand
          </h3>
          <form action="" onSubmit={handleSubmit(handleUploadBrand)}>
            <div>
              <TextInput
                {...register('name')}
                placeholder="Brand name"
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

export default UploadBrandModal;
