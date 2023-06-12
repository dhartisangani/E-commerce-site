import { useState } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { InputAdornment } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import instance from "../Services/AxiosInterCeptors";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth } from "../Firebase.config";

interface SignupFormState {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<SignupFormState>({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    event.preventDefault();
    const response = await instance.post(
      "http://localhost:4000/admin/signup",
      {
        username: formState.username,
        email: formState.email,
        password: formState.password,
      },
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   username: formState.username,
        //   email: formState.email,
        //   password: formState.password,
        // }),
      }
    );
    const data = await response.data;
    console.log(data);
    if (data.success) {
      localStorage.setItem("token", data.authtoken);
      navigate("/login");
    } else {
      // setError(error);
    }
  };
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
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    autoComplete="username"
                    label="Username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    label="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    label="Password"
                    autoComplete="new-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formState.password}
                    onChange={handleChange}
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
                    required
                    fullWidth
                    autoComplete="new-password"
                    size="small"
                    label="Confirm Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formState.password}
                    onChange={handleChange}
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
