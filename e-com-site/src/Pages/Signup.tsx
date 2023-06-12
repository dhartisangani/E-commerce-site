import { useState } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { InputAdornment } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import instance from "../Services/AxiosInterCeptors";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth } from "../Firebase.config";
const validationSchema = Yup.object().shape({
  username: Yup.string().required("UserName is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  // const [formState, setFormState] = useState<SignupFormState>({
  //   username: "",
  //   email: "",
  //   password: "",
  // });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setFormState((prevState) => ({ ...prevState, [name]: value }));
  // };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      console.log("Submitted form:", values);

      try {
        const response = await instance.post(
          "http://localhost:4000/user/signup",
          {
            username: values.username,
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
          navigate("/login");
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
              Sign up
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    autoComplete="username"
                    label="Username"
                    name="username"
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!(formik.touched.username && formik.errors.username)}
                    helperText={
                      formik.touched.username && formik.errors.username
                        ? formik.errors.username
                        : ""
                    }
                  />
                </Grid>
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
                    autoComplete="new-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      !!(formik.touched.password && formik.errors.password)
                    }
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
                  <TextField
                    fullWidth
                    autoComplete="new-password"
                    size="small"
                    label="Confirm Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      !!(formik.touched.password && formik.errors.password)
                    }
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
                    Create an account
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" align="center" gutterBottom>
                    Already have an account ?
                    <Link to="/login" color="primary">
                      Log in
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

export default Signup;
