import React from "react";
import { useAccount } from "../../lib/hooks/useAccount";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { Grid } from "@mui/system";
import TextInput from "../../lib/components/TextInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router";

export default function LoginForm(): React.ReactElement {
  const { loginUser } = useAccount();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginSchema): Promise<void> => {
    await loginUser.mutateAsync(data);
  };

  return (
    <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
      <Grid
        size={{ xs: 0, md: 6 }}
        sx={{
          display: { xs: "none", md: "block" },
          backgroundImage: "url(/images/loginPageEvent.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, md: 0 },
        }}
      >
        <Button
          component={NavLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{
            position: "absolute",
            top: { xs: 8, md: 16 },
            left: { xs: 8, md: 16 },
          }}
        >
          Back to home
        </Button>
        <Paper
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: { xs: 2, sm: 3 },
            gap: 3,
            width: "100%",
            maxWidth: 400,
            mx: "auto",
            borderRadius: 1,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to continue to Reactivities
            </Typography>
          </Box>

          <TextInput<LoginSchema>
            control={control}
            name="email"
            label="Email"
          />
          <TextInput<LoginSchema>
            control={control}
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            loading={isSubmitting}
            disabled={!isValid}
          >
            Login
          </Button>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Don't have an account? <Link href="#">Sign up</Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
