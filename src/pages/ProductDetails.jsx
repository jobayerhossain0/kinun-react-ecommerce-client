import { Badge, Button } from 'flowbite-react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';
import ProductDescription from '../components/ProductDescription';
import parse from 'html-react-parser';
import { PhotoView } from 'react-photo-view';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import toast from 'react-hot-toast';
import { addToCartAsync, selectItems } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import ProductDetailsSkeletion from '../loadingSkeletons/ProductDetailsSkeletion';

const ProductDetails = () => {
  const { slug } = useParams();
  const { user } = useContext(AuthContext);
  const items = useSelector(selectItems);
  const dispatch = useDispatch();

  const {
    data: product = [],
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['product', slug],
    queryFn: () =>
      fetch(`https://kinun.onrender.com/api/products/${slug}`).then(res =>
        res.json()
      ),
  });

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

    // if (items.findIndex(item => item.product?._id === productId) < 0) {
    //   console.log({ items, product });
    //   const newItem = {
    //     quantity: 1,
    //     product: productId,
    //     user: { email: user?.email },
    //   };
    //   dispatch(addToCartAsync({ item: newItem }));
    // } else {
    //   toast.error('This product is already in cart');
    // }
  };

  if (isFetching || isLoading) return <ProductDetailsSkeletion />;

  return (
    <div>
      {/* <h1>{slug}</h1> */}
      <div className="container mx-auto flex flex-col md:flex-row py-10 px-4 md:px-0">
        <div className="basis-full md:basis-1/2">
          <PhotoView src={product.product?.image}>
            <img
              className="w-full h-auto lg:h-full lg:w-auto mx-auto cursor-pointer"
              src={product.product?.image}
              alt=""
            />
          </PhotoView>
        </div>
        <div className="basis-full md:basis-1/2">
          <h3 className="text-2xl font-semibold">{product.product?.name}</h3>

          <div className="flex flex-wrap items-center gap-2 my-3">
            <Badge size="lg">
              Price: $
              <span className="font-bold">{product.product?.price}</span>
            </Badge>
            <Badge size="lg">
              Category:{' '}
              <span className="font-bold">
                {product.product?.category?.name}
              </span>
            </Badge>
            <Badge size="lg">
              Brand:{' '}
              <span className="font-bold">{product.product?.brand?.name}</span>
            </Badge>
            <Badge size="lg">
              Status:{' '}
              <span className="font-bold">{product.product?.status}</span>
            </Badge>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Key features</h3>
            <div className="[&>*:first-child]:list-disc [&>*:first-child]:ml-[18px]">
              {parse(product.product?.shortDescription)}
            </div>
          </div>
          <Button
            color="purple"
            size="xs"
            className="mt-3"
            onClick={() => handleAddToCart(product.product?._id)}
          >
            <BsCartPlus className="mr-2 h-5 w-5" />
            Add to cart
          </Button>
        </div>
      </div>

      <ProductDescription
        title={product.product?.name}
        description={product.product?.description}
      />
    </div>
  );
};

export default ProductDetails;
