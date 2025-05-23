import Skeleton from 'react-loading-skeleton';

const ProductDetailsSkeletion = () => {
  return (
    <div>
      {/* <h1>{slug}</h1> */}
      <div className="container mx-auto flex flex-col md:flex-row py-10 px-4 md:px-0">
        <div className="basis-full lg:basis-1/2 px-24">
          <Skeleton className="w-full" height={400} borderRadius={8} />
        </div>
        <div className="basis-full lg:basis-1/2">
          <Skeleton height={30} />

          <div className="flex items-center gap-2 my-3">
            <Skeleton height={30} width={120} />
            <Skeleton height={30} width={120} />
            <Skeleton height={30} width={120} />
            <Skeleton height={30} width={120} />
          </div>
          <div>
            <Skeleton className="mb-5" height={20} width={120} />

            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>

          <Skeleton className="mt-7" height={40} width={120} />
        </div>
      </div>
      {/* <ProductDescription
        title={product.product.name}
        description={product.product.description}
      /> */}
    </div>
  );
};

export default ProductDetailsSkeletion;
