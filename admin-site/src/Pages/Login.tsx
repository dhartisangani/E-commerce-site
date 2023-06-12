import { useState } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { InputAdornment } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import instance from "../Services/AxiosInterCeptors";

interface LoginFormState {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<LoginFormState>({
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
    console.log("Submitted form:", formState);
    const response = await instance.post(
      "http://localhost:4000/admin/login",
      {
        email: formState.email,
        password: formState.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.data;
    console.log(data);
    if (data.success) {
      localStorage.setItem("token", data.authtoken);
      navigate("/");
    } else {
      // alert("invalid");
      // setError("Invalid email or password")
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
              Log In
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
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
