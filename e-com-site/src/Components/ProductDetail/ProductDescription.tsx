import { useState, useRef, useEffect } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarHalfOutlinedIcon from "@mui/icons-material/StarHalfOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import { Product } from "../../type";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import instance from "../../Services/AxiosInterCeptors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textDecoration: "none",
      border: "none",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      marginTop: "5%",
      marginLeft: "2%",
      width: "15%",
      padding: "8px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.contrastText,
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
const ProductDescription = () => {
  const reviewUser = useRef<HTMLFormElement>(null);
  // const reviewMessage = useRef<HTMLFormElement>(null);
  const [tab, setTab] = useState("description");
  const [rating, setRating] = useState(0);
  const classes = useStyles();
  const { _id } = useParams<{ _id: string }>();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Product | null>(null);
  // const product = Products.find((item: Product) => item.id === id);
  const { description, reviews } = (data as Product) || {};

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await instance.get(
          `http://localhost:4000/product/getproductList/${_id}`
        );
        const data = await response.data;
        setData(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchProduct();
  }, [_id]);

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

  return (
    <>
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
    </>
  );
};

export default ProductDescription;
