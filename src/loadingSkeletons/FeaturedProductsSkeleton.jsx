import React from 'react';
import Skeleton from 'react-loading-skeleton';

const FeaturedProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
      {/* card start*/}
      <div className="p-4 rounded-lg border bg-white">
        <Skeleton className="w-full h-auto" height={200} borderRadius={8} />
        <Skeleton className="mt-2" />
        <Skeleton className="mt-2" />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <div className="flex flex-col items-center">
          <Skeleton className="mt-3" width={65} />
          <Skeleton width={100} height={35} />
        </div>
      </div>
      {/* card end*/}
      {/* card start*/}
      <div className="p-4 rounded-lg border bg-white">
        <Skeleton className="w-full h-auto" height={200} borderRadius={8} />
        <Skeleton className="mt-2" />
        <Skeleton className="mt-2" />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <div className="flex flex-col items-center">
          <Skeleton className="mt-3" width={65} />
          <Skeleton width={100} height={35} />
        </div>
      </div>
      {/* card end*/}
      {/* card start*/}
      <div className="p-4 rounded-lg border bg-white">
        <Skeleton className="w-full h-auto" height={200} borderRadius={8} />
        <Skeleton className="mt-2" />
        <Skeleton className="mt-2" />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <div className="flex flex-col items-center">
          <Skeleton className="mt-3" width={65} />
          <Skeleton width={100} height={35} />
        </div>
      </div>
      {/* card end*/}
      {/* card start*/}
      <div className="p-4 rounded-lg border bg-white">
        <Skeleton className="w-full h-auto" height={200} borderRadius={8} />
        <Skeleton className="mt-2" />
        <Skeleton className="mt-2" />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <div className="flex flex-col items-center">
          <Skeleton className="mt-3" width={65} />
          <Skeleton width={100} height={35} />
        </div>
      </div>
      {/* card end*/}
      {/* card start*/}
      <div className="p-4 rounded-lg border bg-white">
        <Skeleton className="w-full h-auto" height={200} borderRadius={8} />
        <Skeleton className="mt-2" />
        <Skeleton className="mt-2" />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <div className="flex flex-col items-center">
          <Skeleton className="mt-3" width={65} />
          <Skeleton width={100} height={35} />
        </div>
      </div>
      {/* card end*/}
    </div>
  );
};
export default FeaturedProductsSkeleton;
