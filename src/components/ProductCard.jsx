import { Button } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { CgDetailsMore } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { AuthContext } from '../contexts/AuthProvider';
import parse from 'html-react-parser';

const ProductCard = ({ product }) => {
  const [wishlist, setWishlist] = useState(false);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(false);

  const { _id, name, slug, price, image, category, shortDescription } = product;
  const { slug: categorySlug } = category;

  const handleAddToWishlist = () => {
    const wishlist = {
      user: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
      product: product._id,
    };

    fetch('https://kinun.onrender.com/api/wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wishlist),
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setFavorite(true);
          toast.success(`The product added to wishlist`);
        }
      });
  };

  const handleAddToCart = productId => {
    if (!user) return toast.error(`Please login to purchase the product`);

    const item = {
      quantity: 1,
      product: productId,
      user: { email: user?.email },
    };
    fetch(`https://kinun.onrender.com/api/cart/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          toast.success(`Product added to cart successfully`);
        }
        if (!result.success) {
          toast.error(result.message);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="relative shadow bg-white p-4 rounded-lg flex flex-col justify-between  ease-in duration-75 border">
      {/* {user && (
        <span className="absolute right-4 z-50">
          <button onClick={() => setFavorite(!favorite)}>
            {favorite ? (
              <MdFavorite className="text-xl cursor-pointer" />
            ) : (
              <MdFavoriteBorder className="text-xl cursor-pointer" />
            )}
          </button>
        </span>
      )} */}

      <div>
        <Link to={`/products/${categorySlug}/${slug}`}>
          <img className="h-auto mx-auto w-full" src={image} alt="" />
        </Link>

        <Link to={`/products/${categorySlug}/${slug}`}>
          <h4 className="mt-3 font-semibold text-md hover:underline text-left">
            {name}
          </h4>
        </Link>
        <div className="[&>*:first-child]:list-disc [&>*:first-child]:ml-[18px] [&>*:first-child]:text-sm mt-2">
          {parse(shortDescription)}
        </div>
      </div>

      <div>
        <div className="h-[1px] bg-slate-200"></div>
        <h3 className="text-center font-bold text-xl mt-3">${price}</h3>

        <Button
          gradientDuoTone="purpleToBlue"
          size="xs"
          className="mx-auto mt-3"
          onClick={() => handleAddToCart(_id)}
        >
          <CgDetailsMore className="mr-2 h-5 w-5" />
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
