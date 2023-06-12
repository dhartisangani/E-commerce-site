import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { CardMedia, TextField } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import { Product } from "../../type";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/Slices/CartSlice";
import { WishListAction } from "../../redux/Slices/WishListSlice";
import AddToCartButton from "../../UI/GoToCart";
import { useEffect, useRef, useState } from "react";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import ProductList from "./ProductList";
import {
  FETCH_PRODUCTlIST,
} from "../../Configs/AppConfig";
import instance from "../../Services/AxiosInterCeptors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "10vh",
      alignItems: "left",
      // [theme.breakpoints.down("lg")]: {
      //   minHeight: "80vh"
      // },
    },
    button: {
      textDecoration: "none",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      position: "relative",
      textAlign: "center",
      padding: "8px 20px 8px 20px",
      top: "5%",
      margin: "5px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.contrastText,
      },
    },
    imgGrid: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundSize: "contain",
      [theme.breakpoints.down("lg")]: {
        minHeight: "50vh",
      },
    },
    image: {
      position: "relative",
      top: "5%",
      objectFit: "contain",
      height: "100%",
      fontWeight: "bold",
      backgroundSize: "contain",
      width: "30%",
      [theme.breakpoints.down("lg")]: {
        height: "100%",
        width: "100%",
      },
    },

    tab: {
      cursor: "pointer",
      "&.active": {
        fontWeight: "bold",
        borderBottom: "1px solid black",
      },
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "80%",
      padding: theme.spacing(3),
      [theme.breakpoints.down("lg")]: {
        width: "100%",
        margin: "auto",
      },
    },
  })
);
interface FormValues {
  name: string;
  comment: string;
  rating: any;
}
function ProductData() {
  const classes = useStyles();
  const { _id } = useParams<{ _id: string }>();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Product | null>(null);
  const { imgUrl, productName, price } = (data as Product) || {};
  // const imageUrl = Array.isArray(imgUrl) ? imgUrl[0] : imgUrl;
  const dispatch = useDispatch();
  const reviewUser = useRef<HTMLFormElement>(null);
  const [tab, setTab] = useState("description");
  const [rating, setRating] = useState(0);
  const { reviews } = (data as Product) || {};
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const reviewsubmitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: FormValues = {
      name: reviewUser.current?.username.value || "",
      comment: reviewUser.current?.comment.value || "",
      rating,
    };

    console.log(formData);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await instance.get(`${FETCH_PRODUCTlIST}/${_id}`);
        const data = await response.data;
        const { category } = data;

        const allProductsResponse = await instance.get(FETCH_PRODUCTlIST);
        const allProductsData = await allProductsResponse.data;

        const relatedProducts = allProductsData.filter(
          (product: Product) =>
            product.category === category && product._id !== _id
        );

        setProductsData(relatedProducts);
        setIsLoading(false);
        window.scrollTo(0, 0);
        setData(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchProduct();
    // setTimeout(() => {
    //   window.scrollTo(0, 0);
    // }, 300);
  }, [_id]);
  if (isLoading) {
    return (
      <Typography variant="h4" gutterBottom align="center">
        Loading...
      </Typography>
    );
  }
  const addtocart = () => {
    dispatch(
      cartActions.addItem({
        _id,
        id,
        productName,
        price,
        image: imgUrl,
        quantity: 1,
        totalPrice: price,
      })
    );
  };
  const addtoWishlist = () => {
    dispatch(
      WishListAction.addToWishlist({
        id,
        productName,
        price,
        image: imgUrl,
        quantity: 1,
        totalPrice: price,
      })
    );
  };

  return (
    <>
      {/* {data.map((product: Product, index) => { */}
      {data ? (
        <Grid container spacing={1} mb={5} className={classes.root}>
          <Grid item xs={12} md={6} sm={5} className={classes.imgGrid}>
            {/* <img className={classes.image} src={imgUrl} alt="product" /> */}
            <CardMedia
              className={classes.image}
              image={data.imgUrl}
              component="img"
            />
          </Grid>
          <Grid item xs={12} md={6} sm={5} mt={7}>
            <Typography variant="h4" mb={1}>
              {data.productName}
            </Typography>
            <Typography
              variant="h4"
              alignItems={"center"}
              flexDirection={"row"}
              display={"flex"}
              gap={3}
              mb={2}
            >
              <Typography color="#FFBF00">
                <span>
                  <StarOutlinedIcon />
                </span>
                <span>
                  <StarOutlinedIcon />
                </span>
                <span>
                  <StarOutlinedIcon />
                </span>
                <span>
                  <StarOutlinedIcon />
                </span>
                <span>
                  <StarHalfOutlinedIcon />
                </span>
              </Typography>
              <Typography variant="body1">{data.avgRating} ratings</Typography>
            </Typography>
            <Typography variant="h5" fontWeight={"bold"} mb={1}>
              {`$${data.price?.toFixed(2)}`}
            </Typography>
            <Typography component={"p"} mb={1}>
              Available Qty :-
              <span style={{ fontWeight: "bold" }}> {data.quantity}</span>
            </Typography>
            <Typography variant="body1">{data.shortDesc}</Typography>
            <AddToCartButton
              onClick={addtoWishlist}
              title="Add to WishList"
              detail="Your item has been added to the WishList."
            />
            <AddToCartButton
              onClick={addtocart}
              title="Add to Cart"
              detail="Your item has been added to the cart."
            />
          </Grid>
        </Grid>
      ) : (
        <div>Loading...</div>
      )}
      {data && (
        <Grid container spacing={1} mb={5}>
          <Grid item xs={12} md={12} minHeight={10}>
            <Typography
              component={"div"}
              display={"flex"}
              flexDirection={"row"}
              gap={5}
              className={classes.tab}
              mb={2}
            >
              <Typography
                className={`${
                  tab === "description" ? classes.tab + " active" : ""
                }`}
                onClick={() => setTab("description")}
                variant="h6"
              >
                Description
              </Typography>
              <Typography
                variant="h6"
                onClick={() => setTab("review")}
                className={`${tab === "review" ? classes.tab + " active" : ""}`}
              >
                Reviews ({data.reviews.length})
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} minHeight={10}>
            <Typography component={"div"}>
              {tab === "description" ? (
                <Typography variant="body1">{data.description}</Typography>
              ) : (
                <Grid container spacing={1} mb={5}>
                  <Grid item xs={12} md={6} mt={1}>
                    <ul className={classes.form}>
                      {data.reviews.length === 0 && (
                        <Typography variant="h4" gutterBottom>
                          No reviews added yet...
                        </Typography>
                      )}
                      {reviews.map((item, index) => (
                        <li key={index}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span>
                              <StarOutlinedIcon />
                            </span>
                            <span>
                              <StarOutlinedIcon />
                            </span>
                            <span>
                              <StarOutlinedIcon />
                            </span>
                            <span>
                              <StarOutlinedIcon />
                            </span>
                            <span>
                              <StarHalfOutlinedIcon />
                            </span>
                            <span>{item.rating} (rating)</span>
                          </div>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <form
                      className={classes.form}
                      onSubmit={reviewsubmitHandle}
                      ref={reviewUser}
                    >
                      <Typography variant="h4" gutterBottom>
                        Leave a Review
                      </Typography>
                      <TextField
                        name="username"
                        label="Comment"
                        variant="outlined"
                        fullWidth
                        size="small"
                        multiline
                        required
                        margin="dense"

                        // value={name}
                        // onChange={(event) => setName(event.target.value)}
                      />
                      <Typography
                        display={"flex"}
                        alignItems={"center"}
                        gap={2}
                        ml={2}
                        margin={2}
                      >
                        <span>Rating</span>
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => setRating(1)}
                        >
                          {rating >= 1 ? (
                            <StarIcon style={{ color: "#FFBF00" }} />
                          ) : (
                            <StarOutlineOutlinedIcon />
                          )}
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => setRating(2)}
                        >
                          {rating >= 2 ? (
                            <StarIcon style={{ color: "#FFBF00" }} />
                          ) : (
                            <StarOutlineOutlinedIcon />
                          )}
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => setRating(3)}
                        >
                          {rating >= 3 ? (
                            <StarIcon style={{ color: "#FFBF00" }} />
                          ) : (
                            <StarOutlineOutlinedIcon />
                          )}
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => setRating(4)}
                        >
                          {rating >= 4 ? (
                            <StarIcon style={{ color: "#FFBF00" }} />
                          ) : (
                            <StarOutlineOutlinedIcon />
                          )}
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => setRating(5)}
                        >
                          {rating >= 5 ? (
                            <StarIcon style={{ color: "#FFBF00" }} />
                          ) : (
                            <StarOutlineOutlinedIcon />
                          )}
                        </motion.span>
                      </Typography>

                      <TextField
                        name="comment"
                        label="Comment"
                        variant="outlined"
                        fullWidth
                        size="small"
                        multiline
                        required
                        margin="dense"

                        // value={comment}
                        // onChange={(event) => setComment(event.target.value)}
                      />
                      <motion.button
                        whileTap={{ scale: 1.1 }}
                        className={classes.button}
                        color="primary"
                        type="submit"
                      >
                        Submit
                      </motion.button>
                    </form>
                  </Grid>
                </Grid>
              )}
            </Typography>
          </Grid>
        </Grid>
      )}
      <Typography component={"div"}>
        <Typography variant="h5" ml={3} fontWeight={"bold"}>
          -: You might also like this :-
        </Typography>
        <ProductList data={productsData} />
      </Typography>
    </>
  );
}

export default ProductData;
