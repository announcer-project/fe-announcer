import Skeleton from "react-loading-skeleton";

export default function CreateNewsLoading() {
  return (
    <div>
      <Skeleton height={300} />
      <Skeleton height={30} />
      <Skeleton height={300} />
      <Skeleton height={30} width={200} />
      <Skeleton height={100} width={100} />
      <Skeleton height={30} />
    </div>
  );
}
