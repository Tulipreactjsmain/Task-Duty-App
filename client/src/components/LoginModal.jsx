import { useEffect, useState } from "react";
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
import { loginUser, registerUser } from "../config/api";

export default function LoginModal({setUserData}) {
  const [show, setShow] = useState(false);
  const [isSignup, setisSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordShown, setpasswordShown] = useState(false);

  const switchMode = () => {
    setisSignup(!isSignup);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  //   const { setCurrentUser } = useStore();
  const from = location.state?.from || "/";

  const togglePassword = () => {
    setpasswordShown(!passwordShown);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitHandler = async ({ username, email, password }) => {
    setLoading(true);
    try {
      if (isSignup) {
        const res = await registerUser(username, email, password);

        if (res.status === 201) {
          //   setCurrentUser(res.data);

          toast.success("Registration Successful");
          navigate(from, { replace: true });
          handleClose();
        }
      } else {
        const res = await loginUser(username, password);
        if (res.status === 200) {
            const userDataResponse = await fetchUserData();
            if (userDataResponse) {
              setUserData(userDataResponse);
            }
          toast.success("Login Successful");
          navigate(from, { replace: true });
          handleClose();
        }
      }
    } catch (error) {
      alert(error.response.data.message);
      toast.error("invalid details");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <i
        className="bi bi-person-circle fs-3 text-black d-none d-md-block d-lg-block opacity"
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
          <div>
            <h1 className="text-center">
              {isSignup ? "Create account" : "Login"}
            </h1>
            <form
              className="d-flex flex-column align-items-center w-100"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
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
                  <span className="text-danger fs-6">
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
                    <span className="text-danger fs-6">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              )}

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
              {errors?.password?.message && (
                <span className="text-danger fs-6 mb-1 inputRegBox">
                  {errors.password.message}
                </span>
              )}
              <Button
                variant="dark"
                type="submit"
                size="lg"
                className="my-4 rounded-0 inputRegBox"
              >
                {loading ? (
                  <Spinner animation="border" size="sm"></Spinner>
                ) : isSignup ? (
                  "Create"
                ) : (
                  "Sign in"
                )}
              </Button>
              {isSignup ? (
                <p className="" type="button" onClick={switchMode}>
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
