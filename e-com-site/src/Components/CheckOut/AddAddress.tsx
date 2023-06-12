import { Grid, Typography } from "@mui/material";
import { Button, Card, FormHelperText, TextField } from "@material-ui/core";
import { useRef, useState } from "react";
import { BillingDetail } from "../../type";

type Props = {
  onBackBtnClickHnd: () => void;
  onSubmitClickHnd: (data: BillingDetail) => void;
};
const AddAddress = (props: Props) => {
  const BillingInforef = useRef<HTMLFormElement>(null);
  const { onBackBtnClickHnd, onSubmitClickHnd } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [formError, setFormError] = useState(false);
  const onSubmitBtnClickHnd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstName || !lastName || !address1 || !city || !state) {
      setFormError(true);
      return;
    }

    if (!email.includes("@")) {
      setFormError(true);
      return;
    }
    if (!pincode || isNaN(Number(pincode)) || pincode.length !== 6) {
      setFormError(true);
      return;
    }

    const data: BillingDetail = {
      id: new Date().toJSON().toString(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      pincode: pincode,
    };
    setFormError(false);
    onSubmitClickHnd(data);
    onBackBtnClickHnd();
    console.log(data);
  };

  return (
    <Grid item xs={12} md={12} sm={12}>
      <Card style={{ padding: "8px" }}>
        <form onSubmit={onSubmitBtnClickHnd} ref={BillingInforef}>
          <Typography variant="h5">Billing Information</Typography>
          <Grid container spacing={1} mb={5} mt={2} justifyContent="center" >
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                margin="dense"
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                // style={{ color: theme.palette.text.primary }}
              />
              {formError && !firstName && (
                <FormHelperText error>
                  Please enter your first name
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                margin="dense"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {formError && !lastName && (
                <FormHelperText error>
                  Please enter your last name
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                margin="dense"
                label="Email Address"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* {formError && !email && (
                <FormHelperText error>Please enter valid email</FormHelperText>
              )} */}
              {formError && !email.includes("@") && (
                <FormHelperText error>
                  Email is required (must contain @)
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                margin="dense"
                label="Address Line 1"
                name="address1"
                onChange={(e) => setAddress1(e.target.value)}
              />
              {formError && !address1 && (
                <FormHelperText error>Please enter your address</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                margin="dense"
                label="Address Line 2"
                name="address2"
                onChange={(e) => setAddress2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                margin="dense"
                label="City"
                name="city"
                onChange={(e) => setCity(e.target.value)}
              />
              {formError && !city && (
                <FormHelperText error>Please enter City</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                margin="dense"
                label="State/Province/Region"
                name="state"
                onChange={(e) => setState(e.target.value)}
              />
              {formError && !state && (
                <FormHelperText error>Please enter state</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                margin="dense"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 6 } }}
                label="ZIP/Postal Code"
                name="pincode"
                onChange={(e) => setPincode(e.target.value)}
              />
              {/* {formError && !pincode && (
                <FormHelperText error>
                  Please enter valid pincode
                </FormHelperText>
              )} */}
              {formError &&
                (!pincode ||
                  isNaN(Number(pincode)) ||
                  pincode.length !== 6) && (
                  <FormHelperText error>
                    Please enter only number(less than 7)
                  </FormHelperText>
                )}
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Card>
    </Grid>
  );
};
export default AddAddress;
