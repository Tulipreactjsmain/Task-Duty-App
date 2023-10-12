import { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { fetchUserData } from "../hooks/userService.js";
import {
  AiOutlineClose,
  AiFillEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import registerOptions from "../utils/formValidations.js";
import { loginUser, registerUser, forgotPassword } from "../config/api";
import { useStore } from "../config/store.jsx";

export default function LoginModal() {
  const [show, setShow] = useState(false);
  const [isSignup, setisSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordShown, setpasswordShown] = useState(false);
  const [resetPasswordMode, setResetPasswordMode] = useState(false);

  const switchMode = () => {
    setisSignup(!isSignup);
    setResetPasswordMode(false);
  };

  const switchToResetPasswordMode = () => {
    setResetPasswordMode(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserData } = useStore();
  const from = location.state?.from || "/";

  const togglePassword = () => {
    setpasswordShown(!passwordShown);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitHandler = async ({ username, email, password }) => {
    setLoading(true);
    try {
      let userDataResponse;
  
      if (resetPasswordMode) {
        await forgotPassword(email);
        toast.success("Reset instructions sent to your email");
        handleClose();
      } else {
        if (isSignup) {
          const res = await registerUser(username, email, password);
  
          if (res.status === 201) {
            userDataResponse = await fetchUserData();
            toast.success("Registration Successful");
            navigate(from, { replace: true });
            handleClose();
          }
        } else {
          const res = await loginUser(username, password);
          if (res.status === 200) {
            userDataResponse = await fetchUserData();
            toast.success("Login Successful");
            navigate(from, { replace: true });
            handleClose();
          }
        }
      }
      if (userDataResponse) {
        setUserData(userDataResponse);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <i
        className="bi bi-person-circle text-black d-md-block d-lg-block opacity"
        onClick={handleShow}
      ></i>
      <Modal
        className=""
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
      >
        <Modal.Body>
          <div className="w-100 text-end">
            <AiOutlineClose
              style={{ cursor: "pointer" }}
              size="24px"
              onClick={handleClose}
            />
          </div>
          <div className="mx-5">
            <h1 className="text-center">
              {isSignup
                ? "Create account"
                : resetPasswordMode
                ? "Reset Password"
                : "Login"}
            </h1>
            <form
              className="d-flex flex-column align-items-center w-100"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              {resetPasswordMode ? (
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
              ) : (
                <>
                  <div className="mb-2 inputRegBox">
                    <input
                      type="text"
                      placeholder="Username"
                      id="username"
                      autoFocus
                      className="w-100 mb-0 inputReg"
                      {...register("username", registerOptions.username)}
                    />
                    {errors?.username?.message && (
                      <span
                        className="text-danger fontWeight-400 opacity-75"
                        style={{ fontSize: "14px" }}
                      >
                        {errors.username.message}
                      </span>
                    )}
                  </div>
                  {isSignup && (
                    <div className="mb-2 inputRegBox">
                      <input
                        type="text"
                        placeholder="Email"
                        id="email"
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
                  )}
                </>
              )}

              {!resetPasswordMode && (
                <div className=" mb-2 inputRegBox position-relative">
                  <input
                    type={passwordShown ? "text" : "password"}
                    placeholder="password"
                    id="password"
                    className="w-100 inputReg mb-0"
                    {...register("password", registerOptions.password)}
                  />
                  {passwordShown ? (
                    <AiFillEye
                      className="position-absolute end-0 translate-middle"
                      style={{ top: "50%", cursor: "pointer" }}
                      onClick={togglePassword}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="position-absolute end-0 translate-middle"
                      style={{ top: "50%", cursor: "pointer" }}
                      onClick={togglePassword}
                    />
                  )}
                </div>
              )}
              {errors?.password?.message && (
                <span
                  className="text-danger fontWeight-400 opacity-75 mb-1 inputRegBox"
                  style={{ fontSize: "14px" }}
                >
                  {errors.password.message}
                </span>
              )}
              <Button
                type="submit"
                size="lg"
                className="my-4 rounded-3 color hover border-0 inputRegBox"
              >
                {loading ? (
                  <Spinner animation="border" size="sm"></Spinner>
                ) : isSignup ? (
                  "Create"
                ) : resetPasswordMode ? (
                  "Reset Password"
                ) : (
                  "Sign in"
                )}
              </Button>
              {!resetPasswordMode &&
                !isSignup && ( 
                  <p
                    className="text-secondary-subtle textHover mb-2"
                    type="button"
                    onClick={switchToResetPasswordMode}
                  >
                    <span>Forgot password? </span>
                  </p>
                )}

              {isSignup ? (
                <p className="text-center" type="button" onClick={switchMode}>
                  <span>Already have an account? </span>
                  <span className="text-decoration-underline pt-4">
                    Sign in here
                  </span>
                </p>
              ) : (
                <p
                  className=" text-secondary-subtle"
                  type="button"
                  onClick={switchMode}
                >
                  <span>Need an account? </span>
                  <span className="text-decoration-underline pt-4">
                    Create one here
                  </span>
                </p>
              )}
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
