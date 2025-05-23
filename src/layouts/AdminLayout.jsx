import { Sidebar } from 'flowbite-react';
import { HiShoppingBag, HiChartPie, HiPlus } from 'react-icons/hi';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <main className="flex">
      <div className="border-r-2">
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HiChartPie}>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Sidebar.Item>
              <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                <Sidebar.Item icon={HiPlus}>
                  <Link to="/admin/add-product">Add A Product</Link>
                </Sidebar.Item>
                <Sidebar.Item icon={HiShoppingBag}>
                  <Link to="/admin/products">Products</Link>
                </Sidebar.Item>
                <Sidebar.Item icon={HiShoppingBag}>
                  <Link to="/admin/categories">Categories</Link>
                </Sidebar.Item>
                <Sidebar.Item icon={HiShoppingBag}>
                  <Link to="/admin/brands">Brands</Link>
                </Sidebar.Item>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div className="basis-full p-4">
        <Outlet />
      </div>
    </main>
  );
};

export default AdminLayout;
