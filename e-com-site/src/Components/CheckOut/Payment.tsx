import { Grid, Typography } from "@mui/material";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { useRef, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "2px solid",
      borderColor: theme.palette.background.default,
      color: theme.palette.text.secondary,
    },

    button: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,

      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.contrastText,
      },
    },
  })
);
export {};
interface OnNextHandleProps {
  onNext: () => void;
  onBack: () => void;
}

const Payment = (props: OnNextHandleProps) => {
  const classes = useStyles();
  const [paymentMethod, setPaymentMethod] = useState("online");
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const formRef = useRef<HTMLFormElement>(null);
  // const cartItems = product.map((item) => ({
  //   _id: item._id,
  //   quantity: item.quantity,
  //   image: item.image,
  //   price: item.price,
  //   productName: item.productName,
  //   totalPrice: item.totalPrice,
  // }));
  // const cartItems = {
  //   totalQuantity,
  //   cartItem,
  //   // totalAmount,
  // };

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod((event.target as HTMLInputElement).value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onNext();
  };
  
  const handleBack = () => {
    props.onBack();
  };

  return (
    <Card style={{ marginBottom: "17%" }}>
      <CardContent>
        <Typography variant="h5" component="div" mb={2}>
          Payable Amount: ${totalAmount.toFixed(2)}
        </Typography>
        <Typography component="legend">Payment Method</Typography>
        <RadioGroup
          aria-label="payment-method"
          name="payment-method"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <FormControlLabel
            value="online"
            control={<Radio />}
            label="Online Payment"
          />
          <FormControlLabel
            value="cod"
            control={<Radio />}
            label="Cash on Delivery"
          />
        </RadioGroup>
        <form ref={formRef} onSubmit={handleSubmit}>
          {paymentMethod === "cod" ? (
            <Grid container spacing={2} width={600}>
              <Grid item xs={12} md={12} lg={12}>
                <FormControlLabel
                  control={<Checkbox required />}
                  label="I agree to pay cash on delivery"
                  aria-required
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2} width={600}>
              <Grid item xs={6}>
                <TextField
                  id="card-number"
                  label="Card Number"
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="expiration-date"
                  label="Expiration Date"
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="security-code"
                  label="Security Code"
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="cardholder-name"
                  label="Cardholder Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  required
                />
              </Grid>
            </Grid>
          )}

          <Grid container justifyContent="space-between" mt={2}>
            <Grid item>
              <Button variant="contained" onClick={handleBack}>
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
              >
                Submit Payment
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Payment;
