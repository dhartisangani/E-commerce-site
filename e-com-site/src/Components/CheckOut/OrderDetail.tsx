import { Card, CardContent } from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@mui/material";
import { RootState } from "../../redux/store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textDecoration: "none",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      position: "relative",
      textAlign: "center",
      padding: "10px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.contrastText,
      },
    },
    root: {
      color: theme.palette.text.primary,
    },
  })
);

const OrderDetail = () => {
  const classes = useStyles();
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );
  const orderDetail = {
    totalQuantity,
    cartItems,
    totalAmount,
  };

  const orderDetailJSON = JSON.stringify(orderDetail);

  localStorage.setItem("orderDetail", orderDetailJSON);

  return (
    <Grid
      container
      spacing={2}
      mb={5}
      mt={"5px"}
      justifyContent="space-between"
    >
      {/* <Grid item xs={12} md={3} sm={12} container justifyContent="center"> */}
      <Card style={{ height: "auto" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6">Total Quantity</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="right">
                {totalQuantity} 
                {/* ${(totalBillingAmount + shippingCharges).toFixed(2)} */}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {cartItems.map((item: any, index: any) => (
                <Tr item={item} key={index} />
              ))}
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom className={classes.root}>
                Subtotal
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">
                {`$${totalAmount.toFixed(2)}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom className={classes.root}>
                Shipping : <br />
                Free Shipping
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right">$0</Typography>
            </Grid>
            <Grid item xs={12}>
              <hr />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Total Amount</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" align="right">
                {`$${totalAmount.toFixed(2)}`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
    // </Grid>
  );
};
interface Props {
  item: {
    id: any;
    productName: string;
    price: number;
    quantity: number;
  };
}
const Tr: React.FC<Props> = ({ item }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography gutterBottom>{item.productName}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" align="right">
          {item.quantity} x {`$${item.price.toFixed(2)}`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderDetail;
