import { useContext } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Button, Table } from 'flowbite-react';

const CartPage = () => {
  const { user } = useContext(AuthContext);

  const { data: cart = [], refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: () =>
      fetch(`https://kinun.onrender.com/api/cart?user=${user?.email}`).then(
        res => res.json()
      ),
  });

  const handleIncreaseQuantity = item => {
    const updatedItem = {
      quantity: item.quantity + 1,
      product: item.product._id,
      user: { email: user?.email },
    };

    fetch(`https://kinun.onrender.com/api/cart/${item._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          refetch();
        }
        if (!result.success) {
          toast.error(result.message);
        }
      });
  };

  const handleDecreaseQuantity = item => {
    const updatedItem = {
      quantity: item.quantity - 1,
      product: item.product._id,
      user: { email: user?.email },
    };

    fetch(`https://kinun.onrender.com/api/cart/${item._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          refetch();
        }
        if (!result.success) {
          toast.error(result.message);
        }
      });
  };

  const handleRemoveFromCart = itemId => {
    fetch(`https://kinun.onrender.com/api/cart/${itemId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          refetch();
        }
      });
  };

  const handleClearCart = () => {
    fetch(`https://kinun.onrender.com/api/cart?user=${user?.email}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          refetch();
        }
        if (!result.success) {
          toast.error(result.message);
        }
      });
  };

  const calculateSubtotal = () => {
    let subtotal = 0;

    // Iterate through each item in the cart
    cart?.cart?.forEach(item => {
      // Multiply quantity with the price and add to subtotal
      subtotal += item.quantity * item.product.price;
    });

    return subtotal;
  };

  return (
    <main>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col xl:flex-row gap-14">
          <div className="basis-4/5">
            <div className="flex justify-between">
              <h3 className="text-2xl font-semibold mb-5">Shopping Cart</h3>
              <h3 className="text-2xl font-semibold mb-5">
                {cart?.cart?.length} Items
              </h3>
            </div>
            <Table className="border">
              <Table.Head>
                <Table.HeadCell>Product</Table.HeadCell>
                <Table.HeadCell>Brand</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Quantity</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Total Price</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {cart?.cart?.map(item => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={item._id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      <span className="flex items-center gap-2">
                        <img
                          className="h-14 w-14 border"
                          src={item.product.image}
                          alt={item.product.slug}
                        />
                        <h6>
                          <Link
                            className="hover:underline"
                            to={`/products/${item.product.category.slug}/${item.product.slug}`}
                          >
                            {item.product.name}
                          </Link>
                        </h6>
                      </span>
                    </Table.Cell>
                    <Table.Cell>{item.product.brand.name}</Table.Cell>
                    <Table.Cell>{item.product.category.name}</Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button
                          color="gray"
                          pill
                          onClick={() => handleDecreaseQuantity(item)}
                          disabled={item.quantity === 1 ? true : false}
                        >
                          <AiOutlineMinus />
                        </Button>
                        <span className="font-semibold">{item.quantity}</span>
                        <Button
                          color="gray"
                          pill
                          disabled={item.quantity === 5 ? true : false}
                          onClick={() => handleIncreaseQuantity(item)}
                        >
                          <AiOutlinePlus />
                        </Button>
                      </div>
                    </Table.Cell>
                    <Table.Cell>${item.product.price}</Table.Cell>
                    <Table.Cell>
                      ${item.quantity * item.product.price}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        color="gray"
                        pill
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div className="mt-8">
              <Button
                className="ml-auto"
                color="failure"
                disabled={cart?.cart?.length === 0 ? true : false}
                onClick={() => handleClearCart()}
              >
                Clear Cart
              </Button>
            </div>
          </div>
          <div className="basis-1/5">
            <h3 className="text-2xl font-semibold mb-5">Order Summary</h3>
            <div className="border shadow-md p-4 rounded-lg">
              <div className="flex justify-between font-semibold">
                <h6>Subtotal</h6>
                <h6>${calculateSubtotal()}</h6>
              </div>
              <div className="flex justify-between font-semibold">
                <h6>Total</h6>
                <h6>${calculateSubtotal()}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
