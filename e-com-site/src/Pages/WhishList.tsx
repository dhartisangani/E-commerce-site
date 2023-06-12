import {
  Card,
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
import { WishListAction } from "../redux/Slices/WishListSlice";
import AddToCartButton from "../UI/GoToCart";

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
        color: theme.palette.text.primary,
      },
      "&.Mui-disabled": {
        background: "#eaeaea",
        color: "#c0c0c0",
        PointerEvent: "none",
        // onclick:"none"
      },
    },
  })
);
const WishList = () => {
  const wishlist = useSelector(
    (state: RootState) => state.wishlist.wishlistItems
  );

  const classes = useStyles();
  // const isCartEmpty = cartItems.length === 0;
  return (
    <Helmet title={"wishlist"}>
      <Grid mb={28}>
        <Typography variant="h5" align="center" mt={5}>
          My Wishlist
        </Typography>

        <Grid container spacing={1} mb={5} mt={5}>
          <Grid item xs={12} md={12} sm={12} m={5} justifyContent={"center"}>
            <Card>
              <TableContainer>
                {wishlist.length === 0 ? (
                  <Typography component={"div"} align="center" m={5}>
                    <Typography variant="h5" m={5}>
                      No item added yet
                    </Typography>
                    <Link to={"/shop"} className={classes.button}>
                      Add Products to Wishlist
                    </Link>
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
                      {wishlist.map((item: any, index: any) => (
                        <Tr item={item} key={index} />
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Helmet>
  );
};

export interface WishListProps {
  item: {
    _id: any;
    id: any;
    image: string;
    productName: string;
    price: number;
  };
}

const Tr: React.FC<WishListProps> = ({ item }) => {
  const dispatch = useDispatch();
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
    dispatch(WishListAction.deleteWishListItem(item.id));
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
      <TableCell onClick={addItem}>
        {/* <ShoppingCartOutlinedIcon /> */}
        <AddToCartButton
          onClick={addItem}
          title="Add to Cart"
          detail="Your item has been added to the cart."
        />
      </TableCell>
      <TableCell onClick={removeItem}>
        <DeleteIcon />
      </TableCell>
    </TableRow>
  );
};

export default WishList;
