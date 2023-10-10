import { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPassword } from "../config/api";
import { toast } from "react-hot-toast";
import registerOptions from "../utils/formValidations";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [passwordShown, setpasswordShown] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const togglePassword = () => {
    setpasswordShown(!passwordShown);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onSubmitHandler = async ({ newPassword }) => {
    setLoading(true);
    try {
      const res = await resetPassword(token, newPassword);

      if (res.status === 200) {
        toast.success("Password successfully reset");
        reset();
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal show={showModal} backdrop="static" centered onHide={handleCloseModal}>
        <Modal.Body>
          <div className="mx-5">
            <h1 className="text-center fs-3">Reset Password</h1>
            <form
              className="d-flex flex-column align-items-center w-100"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div className="mb-2 inputRegBox position-relative">
                <input
                  type={passwordShown ? "text" : "password"}
                  placeholder="New Password"
                  id="newPassword"
                  autoFocus
                  className="w-100 mb-0 inputReg"
                  {...register("newPassword", registerOptions.password)}
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
              {errors?.newPassword && (
                <span
                  className="text-danger fontWeight-400 opacity-75"
                  style={{ fontSize: "14px" }}
                >
                  {errors.newPassword.message}
                </span>
              )}
              <Button
                type="submit"
                size="lg"
                className="my-4 color border-0 rounded-3 hover inputRegBox"
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Reset Password"
                )}
              </Button>
              <Button className="bg-body border-0 text-black text-decoration-underline" onClick={handleCloseModal}>
                Close
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
