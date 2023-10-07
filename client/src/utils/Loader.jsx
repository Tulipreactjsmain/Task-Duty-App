import { Spinner } from "react-bootstrap";

export default function Loader({ title }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <div className="pt-5 mt-5">
        <Spinner className="defaultColor" animation="grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="text-center fs-5">{title}</p>
      </div>
    </div>
  );
}
