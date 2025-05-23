import { Button } from 'flowbite-react';

import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="font-extrabold font-Rubik-Gemstones text-9xl">404</h1>
      <p className="font-bold text-xl">Page not found :(</p>
      <Link to="/">
        <Button gradientDuoTone="purpleToBlue">Back to homepage</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
