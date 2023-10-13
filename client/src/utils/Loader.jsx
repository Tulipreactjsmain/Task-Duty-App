import { Spinner } from "react-bootstrap";
import { MutatingDots } from "react-loader-spinner";

export default function Loader({ title }) {
  return (
    <div className="d-flex flex-column bg-image justify-content-center align-items-center">
      <div className="d-flex bg-body h-100 w-100 flex-column justify-content-center align-items-center gap-5" style={{opacity:"0.9"}}>
        {/* <Spinner className="defaultColor" animation="grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner> */}
        <MutatingDots
          height="100"
          width="100"
          color="#974fd0"
          secondaryColor="#57277e"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <p className="text-center fs-5">{title}</p>
      </div>
    </div>
  );
}


// 