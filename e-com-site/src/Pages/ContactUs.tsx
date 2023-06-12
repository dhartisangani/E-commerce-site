import { Grid, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { Button, Card, TextField } from "@material-ui/core";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";

type FormData = {
  name: string;
  email: string;
  detail: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  detail: "",
};
function ContactUs() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.detail) {
      setError("Please fill in all required fields.");
    } else {
      setFormData(initialFormData);
      setError("");
    }
    window.localStorage.setItem("contact", JSON.stringify(formData));
  };

  return (
    <Grid
      container
      spacing={3}
      mb={5}
      mt={10}
      marginBottom={15}
      justifyContent={"center"}
    >
      <Grid item xs={12} md={2} sm={12}>
        <Card>
          <Typography variant="h6" m={2} align="left">
            STORE INFORMATION
          </Typography>
          <Typography component="div" display="flex" alignItems="center">
            <Typography variant="subtitle1" component="span" m={1}>
              <LocationOnIcon />
            </Typography>
            <Typography variant="subtitle1" component="span" ml={1}>
              <span style={{ display: "flex", flexDirection: "column" }}>
                E-Mart Online Shopping <span>India</span>
              </span>
            </Typography>
          </Typography>
          <hr style={{ opacity: "0.4" }} />
          <Typography component="div" display="flex" alignItems="center">
            <Typography variant="subtitle1" component="span" m={1}>
              <AddIcCallOutlinedIcon />
            </Typography>
            <Typography variant="subtitle1" component="span" ml={1}>
              <span style={{ display: "flex", flexDirection: "column" }}>
                Call us:- <span> 91 123-456-789</span>
              </span>
            </Typography>
          </Typography>
          <hr style={{ opacity: "0.4" }} />
          <Typography component="div" display="flex" alignItems="center">
            <Typography variant="subtitle1" component="span" m={1}>
              <PrintOutlinedIcon />
            </Typography>
            <Typography variant="subtitle1" component="span" ml={1}>
              <span style={{ display: "flex", flexDirection: "column" }}>
                Fax :-<span> 0261-12345</span>
              </span>
            </Typography>
          </Typography>
          <hr style={{ opacity: "0.4" }} />
          <Typography component="div" display="flex" alignItems="center">
            <Typography variant="subtitle1" component="span" m={1}>
              <MailOutlineOutlinedIcon />
            </Typography>
            <Typography variant="subtitle1" component="span" ml={1}>
              <span style={{ display: "flex", flexDirection: "column" }}>
                Email us:-{" "}
                <a href="mailto:someone@yoursite.com">someone@yoursite.com</a>
              </span>
            </Typography>
          </Typography>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} sm={12} alignContent={"center"}>
        <Card>
          <form onSubmit={onSubmit} style={{ padding: "15px" }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              <span>
                <PersonIcon />
              </span>
              Contact Us
            </Typography>
            {error && (
              <Typography variant="subtitle1" color="error">
                {error}
              </Typography>
            )}
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              multiline
              margin="dense"
              label="Name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={!formData.name && Boolean(error)}
              helperText={!formData.name && Boolean(error) && "Required field"}
            />
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              multiline
              margin="dense"
              label="Email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={!formData.email && Boolean(error)}
              helperText={!formData.email && Boolean(error) && "Required field"}
            />
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              multiline
              maxRows={5}
              minRows={4}
              margin="dense"
              label="Message"
              name="detail"
              value={formData.detail}
              onChange={(e) =>
                setFormData({ ...formData, detail: e.target.value })
              }
              error={!formData.detail && Boolean(error)}
              helperText={
                !formData.detail && Boolean(error) && "Required field"
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ContactUs;
