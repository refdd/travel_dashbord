import React from "react";
import { Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const CustomSelect = ({
  name,
  label,
  control,
  errors,
  options = [],
  placeholder,
  className,
  getOptionLabel = (option) => option.label || option,
  isOptionEqualToValue = (option, value) => option.value === value.value,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <Autocomplete
          options={options}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
          onChange={(_, data) => field.onChange(data)}
          value={field.value || null}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label || placeholder}
              placeholder={placeholder}
              error={!!errors?.[name]}
              helperText={errors?.[name]?.message}
              className={className}
            />
          )}
          {...rest}
        />
      )}
    />
  );
};

export default CustomSelect;
