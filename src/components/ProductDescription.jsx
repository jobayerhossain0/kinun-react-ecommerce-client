import parse from 'html-react-parser';

const ProductDescription = ({ description }) => {
  return (
    <div className="bg-[#F2F4F8] px-4">
      <div className="container mx-auto py-5">
        <div className="bg-white p-5 w-full lg:w-1/2 rounded-lg shadow">
          <h4 className="font-semibold text-2xl mb-5">Description</h4>
          <div className="">{parse(description)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
