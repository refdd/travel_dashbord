import * as React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const CustomTextarea = ({
  name,
  label,
  register,
  errors,
  validationRules,
  placeholder,
  className,
  minRows = 3,
  maxRows = 6,
  style = {},
  ...rest
}) => {
  return (
    <FormControl fullWidth className={className} error={!!errors?.[name]}>
      {label && <InputLabel shrink>{label}</InputLabel>}
      <TextareaAutosize
        aria-label={label || placeholder}
        placeholder={placeholder}
        minRows={minRows}
        maxRows={maxRows}
        color=""
        style={{
          width: "100%",
          padding: "10px",
          borderColor: "#0000001a",
          borderWidth: 2,
          borderStyle: "solid",
          marginTop: 15,
          borderRadius: 4,
          ...style,
        }}
        {...register(name, validationRules)}
        {...rest}
      />
      {errors?.[name] && (
        <FormHelperText>{errors[name].message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomTextarea;
