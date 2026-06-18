import React from "react";
import { TextField, type TextFieldProps } from "@mui/material";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

/**
 * The existing fields use register() + manual defaultValue + manual
 * error/helperText on every single field. This reusable TextInput
 * component encapsulates all of that:
 *
 * useController vs register — gives you a fully controlled field, so reset()
 * properly updates the displayed value without needing defaultValue workarounds.
 *
 * Single source of truth - Change textinput here
 */

type Props<T extends FieldValues> = UseControllerProps<T> & TextFieldProps & {};

// When you use it as <TextInput<ActivitySchema> name="title" ... />, TypeScript
// narrows name to only valid keys of ActivitySchema
export default function TextInput<T extends FieldValues>(
  props: Props<T>,
): React.ReactElement {
  const { field, fieldState } = useController({ ...props });

  return (
    <TextField
      {...props}
      {...field}
      value={field.value || ""}
      fullWidth
      variant="outlined"
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message}
    />
  );
}
