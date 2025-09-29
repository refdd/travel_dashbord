import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../forms/CustomFileds/CustomInput";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import LoadingSpinner from "../loadgin/LoadingSpinner";

function FromAddUsers({ user }) {
  const isEditMode = !!user;
  const navigate = useNavigate();
  const { createUser, updateUser, loading } = useUserStore();

  // Initialize form methods with default values
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = methods;

  // Watch password to validate confirmPassword
  const watchPassword = watch("password");

  // Reset form if user prop changes (useful for async loading and edit mode)
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        password: "", // Don't pre-fill password for security
        confirmPassword: "",
        role: user.role || "USER",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    // Create a copy of data without confirmPassword

    // In edit mode, only include password if it's provided
    if (isEditMode && !data.password) {
      delete data.password;
    }

    try {
      if (isEditMode) {
        await updateUser(user.id, data).then(() => {
          reset();
          navigate("/users");
        });
      } else {
        await createUser(data).then(() => {
          reset();
          navigate("/users");
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Role options
  const roleOptions = [
    { label: "Admin", value: "ADMIN" },
    { label: "Manager", value: "MANAGER" },
    { label: "Editor", value: "EDITOR" },
    { label: "User", value: "USER" },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-white p-5 bg-black/5 rounded shadow-md">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 pt-5"
        >
          <CustomInput
            name="name"
            register={register}
            errors={errors}
            placeholder="Full Name"
            validationRules={{ required: "Name is required" }}
          />

          <CustomInput
            name="email"
            register={register}
            errors={errors}
            placeholder="Email Address"
            type="email"
            validationRules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.role && (
              <span className="text-red-500 text-sm mt-1">
                {errors.role.message}
              </span>
            )}
          </div>

          <CustomInput
            name="password"
            register={register}
            errors={errors}
            placeholder={
              isEditMode
                ? "New Password (leave blank to keep current)"
                : "Password"
            }
            type="password"
            validationRules={
              isEditMode
                ? {}
                : {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }
            }
          />

          <CustomInput
            name="confirmPassword"
            register={register}
            errors={errors}
            placeholder="Confirm Password"
            type="password"
            validationRules={
              isEditMode && !watchPassword
                ? {}
                : {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watchPassword || "Passwords do not match",
                  }
            }
          />

          <div className="md:col-span-3">
            <button
              type="submit"
              className="bg-bsPrimary text-white p-2 rounded flex items-center justify-center w-full md:w-auto px-8"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : isEditMode
                ? "Update User"
                : "Create User"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default FromAddUsers;
