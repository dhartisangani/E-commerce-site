import { useState } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { InputAdornment } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import instance from "../Services/AxiosInterCeptors";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      console.log("Submitted form:", values);

      try {
        const response = await instance.post(
          "http://localhost:4000/user/login",
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        console.log(data);

        if (data.success) {
          localStorage.setItem("token", data.authtoken);
          navigate("/newcheckout");
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid item xs={10} sm={8} md={6} lg={4} xl={3}>
        {loading ? (
          <Typography variant="h4" align="center">
            Loading..
          </Typography>
        ) : (
          <Paper elevation={3} sx={{ padding: "1rem" }}>
            <Typography variant="h5" gutterBottom>
              Log In
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!(formik.touched.email && formik.errors.email)}
                    helperText={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!(formik.touched.password && formik.errors.password)}
                    helperText={
                      formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : ""
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button onClick={handleShowPassword}>
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Log In
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" align="center" gutterBottom>
                    Don't have an account?
                    <Link to="/signup" color="primary">
                      Sign Up
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default Login;
