import { Button, Label, Textarea, TextInput } from 'flowbite-react';

import contactImg from '../assets/contact-img.jpg';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import usePageTitle from '../hooks/usePageTitle';
import PageTitle from '../components/PageTitle';

const Contact = () => {
  const { handleSubmit, register, reset } = useForm();

  const handleContact = data => {
    fetch('https://kinun.onrender.com/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(result => {
        if (result.contact) {
          reset();
          toast.success(`Thanks for contacting us`);
        }
      });
  };

  return (
    <div className="py-20">
      <PageTitle titleName={'Contact'} />
      <h1 className="text-center font-bold text-4xl mb-10">Contact Us</h1>
      <div className="container mx-auto flex flex-col md:flex-row  justify-between md:items-center">
        <div className="basis-full lg:basis-1/2 px-4">
          <img className="mx-auto" src={contactImg} alt="" />
        </div>
        <div className="basis-full lg:basis-1/2 px-4">
          <div className="max-w-md mx-auto">
            <form
              className="flex flex-col w-full gap-4"
              onSubmit={handleSubmit(handleContact)}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Your name" />
                </div>
                <TextInput
                  {...register('name')}
                  id="name"
                  name="name"
                  type="name"
                  placeholder="Full name"
                  required={true}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  {...register('email')}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  required={true}
                />
              </div>

              <div id="textarea">
                <div className="mb-2 block">
                  <Label htmlFor="message" value="Your message" />
                </div>
                <Textarea
                  {...register('message')}
                  name="message"
                  type="text"
                  id="message"
                  placeholder="Leave a message..."
                  required={true}
                  rows={4}
                />
              </div>

              <Button gradientDuoTone="purpleToBlue" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
