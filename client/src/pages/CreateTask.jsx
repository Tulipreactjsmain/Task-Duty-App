import { useState, useEffect } from "react";
import { useStore } from "../config/store";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { createNewTask, updateTask } from "../config/api";
import toast from "react-hot-toast";
import { Select, Space } from "antd";
import LeaveEditPage from "../components/LeaveEditPage";

export default function CreateTask({}) {
  const [loading, setLoading] = useState(false);
  const [valuesSet, setValuesSet] = useState(false);

  const {
    userData,
    selectedTask,
    isEditMode,
    setIsEditMode,
    setShowConfirmationModal,
    showConfirmationModal,
  } = useStore();
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  

  const onSubmitHandler = async (data) => {
    setLoading(true);

    try {
      let res;
      if (!isEditMode) {
        res = await createNewTask(data.title, data.description, data.tags);
      } else {
        res = await updateTask(
          data.title,
          data.description,
          data.tags,
          selectedTask._id
        );
      }

      if (res.status === 201 && !isEditMode) {
        toast("Task created successfully");
        navigate(`/${userData?.username}/tasks`);
      } else if (res.status === 200 && isEditMode) {
        toast("Task updated successfully");
        navigate(`/${userData?.username}/tasks`);
      } else {
        toast.error(
          isEditMode ? "Failed to update task" : "Failed to create task"
        );
      }
    } catch (error) {
      console.error(
        isEditMode ? "Error updating task:" : "Error creating task:",
        error
      );
      toast.error(
        isEditMode ? "Failed to update task" : "Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  };

  const options = [
    {
      label: "Urgent",
      value: "Urgent",
    },
    {
      label: "Important",
      value: "important",
    },
    {
        label: "None",
        value: "none",
      },
  ];

  const handleBackClick = () => {
    if (isEditMode) {
      setShowConfirmationModal(true);
    } else {
      navigate(`/${userData?.username}/tasks`);
    }
  };

  const handleConfirmLeave = () => {
    setShowConfirmationModal(false);
    setIsEditMode(false);
    navigate(`/${userData?.username}/tasks`);
  };

  useEffect(() => {
    if (isEditMode && selectedTask && !valuesSet) {
      setValue("title", selectedTask.title);
      setValue("description", selectedTask.description);
      setValue("tags", selectedTask.tags);
    }
  }, [isEditMode, selectedTask, valuesSet, setValue]);

  const handleChange = (value) => {
    setValue("tags", value);
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center customPadding pt-5 pb-4">
        <div className="d-flex align-items-center gap-2">
          <span>
            <Button
              className="p-0 m-0 border-0 bg-body"
              onClick={handleBackClick}
            >
              <IoIosArrowBack className="fs-1 text-black" />
            </Button>
          </span>

          <h1 className="text-center mb-0">
            {isEditMode ? "Edit Task" : "New Task"}
          </h1>
        </div>
        <div className="form-container pt-5 pb-4">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="form-group position-relative">
              <label className="form-label-top-left fs-5" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                autoFocus
                {...register("title", { required: true })}
                className="form-input centered-placeholder"
                style={{ height: "84px" }}
                placeholder="E.g Project Defense, Assignment ..."
              />
              {errors.title && (
                <span className="text-danger">Title is required</span>
              )}
            </div>
            <div className="form-group position-relative">
              <label className="form-label-top-left fs-5" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                {...register("description", { required: true })}
                className="form-input centered-placeholder"
                style={{ height: "244px" }}
                placeholder="Briefly describe your task..."
              ></textarea>
              {errors.description && (
                <span className="text-danger">Description is required</span>
              )}
            </div>
            <div className="form-group position-relative">
              <label className="form-label-top-left fs-5 z-3" htmlFor="tags">
                Tags
              </label>

              <Space
                style={{
                  width: "100%",
                }}
                direction="vertical"
              >
                <Controller
                  name="tags"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      className="select"
                      mode="single"
                      allowClear
                      style={{
                        width: "100%",
                        height: "60px",
                      }}
                      placeholder="Please select"
                      onChange={handleChange}
                      options={options}
                      {...field}
                    />
                  )}
                />
              </Space>
              {errors.tags && (
                <span className="text-danger">Tags are required</span>
              )}
            </div>

            <Button
              className="color rounded border-0 hover"
              style={{ height: "64px", width: "100%" }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Done"}
            </Button>
          </form>
        </div>
        <NavLink
          to="/"
          className="defaultColor text-center text-decoration-underline textHover"
        >
          Back home
        </NavLink>
      </div>
      <LeaveEditPage
        show={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmLeave}
        message="You have unsaved changes. Are you sure you want to leave?"
      />
    </>
  );
}
