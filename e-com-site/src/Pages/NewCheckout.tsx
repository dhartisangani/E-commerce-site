import { Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  CardContent,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Card,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import OrderDetail from "../Components/CheckOut/OrderDetail";
import { CheckOutData } from "../type";
import {  useNavigate } from "react-router";
import { cartActions } from "../redux/Slices/CartSlice";
import instance from "../Services/AxiosInterCeptors";
// import * as Yup from "yup";

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

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().required("UserName is required"),
//   lastName: Yup.string().required("UserName is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   address1: Yup.string().required("Password is required"),
//   city: Yup.string().required("Password is required"),
//   state: Yup.string().required("Password is required"),
//   pincode: Yup.string().required("Password is required"),
//   cardNumber: Yup.string().required("Password is required"),
//   expiryDate: Yup.string().required("Password is required"),
//   cvv: Yup.string().required("Password is required"),
//   cardHolderName: Yup.string().required("Password is required"),
// });


function NewCheckout() {
  const BillingInforef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [formError, setFormError] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const product = useSelector((state: RootState) => state.cart.cartItems);

  const cartItems = product.map((item) => ({
    _id: item._id,
    quantity: item.quantity,
    image: item.image,
    price: item.price,
    productName: item.productName,
    totalPrice: item.totalPrice,
  }));
  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod((event.target as HTMLInputElement).value);
  };
  const onSubmitBtnClickHnd = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
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
    if (paymentMethod === "Online") {
      if (
        !cardNumber ||
        isNaN(Number(cardNumber)) ||
        cardNumber.length !== 16
      ) {
        setFormError(true);
        return;
      }
      if (!cvv || isNaN(Number(cvv)) || cvv.length !== 3) {
        setFormError(true);
        return;
      }
      if (!cardHolderName) {
        setFormError(true);
        return;
      }

      //   nextFiveYears.setFullYear(today.getFullYear() + 5);
      //   if (expiryDateObj < today || expiryDateObj > nextFiveYears) {
      //     setFormError(true);
      //     return;
      //   }
    }

    const selectedAddress: CheckOutData = {
      id: new Date().toJSON().toString(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      pincode: pincode,
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      cvv: cvv,
      cardHolderName: cardHolderName,
      paymentMethod: paymentMethod,
    };
    setFormError(false);
    console.log(selectedAddress);
    const order = { cartItems, selectedAddress, totalAmount };

    try {
      const response = await instance.post(
        "http://localhost:4000/order/order",
        order,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(order),
        }
      );

      const data = await response.data;
      console.log(data);
      console.log(order);

      console.log("Order created:", response.data);

      // props.onNext();
    } catch (error) {
      console.error("Error creating order:", error);
    }
    navigate("/confirmation");
    dispatch(cartActions.clearCart());
  };

  return (
    <Grid
      item
      xs={12}
      md={12}
      sm={12}
      mt={5}
      mb={5}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <form ref={BillingInforef} onSubmit={onSubmitBtnClickHnd}>
        <Grid item xs={12} md={11} sm={12}>
          <Card style={{ padding: "8px" }}>
            <Typography variant="h5">Billing Information</Typography>
            <Grid container spacing={1} mb={5} mt={2} justifyContent="center">
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
                  <FormHelperText error>
                    Please enter your address
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

            {/* <Button type="submit" variant="contained" color="primary">
            Submit
          </Button> */}

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
                  value="Online"
                  control={<Radio />}
                  label="Online Payment"
                />
                <FormControlLabel
                  value="COD"
                  control={<Radio />}
                  label="Cash on Delivery"
                />
              </RadioGroup>
              {/* <form ref={formRef} onSubmit={handleSubmit}> */}
              {paymentMethod === "COD" ? (
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
                  <Grid item xs={12}>
                    <TextField
                      id="card-number"
                      label="Card Number"
                      variant="outlined"
                      fullWidth
                      size="small"
                      placeholder="xxxx xxxx xxxx xxxx"
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    {formError &&
                      (!cardNumber ||
                        isNaN(Number(cardNumber)) ||
                        cardNumber.length !== 16) && (
                        <FormHelperText error>
                          Please enter only number(less than 16)
                        </FormHelperText>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="expiration-date"
                      label="Expiration Date"
                      variant="outlined"
                      fullWidth
                      size="small"
                      type="text"
                      placeholder="MM/YY"
                      inputProps={{
                        maxLength: 5,
                        pattern: "(0[1-9]|1[0-2])/[0-9]{2}",
                      }}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />

                    {/* {formError &&
                      (!expiryDate ||
                        // isNaN(Number(expiryDate)) ||
                        expiryDate.length !== 5 ||
                        expiryDateObj < today ||
                        expiryDateObj > nextFiveYears) && (
                        <FormHelperText error>
                          Please enter Date only in Future
                        </FormHelperText>
                      )} */}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="security-code"
                      label="Security Code (CVV)"
                      variant="outlined"
                      fullWidth
                      size="small"
                      placeholder="Cvv"
                      onChange={(e) => setCvv(e.target.value)}
                    />
                    {formError &&
                      (!cvv || isNaN(Number(cvv)) || cvv.length !== 3) && (
                        <FormHelperText error>
                          Please enter only number(less than 3)
                        </FormHelperText>
                      )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="cardholder-name"
                      label="Cardholder Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      placeholder="Enter Cardholder Name"
                      onChange={(e) => setCardHolderName(e.target.value)}
                    />
                    {formError && !cardHolderName && (
                      <FormHelperText error>
                        Please enter CardHolder name.
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              )}

              <Grid container justifyContent="space-between" mt={2}>
                {/* <Grid item>
              <Button variant="contained">Back</Button>
            </Grid> */}
              </Grid>
              {/* </form> */}
            </CardContent>
            <Button type="submit" variant="contained" color="primary">
              Submit Payment
            </Button>
          </Card>
        </Grid>
      </form>
      <Grid item xs={12} md={3} sm={12}>
        <OrderDetail />
      </Grid>
    </Grid>
  );
}

export default NewCheckout;
