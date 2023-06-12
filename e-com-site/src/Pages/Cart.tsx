import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector } from "react-redux";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CardMedia, Grid, Typography } from "@mui/material";
import { RootState } from "../redux/store";
import Helmet from "../Components/Helmet/Helmet";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/Slices/CartSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import visaimg from "../assets/images/visa.png";
// import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    thead: {
      fontWeight: "bold",
      fontSize: "18px",
      // [theme.breakpoints.down("lg")]: {
      //   // height: 'auto',
      //   width: 'auto',
      // },
    },
    total: {
      displpay: "flex",
      justifyContent: "center",
      width: 300,
      height: 300,
    },
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
      "&.Mui-disabled": {
        background: "#eaeaea",
        color: "#c0c0c0",
        PointerEvent: "none",
        cursor: "default",
      },
    },
    icon: {
      color: theme.palette.primary.main,
    },
  })
);
const Cart = () => {
  // const [cookies] = useCookies(["token"]);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );
  const isCartEmpty = cartItems.length === 0;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartActions.getTotals(totalAmount));
    dispatch(cartActions.getTotals(totalQuantity));
  }, [totalAmount, totalQuantity]);

  const classes = useStyles();
  return (
    <Helmet title={"wishlist"}>
      <Grid mb={20}>
        <Typography variant="h5" align="center" mt={5}>
          My Cart
        </Typography>

        <Grid container spacing={1} mb={5} mt={5}>
          <Grid item xs={12} md={8} sm={12} m={5} justifyContent={"center"}>
            <Card>
              <TableContainer>
                {cartItems.length === 0 ? (
                  <Typography variant="h5" align="center" m={5}>
                    No item added yet
                  </Typography>
                ) : (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.thead}>Image</TableCell>
                        <TableCell className={classes.thead}>Title</TableCell>
                        <TableCell className={classes.thead}>Price</TableCell>
                        <TableCell className={classes.thead}>
                          Add to Cart
                        </TableCell>
                        <TableCell className={classes.thead}>Delete</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {cartItems.map((item: any, index: any) => (
                        <Tr item={item} key={index} />
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={3} sm={12} container justifyContent="center">
            <Card className={classes.total}>
              <CardContent>
                <Typography
                  component={"div"}
                  gap={2}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6">Total Amount</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {`$${totalAmount.toFixed(2)}`}
                  </Typography>
                </Typography>
                <Typography component={"p"} fontSize="14px" mt={1}>
                  {" "}
                  Taxes and shipping will calulate in checkout
                </Typography>
                <Typography
                  mt={4}
                  component={"div"}
                  display={"flex"}
                  flexDirection={"column"}
                  gap={1}
                >
                  {isCartEmpty ? (
                    <span className={`${classes.button} Mui-disabled`}>
                      Checkout
                    </span>
                  ) : (
                    <Link
                      // to={cookies.token ? "/newcheckout" : "/login"}
                      to={
                        localStorage.getItem("token") ? "/newcheckout" : "/login"
                      }
                      type="button"
                      className={classes.button}
                    >
                      Checkout
                    </Link>
                  )}

                  <Link to={"/shop"} className={classes.button}>
                    Continue Shopping
                  </Link>
                </Typography>
                <CardMedia
                  image={visaimg}
                  sx={{
                    backgroundSize: "contain",
                    objectFit: "contain",
                    height: "60px",
                    width: "100%",
                    padding: "5px",
                    marginTop: "15px",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Helmet>
  );
};
interface Props {
  item: {
    _id: string;
    id: any;
    image: string;
    productName: string;
    price: number;
    quantity: number;
  };
}

const Tr: React.FC<Props> = ({ item }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  // const imageUrl = Array.isArray(item.image) ? item.image[0] : item.image;
  const addItem = () => {
    dispatch(
      cartActions.addItem({
        _id: item._id,
        id: item.id,
        productName: item.productName,
        price: item.price,
        image: item.image,
        quantity: 1,
        totalPrice: item.price,
      })
    );
  };
  const removeItem = () => {
    dispatch(
      cartActions.removeItem({
        _id: item._id,
        id: item.id,
        productName: item.productName,
        price: item.price,
        // image: imageUrl,
        image: item.image,
        quantity: 1,
        totalPrice: item.price,
      })
    );
  };

  return (
    <TableRow>
      <TableCell>
        <CardMedia
          image={item.image}
          sx={{
            backgroundSize: "contain",
            objectFit: "contain",
            height: "50px",
            width: "50px",
          }}
        />
      </TableCell>
      <TableCell>{item.productName}</TableCell>
      <TableCell> {`$${item.price.toFixed(2)}`}</TableCell>
      <TableCell>
        <Typography component={"div"}>
          <Button onClick={removeItem}>-</Button>

          {item.quantity}
          <Button onClick={addItem}>+</Button>
        </Typography>
      </TableCell>
      <TableCell onClick={deleteProduct}>
        <DeleteIcon className={classes.icon} />
      </TableCell>
    </TableRow>
  );
};

export default Cart;
