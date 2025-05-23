const ProductReviews = ({ rating }) => {
  return (
    <div className="bg-[#F2F4F8] px-4 md:px-0">
      <div className="container mx-auto py-5">
        <div className="bg-white p-5 w-full lg:w-1/2 rounded-lg shadow">
          <h4 className="font-semibold text-xl mb-5">
            Reviews ({rating.count})
          </h4>
          <p> Avarage rating: {rating.rate}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
