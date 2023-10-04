// import { useState } from "react";
// import { registerUser, loginUser } from "../config/api.js";
// import { Modal, Button, Spinner } from "react-bootstrap";
// import FormValidator from "./FormValidator.jsx";
// import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

// export default function LoginModal() {
//   const [show, setShow] = useState(false);
//   const [isSignIn, setIsSignIn] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [passwordShown, setpasswordShown] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     try {
//       if (isSignIn) {
//         const res = await loginUser(formData.username, formData.password);
//         console.log("redfg",res);
//         if (res.status === 200) {
//           handleClose();
//         }
//       } else {
//         const res = await registerUser(
//           formData.username,
//           formData.email,
//           formData.password
//         );
//         if (res.status === 201) {
//           handleClose();
//         }
//       }
//     } catch (error) {
//       console.log(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//     console.log("Form Data Submitted:", formData);
//     console.log("API URL:", isSignIn ? "/auth/login" : "/auth/register");
//   };

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const togglePassword = () => {
//     setpasswordShown(!passwordShown);
//   };

//   const handleFormToggle = () => {
//     setIsSignIn(!isSignIn);
//   };

//   return (
//     <>
//       <i
//         className="bi bi-person-circle fs-3 text-black d-none d-md-block d-lg-block opacity"
//         onClick={handleShow}
//       ></i>
//       <Modal show={show} onHide={handleClose} backdrop="static" centered>
//         <Modal.Header closeButton>
//           <Modal.Title></Modal.Title>
//         </Modal.Header>
//         <h1 className="text-center">
//           {isSignIn ? "Sign In" : "Create Account"}
//         </h1>
//         <Modal.Body>
//           <div className="auth-form-container">
//             <form
//               onSubmit={handleSubmit}
//               className="d-flex flex-column align-items-center w-100"
//             >
//               <FormValidator
//                 isSignIn={isSignIn}
//                 formData={formData}
//                 setErrors={setErrors}
//               >
//                 <div className="mb-2 inputRegBox">
//                   <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     placeholder="username"
//                     autoFocus
//                     className="w-100 mb-0 inputReg myInput"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                   />
//                   {errors?.username && (
//                     <div className="text-danger">{errors.username}</div>
//                   )}
//                 </div>

//                 <div className="mb-2 inputRegBox">
//                   {!isSignIn && (
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       placeholder="email"
//                       className="w-100 mb-0 inputReg"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   )}
//                   {errors?.email && (
//                     <div className="text-danger">{errors.email}</div>
//                   )}
//                 </div>

//                 <div className=" mb-2 inputRegBox position-relative">
//                   <input
//                     type={passwordShown ? "text" : "password"}
//                     placeholder="password"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="w-100 inputReg mb-0"
//                   />
//                   {passwordShown ? (
//                     <AiFillEye
//                       className="position-absolute end-0 translate-middle"
//                       style={{ top: "50%", cursor: "pointer" }}
//                       onClick={togglePassword}
//                     />
//                   ) : (
//                     <AiOutlineEyeInvisible
//                       className="position-absolute end-0 translate-middle"
//                       style={{ top: "50%", cursor: "pointer" }}
//                       onClick={togglePassword}
//                     />
//                   )}
//                   {errors?.password && (
//                     <div className="text-danger">{errors.password}</div>
//                   )}
//                 </div>
//               </FormValidator>

//               <Button
//                 variant="dark"
//                 type="submit"
//                 size="lg"
//                 className="my-4 rounded-0"
//               >
//                 {loading ? (
//                   <Spinner animation="border" size="sm"></Spinner>
//                 ) : isSignIn ? (
//                   "Sign in"
//                 ) : (
//                   "Create Account"
//                 )}
//               </Button>
//               <p onClick={handleFormToggle} role="button" className="pt-4">
//                 {isSignIn ? (
//                   <>
//                     <span>Need an account? </span>
//                     <span className="text-decoration-underline pt-4">
//                       Create one here
//                     </span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Already have an account? </span>
//                     <span className="text-decoration-underline pt-4">
//                       Sign in
//                     </span>
//                   </>
//                 )}
//               </p>
//             </form>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

import { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  AiOutlineClose,
  AiFillEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import registerOptions from "../utils/formValidations.js";
import { loginUser, registerUser } from "../config/api";

export default function Account() {
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
          //   setCurrentUser(res.data);
          toast.success("Login Successful");
          navigate(from, { replace: true });
          handleClose();
        }
      }
    } catch (error) {
      console.log(error.response.data.message);
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
                <p className="fs-5" type="button" onClick={switchMode}>
                  <span>Already have an account? </span>
                  <span className="text-decoration-underline pt-4">
                    Sign in here
                  </span>
                </p>
              ) : (
                <p
                  className="fs-5 text-secondary-subtle"
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
