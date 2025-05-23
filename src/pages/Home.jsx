import Hero from '../components/Hero';
import FeaturedBrands from '../components/FeaturedBrands';

import usePageTitle from '../hooks/usePageTitle';
import FeaturedProducts from '../components/FeaturedProducts';
import PageTitle from '../components/PageTitle';

const Home = () => {
  return (
    <div>
      <PageTitle titleName={'Home'} />
      {/* <Banner /> */}
      <Hero />
      <FeaturedBrands />
      <FeaturedProducts />
      {/* <FeaturedCategory /> */}
      {/* <TopRatedProducts /> */}
    </div>
  );
};

export default Home;
