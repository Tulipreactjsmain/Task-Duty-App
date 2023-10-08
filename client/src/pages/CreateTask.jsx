import { useState } from "react";
import { useStore } from "../config/store";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { createNewTask } from "../config/api";
import toast from "react-hot-toast";
import { Select, Space } from "antd";

export default function CreateTask() {
  const [loading, setLoading] = useState(false);
  const { userData } = useStore();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmitHandler = async (data) => {
    setLoading(true);
    console.log("taskData", data);
    try {
      const res = await createNewTask(data.title, data.description, data.tags);
      if (res.status === 201) {
        toast("Task created successfully");
        navigate(`/${userData?.username}/tasks`);
      } else {
        toast.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
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
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center customPadding pt-5 pb-4">
        <div className="d-flex align-items-center gap-2">
          <span>
            <NavLink to={`/${userData?.username}/tasks`}>
              <IoIosArrowBack className="fs-1 text-black" />
            </NavLink>
          </span>
          <h1 className="text-center mb-0">New Task</h1>
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
                {/* Use Controller to wrap the Select component */}
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
          to="#"
          className="defaultColor text-center text-decoration-underline textHover"
        >
          Back To Top
        </NavLink>
      </div>
    </>
  );
}
