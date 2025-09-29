import React from "react";
import TextField from "@mui/material/TextField";

const CustomInput = ({
  name,
  label,
  register,
  errors,
  validationRules,
  className,
  placeholder,
  ...rest
}) => {
  return (
    <TextField
      id={name}
      label={label || placeholder}
      variant="outlined"
      fullWidth
      className={className}
      placeholder={placeholder}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message}
      {...register(name, validationRules)}
      {...rest}
    />
  );
};

export default CustomInput;
