import { MutatingDots } from "react-loader-spinner";

export default function Loader2({title}) {
  return (
    <div className="d-flex flex-column bg-image justify-content-center align-items-center">
      <div className="d-flex opacity-75 bg-body h-100 w-100 flex-column justify-content-center align-items-center gap-5">
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
        <p className="text-center text-dark fs-5">{title}</p>
      </div>
    </div>
  )
}
