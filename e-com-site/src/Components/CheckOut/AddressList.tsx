import { BillingDetail } from "../../type";
import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Box,
  Radio,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import instance from "../../Services/AxiosInterCeptors";

type Props = {
  list: BillingDetail[];
  onDeleteClickHnd: (data: BillingDetail) => void;
  onAddAddress: () => void;
  onEdit: (data: BillingDetail) => void;
  onNext: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textDecoration: "none",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      position: "relative",
      textAlign: "center",
      padding: "5px",
      margin: "10px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.contrastText,
      },
      "&.Mui-disabled": {
        background: "#eaeaea",
        color: "#c0c0c0",
        PointerEvent: "none",
        // onclick:"none"
      },
    },
    address: {
      // background: theme.palette.background.default,
      color: theme.palette.text.primary,
    },
    selectedAddress: {
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
    },
  })
);
const AddressList = (props: Props) => {
  const { list, onDeleteClickHnd, onEdit } = props;
  const [error, setError] = useState(false); 
  const [selectedAddress, setSelectedAddress] = useState(list[1] || null);
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

  const classes = useStyles();

  // const handleContinue = () => {
  //   if (!selectedAddress) {
  //     setError(true);
  //   } else {
  //     setError(false);
  //     localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
  //     props.onNext();
  //   }
  // };

  const handleContinue = async () => {
    if (!selectedAddress) {
      setError(true);
    } else {
      setError(false);

      const order = { selectedAddress, cartItems, totalAmount};

      try {
        const response = await instance.post("http://localhost:4000/order/order",order, {
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(order),
        });

        const data = await response.data;
        console.log(data);
        console.log(order);

        console.log("Order created:", response.data);

        props.onNext();
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" align="left" style={{ margin: "10px" }}>
        Address Information :-
      </Typography>
      {error && (
        <Typography color="error" variant="h6" style={{ margin: "10px" }}>
          Please select an address before continuing
        </Typography>
      )}

      <Grid container justifyContent="flex-start" spacing={2} wrap="wrap">
        {list?.map((address: any, index) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              style={{ margin: "10px" }}

              // justifyContent="space-around"
              // alignItems="center"
            >
              <Card
                style={{
                  width: "100%",
                  height: "100%",
                  margin: "5px",
                  // backgroundColor:
                  //   address === selectedAddress ? "whitesmoke" : "transparent",
                }}
                className={
                  address === selectedAddress
                    ? classes.selectedAddress
                    : classes.address
                }
              >
                {/* rest of the card content */}

                <CardContent>
                  <FormControlLabel
                    value="Address"
                    control={
                      <Radio
                        checked={address === selectedAddress}
                        onChange={() => {
                          setSelectedAddress(address);
                        }}
                      />
                    }
                    label="My Address"
                  />
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{ fontSize: "13px" }}
                  >
                    Name:- {address.firstName} {address.lastName}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{ fontSize: "13px" }}
                  >
                    Email:-{address.email}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{ fontSize: "13px" }}
                  >
                    Address:- {address.address1} {address.address2}
                  </Typography>

                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{ fontSize: "13px" }}
                  >
                    City:-{address.city}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{ fontSize: "13px" }}
                  >
                    State:-{address.state}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{ fontSize: "13px" }}
                  >
                    Pincode:-{address.pincode}
                  </Typography>

                  <Typography component="div">
                    <span onClick={() => onEdit(address)}>
                      <BorderColorIcon /> Edit
                    </span>
                    <span onClick={() => onDeleteClickHnd(address)}>
                      <DeleteIcon /> Delete
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Typography align="right">
        <Button
          onClick={() => {
            props.onAddAddress();
          }}
          className={classes.button}
        >
          Add New Address
        </Button>

        <Button
          className={`${
            !localStorage.getItem("AddressList")
              ? classes.button + " Mui-disabled"
              : classes.button
          }`}
          onClick={handleContinue}
          // onClick={() => {
          //   if (!selectedAddress) {
          //     setError(true);
          //   } else {
          //     setError(false);
          //     console.log(selectedAddress);
          //     props.onNext();
          //   }
          // }}
        >
          Continue
        </Button>
      </Typography>
    </Box>
  );
};

export default AddressList;
