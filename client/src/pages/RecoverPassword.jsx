import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import registerOptions from "../utils/formValidations.js";
import { forgotPassword } from "../config/api";
import { IoIosArrowBack } from "react-icons/io";

export default function RecoverPassword() {
  const [loading, setLoading] = useState(false);
  const [resetPasswordMode, setResetPasswordMode] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = async ({ email }) => {
    setLoading(true);
    try {
      if (resetPasswordMode) {
        const res = await forgotPassword(email);
        console.log(("passres", res));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setResetPasswordMode(false);
  };

  return (
    <div className="customPadding pt-5">
      <NavLink to="/" className="p-0 m-0 border-0 bg-body">
        <IoIosArrowBack className="fs-1 text-black" />{" "}
        <span className="text-black">Go back</span>
      </NavLink>
      <div className="pt-5 d-flex flex-column align-items-center justify-content-center">
        {resetPasswordMode && <h1 className="fs-3">Verify email</h1>}
        {resetPasswordMode ? (
          <form
            className="d-flex flex-column align-items-center justify-content-center"
            onSubmit={handleSubmit(onSubmitHandler)}
            style={{ width: "300px" }}
          >
            <div className="mb-2 inputRegBox">
              <input
                type="text"
                placeholder="Email"
                id="email"
                autoFocus
                className="w-100 mb-0 inputReg"
                {...register("email", registerOptions.email)}
              />
              {errors?.email?.message && (
                <span
                  className="text-danger fontWeight-400 opacity-75"
                  style={{ fontSize: "14px" }}
                >
                  {errors.email.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              className="my-4 rounded-3 color hover border-0 inputRegBox"
            >
              {loading ? (
                <Spinner animation="border" size="sm"></Spinner>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        ) : (
          <>
            <div className="mb-2 inputRegBox text-center">
              Reset instructions sent to your Email.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
