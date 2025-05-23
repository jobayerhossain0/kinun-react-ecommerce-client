import { createBrowserRouter } from 'react-router-dom';
import ProductsLayout from '../layouts/ProductsLayout';
import Root from '../layouts/Root';
import CartPage from '../pages/CartPage';
import Contact from '../pages/Contact';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProductDetails from '../pages/ProductDetails';
import Products from '../pages/Products';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import AdminLayout from '../layouts/AdminLayout';
import AddProduct from '../pages/AddProduct';
import AdminProductList from '../pages/AdminProductList';
import AdminRoute from './AdminRoute';
import Dashboard from '../pages/Dashboard';
import AdminCategoryList from '../pages/AdminCategoryList';
import AdminBrandList from '../pages/AdminBrandList';
import UpdateProduct from '../pages/UpdateProduct';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <ProductsLayout />,
        children: [
          {
            path: '/products',
            element: <Products />,
          },
        ],
      },
      {
        path: '/products/:category/:slug',
        element: <ProductDetails />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/cart',
        element: (
          <PrivateRoute>
            <CartPage />,
          </PrivateRoute>
        ),
      },
      {
        path: '/admin',
        element: (
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        ),
        children: [
          {
            path: '/admin',
            element: (
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            ),
          },
          {
            path: '/admin/dashboard',
            element: (
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            ),
          },
          {
            path: '/admin/add-product',
            element: (
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            ),
          },
          {
            path: '/admin/products',
            element: (
              <AdminRoute>
                <AdminProductList />
              </AdminRoute>
            ),
          },
          {
            path: '/admin/categories',
            element: (
              <AdminRoute>
                <AdminCategoryList />
              </AdminRoute>
            ),
          },
          {
            path: '/admin/brands',
            element: (
              <AdminRoute>
                <AdminBrandList />
              </AdminRoute>
            ),
          },
        ],
      },
      {
        path: '/product/update/:id',
        element: (
          <AdminRoute>
            <UpdateProduct />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
