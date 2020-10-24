import Skeleton from "react-loading-skeleton";

export function BroadcastLoading() {
  return (
    <div className="px-0 px-sm-3 pt-2">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <div className="col-12">
        <div className="row">
          <Skeleton className="col-12 col-lg-6" height={400} />
          <Skeleton className="col-12 col-lg-6" height={400} />
        </div>
      </div>
    </div>
  );
}
