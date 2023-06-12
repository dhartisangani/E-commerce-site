import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/Slices/CartSlice";
import { WishListAction } from "../redux/Slices/WishListSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export interface ProductCardProps {
  item: {
    productName: string;
    imgUrl: string;
    price: number;
    category: string;
    id: any;
    _id: any;
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 350,
      height: 300,
      // width: 230,
      // minHeight: "35vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0px",
      backgroundSize: "contain",
      // [theme.breakpoints.down("lg")]: {
      //   height: 'auto',
      //   width: 'auto',
      // },
    },
    media: {
      height: 150,
      fontWeight: "bold",
      zIndex: -1,
      [theme.breakpoints.down("lg")]: {
        height: 200,
      },
    },
    name: {
      textDecoration: "none",
      color: "black",
    },
    bottom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    icon: {
      color: theme.palette.primary.main,
    },
    hearticon: {
      color: theme.palette.error.main,
    },
  })
);

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const isWishlisted = wishlistItems.some(
    (wishlistItem: any) => wishlistItem.id === item.id
  );
  const imageUrl = Array.isArray(item.imgUrl) ? item.imgUrl[0] : item.imgUrl;
  const classes = useStyles();
  const dispatch = useDispatch();
  const addtocart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        _id: item._id,
        productName: item.productName,
        price: item.price,
        image: item.imgUrl,
        quantity: 1,
        totalPrice: item.price,
      })
    );
  };

  const addToWishlist = () => {
    if (!isWishlisted) {
      dispatch(
        WishListAction.addToWishlist({
          id: item.id,
          productName: item.productName,
          price: item.price,
          image: item.imgUrl,
          quantity: 1,
          totalPrice: item.price,
        })
      );
    }
  };
  const removeWishlist = () => {
    if (isWishlisted) {
      dispatch(WishListAction.deleteWishListItem(item.id));
    }
  };
  return (
    <Card className={classes.root}>
      <CardActionArea>
        {/* <Link to="/productDetail"> </Link> */}
        <Link to={`/product/${item._id}`}>
          <CardMedia
            className={classes.media}
            image={item.imgUrl}
            title={item.productName}
            component="img"
            alt={"image"}
            sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            <Link
              className={classes.name}
              to={`/product/${item._id}`}
              // onClick={() =>
              //   setTimeout(
              //     () => window.open(`/product/${item.id}`, "_self"),
              //     300
              //   )
              // }
            >
              {item.productName}
            </Link>
          </Typography>
          <span>{item.category}</span>

          <Typography
            variant="body2"
            color="textPrimary"
            component="div"
            className={classes.bottom}
          >
            <Typography variant="h6">{`$${item.price?.toFixed(2)}`}</Typography>

            <motion.span
              whileTap={{ scale: 1.2 }}
              style={{ margin: "5px", justifyContent: "right" }}
            >
              {isWishlisted ? (
                <FavoriteIcon
                  className={classes.hearticon}
                  onClick={removeWishlist}
                />
              ) : (
                <FavoriteBorderOutlinedIcon
                  className={classes.icon}
                  onClick={addToWishlist}
                />
              )}
            </motion.span>
            <motion.span whileTap={{ scale: 1.2 }} onClick={addtocart}>
              <AddCircleIcon className={classes.icon} />
            </motion.span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
