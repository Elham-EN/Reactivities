import React from "react";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { DateTimePicker, type DateTimePickerProps } from "@mui/x-date-pickers";

type Props<T extends FieldValues> = UseControllerProps<T> &
  DateTimePickerProps & {};

/**
 * Connects a UI component to react-hook-form's internal state — it gives you field
 * (value, onChange, onBlur, ref) and fieldState (error, touched, dirty) so the
 * component is fully controlled by the form without needing register().
 *
 * When building custom/third-party input components that can't use register()
 * directly (like MUI's Select, DateTimePicker, etc.).
 */
export default function DateTimeInput<T extends FieldValues>(
  props: Props<T>,
): React.ReactElement {
  const { field, fieldState } = useController({ ...props });

  // Return a controlled DateTime Picker Compoment
  return (
    <DateTimePicker
      {...props}
      value={field.value ?? null}
      onChange={field.onChange}
      slotProps={{
        textField: {
          onBlur: field.onBlur,
          error: Boolean(fieldState.error),
          helperText: fieldState.error?.message,
        },
      }}
    />
  );
}
