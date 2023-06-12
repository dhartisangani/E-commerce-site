import { Grid, Typography } from "@mui/material";
import { Button, Card, TextField } from "@material-ui/core";
import { useRef } from "react";
import { BillingDetail } from "../../type";

type Props = {
  data: BillingDetail;
  onBackBtnClickHnd: () => void;
  onUpdateClickHnd: (data: BillingDetail) => void;
};
const EditAddress = (props: Props) => {
  // const classes = useStyles();
  const BillingInforef = useRef<HTMLFormElement>(null);
  const { data, onBackBtnClickHnd, onUpdateClickHnd } = props;

  const onSubmitBtnClickHnd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedData: BillingDetail = {
      id: data.id,
      firstName: BillingInforef.current?.firstName.value || "",
      lastName: BillingInforef.current?.lastName.value || "",
      email: BillingInforef.current?.email.value || "",
      address1: BillingInforef.current?.address1.value || "",
      address2: BillingInforef.current?.address2.value || "",
      city: BillingInforef.current?.city.value || "",
      state: BillingInforef.current?.state.value || "",
      pincode: BillingInforef.current?.pincode.value || "",
    };
    localStorage.setItem("Addressdetail", JSON.stringify(data));
    // navigate("/payment");
    onUpdateClickHnd(updatedData);
    onBackBtnClickHnd();
    console.log(data);
  };

  return (
    <Grid item xs={12} md={12} sm={12}>
      <Card style={{ padding: "8px" }}>
        <form onSubmit={onSubmitBtnClickHnd} ref={BillingInforef}>
          <Typography variant="h5">Edit Address</Typography>
          <Grid container spacing={1} mb={5} mt={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                required
                margin="dense"
                label="First Name"
                name="firstName"
                defaultValue={data.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                required
                margin="dense"
                label="Last Name"
                name="lastName"
                defaultValue={data.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                required
                margin="dense"
                label="Email Address"
                name="email"
                type="email"
                defaultValue={data.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                required
                margin="dense"
                label="Address Line 1"
                name="address1"
                defaultValue={data.address1}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                required
                margin="dense"
                label="Address Line 2"
                name="address2"
                defaultValue={data.address2}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                required
                margin="dense"
                label="City"
                name="city"
                defaultValue={data.city}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                required
                margin="dense"
                label="State/Province/Region"
                name="state"
                defaultValue={data.state}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                multiline
                required
                margin="dense"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 6 } }}
                label="ZIP/Postal Code"
                name="pincode"
                defaultValue={data.pincode}
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </form>
      </Card>
    </Grid>
  );
};
export default EditAddress;
