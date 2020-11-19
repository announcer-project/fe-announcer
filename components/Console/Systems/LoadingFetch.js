import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

const Box = styled.div`
  height: 250px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 10px 10px 32px -8px rgba(0, 0, 0, 0.2);
`;

export default function LoadingBox() {
  return (
    <>
      <div className="col-12 col-sm-4 mt-3">
        <Box className="text-center p-3">
          <div className="text-right">
            <Skeleton width={50} height={20} />
          </div>
          <div className="mt-2">
            <Skeleton width={100} height={100} />
            <div className="mt-2">
              <Skeleton width={200} height={20} />
              <br />
              <Skeleton width={200} height={20} />
            </div>
          </div>
        </Box>
      </div>
      <div className="col-12 col-sm-4 mt-3">
        <Box className="text-center p-3">
          <div className="text-right">
            <Skeleton width={50} height={20} />
          </div>
          <div className="mt-2">
            <Skeleton width={100} height={100} />
            <div className="mt-2">
              <Skeleton width={200} height={20} />
              <br />
              <Skeleton width={200} height={20} />
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
