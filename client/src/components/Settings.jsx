import { Modal, Button, Form, Image } from "react-bootstrap";
import { useStore } from "../config/store";
import { useForm } from "react-hook-form";
import { updateUser } from "../config/api";
import { BsCameraFill } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import registerOptions from "../utils/formValidations";
import toast from "react-hot-toast";

export default function Settings({ show, onHide }) {
  const [isCameraIconVisible, setIsCameraIconVisible] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const { userData, setUserData, setShowSettingsModal, loading, setLoading } =
    useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const profile = data;
      const updatedUserData = await updateUser(profile);
      setUserData(updatedUserData);
      navigate("/");
      setShowSettingsModal(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {userData && (
            <Modal show={show} onHide={onHide}>
              <Modal.Header closeButton>
                <Modal.Title>Update Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="profileImg" className="pb-4">
                    <Form.Label>Profile Image</Form.Label>
                    <div className="d-flex flex-column gap-3 align-items-center">
                      <div
                        className="rounded position-relative"
                        onMouseEnter={() => setIsCameraIconVisible(true)}
                        onMouseLeave={() => setIsCameraIconVisible(false)}
                      >
                        <Image
                          src={userData.profileImg}
                          alt="Profile Image"
                          roundedCircle
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                        {isCameraIconVisible && (
                          <label
                            htmlFor="profileImg"
                            className="rounded-circle position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                            style={{
                              background: "rgba(0, 0, 0, 0.6)",
                              cursor: "pointer",
                            }}
                          >
                            <BsCameraFill
                              className="text-white"
                              style={{
                                fontSize: "64px",
                              }}
                            />
                            <input
                              type="file"
                              name="profileImg"
                              id="profileImg"
                              accept="image/*"
                              style={{ display: "none" }}
                            />
                          </label>
                        )}
                      </div>
                      <div>
                        <h1
                          className="fs-3"
                          style={{ textTransform: "capitalize" }}
                        >
                          {userData.username}
                        </h1>
                      </div>
                    </div>
                  </Form.Group>
                  <div className="d-flex gap-3 flex-column">
                    <div>
                      <Form.Group className="d-flex justify-content-between align-items-center">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          id="username"
                          className="w-50"
                          {...register("username", registerOptions.username)}
                          defaultValue={userData.username}
                        />
                      </Form.Group>
                      {errors?.username?.message && (
                        <p className="text-danger pt-1 fs-6">
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                    <Form.Group className="d-flex justify-content-between align-items-center">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        className="w-50"
                        type="email"
                        name="email"
                        id="email"
                        {...register("email", registerOptions.email)}
                        defaultValue={userData.email}
                      />
                    </Form.Group>
                    {errors?.email?.message && (
                      <p className="text-danger fs-6">{errors.email.message}</p>
                    )}

                    <div>
                      <Form.Group className="d-flex justify-content-between align-items-center">
                        <Form.Label>New Password:</Form.Label>
                        <div className="position-relative w-50">
                          <Form.Control
                            type={passwordShown ? "text" : "password"}
                            name="password"
                            id="password"
                            {...register("password", registerOptions.password)}
                            placeholder="Enter new password"
                          />
                          {passwordShown ? (
                            <AiFillEye
                              className="position-absolute end-0 translate-middle"
                              style={{ top: "50%", cursor: "pointer" }}
                              onClick={togglePassword}
                            />
                          ) : (
                            <AiFillEyeInvisible
                              className="position-absolute end-0 translate-middle"
                              style={{ top: "50%", cursor: "pointer" }}
                              onClick={togglePassword}
                            />
                          )}
                        </div>
                      </Form.Group>
                      {errors?.password?.message && (
                        <p className="text-danger fs-6">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <Button className="color hover border-0" type="submit">
                      Update
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          )}
        </>
      )}
    </>
  );
}
