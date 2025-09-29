import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../forms/CustomFileds/CustomInput";
import { useUserStore } from "@/stores/useUserStore";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const methods = useForm({});
  const { login, loading } = useUserStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    await login(data.email, data.password).then(() => {
      // Optionally, you can handle post-login actions here, like redirecting or showing a success message
      // For example: toast.success("Login successful");
      // Or redirect using useNavigate from react-router-dom
      navigate("/");
    });
    // Optionally, you can handle post-login actions here, like redirecting or showing a success message
    // For example: toast.success("Login successful");
    // Or redirect using useNavigate from react-router-dom
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 md:gap-5 pt-5"
        >
          <CustomInput
            name="email"
            register={register}
            errors={errors}
            type="email"
            placeholder="Enter your email"
            validationRules={{
              required: "Email is required",
              pattern: {
                value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email address",
              },
            }}
          />

          <CustomInput
            name="password"
            register={register}
            errors={errors}
            type="password"
            placeholder="Enter your password"
            validationRules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
          />

          <button
            disabled={loading}
            type="submit"
            className="bg-bsPrimary text-white p-2 rounded flex items-center justify-center"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

export default LoginForm;
