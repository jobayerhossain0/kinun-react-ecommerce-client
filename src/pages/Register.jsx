import { Button, Label, TextInput } from 'flowbite-react';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BiLogIn } from 'react-icons/bi';
import GoogleButton from 'react-google-button';
import { AuthContext } from '../contexts/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import PageTitle from '../components/PageTitle';

const Register = () => {
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const { handleSubmit, register } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  const handleRegister = data => {
    createUser(data.email, data.password)
      .then(() => {
        updateUser(data.name)
          .then(() => {})
          .catch(err => console.error(err));
        navigate(from, { replace: true });
        toast.success('Registration successful');
      })
      .catch(err => console.error(err));
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        navigate(from, { replace: true });
        toast.success('Registration successful');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="h-screen">
      <PageTitle titleName={'Register'} />
      <div className="container mx-auto py-20 px-4 lg:px-0">
        <h2 className="font-bold text-center text-4xl mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500 pb-1">
          Register
        </h2>
        <div className="max-w-md mx-auto">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleRegister)}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name1" value="Your name" />
              </div>
              <TextInput
                {...register('name')}
                type="name"
                placeholder="Full name"
                required={true}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                {...register('email')}
                type="email"
                placeholder="example@email.com"
                required={true}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput
                {...register('password')}
                type="password"
                required={true}
              />
            </div>

            <Button gradientDuoTone="purpleToBlue" type="submit">
              <BiLogIn /> Register
            </Button>
            <p className="text-center">
              Already have an account?{' '}
              <Link className="font-bold" to="/login">
                Login
              </Link>
            </p>
          </form>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray- font-semibold">
              OR
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <GoogleButton
            className="mx-auto"
            onClick={() => handleGoogleSignIn()}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
