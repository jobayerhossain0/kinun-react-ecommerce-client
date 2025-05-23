import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TopHeader from '../components/TopHeader';

const Root = () => {
  return (
    <div>
      <ScrollRestoration />
      <TopHeader />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
