import Carousel from 'react-multi-carousel';

const FeaturedBrands = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <Carousel
          responsive={responsive}
          autoPlay
          arrows={false}
          autoPlaySpeed={1000}
          infinite
        >
          <div className="h-24 m-4 flex items-center justify-center">
            <img className="h-auto w-28" src="/apple.png" alt="" />
          </div>
          <div className="h-24 m-4 flex items-center justify-center">
            <img className="h-auto w-28" src="/samsung.webp" alt="" />
          </div>
          <div className="h-24 m-4 flex items-center justify-center">
            <img className="h-auto w-28" src="/jbl.png" alt="" />
          </div>
          <div className="h-24 m-4 flex items-center justify-center">
            <img className="h-auto w-28" src="/a4tech.png" alt="" />
          </div>
          <div className="h-24 m-4 flex items-center justify-center">
            <img className="h-auto w-28" src="/logitech.png" alt="" />
          </div>
          <div className="h-24 m-4 flex items-center justify-center">
            <img className="h-auto w-28" src="/edifier.png" alt="" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedBrands;
