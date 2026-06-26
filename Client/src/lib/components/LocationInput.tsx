import React from "react";
import {
  useController,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import type { LocationSuggestion } from "../types/index.type";
import type { ActivitySchema } from "../schemas/activitySchema";
import {
  Box,
  debounce,
  List,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(
  props: Props<T>,
): React.ReactElement {
  const { field, fieldState } = useController({ ...props });
  const { setValue } = useFormContext<ActivitySchema>();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [suggestions, setSuggestions] = React.useState<LocationSuggestion[]>([]);

  const locationUrl = import.meta.env.VITE_LOCATIONIQ_URL;

  const fetchSuggestions = React.useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query || query.length < 3) {
          setSuggestions([]);
          return;
        }
        setLoading(true);
        try {
          const res = await axios.get<LocationSuggestion[]>(locationUrl, {
            params: { q: query, limit: 5, dedupe: 1 },
          });
          setSuggestions(res.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }, 1000),
    [locationUrl],
  );

  const handleChange = async (value: string): Promise<void> => {
    field.onChange(value);
    await fetchSuggestions(value);
  };

  const handleSelect = (location: LocationSuggestion): void => {
    const venue = location.display_name;
    const city =
      location.address?.city ||
      location.address?.town ||
      location.address?.village;
    const latitude = parseFloat(location.lat);
    const longitude = parseFloat(location.lon);
    field.onChange(venue);
    setValue("location.city", city);
    setValue("location.latitude", latitude);
    setValue("location.longitude", longitude);
    setSuggestions([]);
  };

  return (
    <Box>
      <TextField
        {...props}
        value={field.value ?? ""}
        onChange={(event) => handleChange(event.target.value)}
        onBlur={field.onBlur}
        fullWidth
        variant="outlined"
        error={Boolean(fieldState.error)}
        helperText={fieldState.error?.message}
      />
      {loading && <Typography>Loading...</Typography>}
      {suggestions.length > 0 && (
        <List sx={{ border: 1 }}>
          {suggestions.map((suggestion) => (
            <ListItemButton
              divider
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.display_name}
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
