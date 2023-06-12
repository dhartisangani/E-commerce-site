import { useEffect } from "react";
import {
  AppBar,
  CssBaseline,
  Typography,
  Grid,
  Container,
  InputBase,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { cartActions } from "../../redux/Slices/CartSlice";
import { useDispatch } from "react-redux";
import { WishListAction } from "../../redux/Slices/WishListSlice";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // backgroundColor: theme.palette.primary.main,
      // color: theme.palette.primary.contrastText,
      color: "black",
      backgroundColor: "white",
      width: "100%",
      display: "flex",
      // justifyContent: "center",
      alignItems: "center",
    },
    nav: {
      // color: theme.palette.primary.main,
      // marginLeft: theme.spacing(70),
      display: "flex",
      alignItems: "center",
      fontSize: "5px",
      "&:active": {
        color: "black",
      },
    },

    search: {
      //   width: "100%",
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
    },

    link: {
      textDecoration: "none",
      fontSize: "18px",
      justifyContent: "center",
      color: "#808080",
      marginLeft: theme.spacing(5),
      listStyle: "none",
      "&:hover": {
        color: "black",
        borderBottom: "1px solid white",
      },
    },
    logo: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "black",
    },
    icons: {
      display: "flex",
      // marginLeft: theme.spacing(20),
      justifyContent: "center",
      alignItems: "center",
    },

    icon: {
      margin: "10px",
      textDecoration: "none",
      color: "black",
    },
    badge: {
      position: "absolute",
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
      fontSize: "12px",
      fontWeight: "bold",
      padding: "3px 7px 3px 7px;",
      borderRadius: "50px",
      marginLeft: "-1.3rem",
      top: "8px",
    },
    formControl: {
      width: "20%",
      minWidth: 100,
      // height: "4%",
    },
    searchIcon: {
      width: "100%",
      minWidth: 100,
      height: "5%",
    },
  })
);
export {};

function NavHeader() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );
  const totalWishlist = useSelector(
    (state: RootState) => state.wishlist.totalWishlistQuantity
  );

  useEffect(() => {
    dispatch(cartActions.getTotals(totalQuantity));
    dispatch(WishListAction.getTotals(totalWishlist));
  }, []);
  return (
    <AppBar position="static" className={classes.root}>
      <Container maxWidth="xl">
        <CssBaseline />
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={6} md={1} sm={1}>
            <Typography variant="body1" className={classes.logo}>
              {/* <span>
                <ShoppingBagOutlinedIcon fontSize="large" />
              </span> */}
              <Link to="/shop" className={classes.logo}>
                Products
              </Link>
              <Link to="/contactus" className={classes.logo}>
                Contact
              </Link>
            </Typography>
          </Grid>

          {/* <Grid item xs={12} sm={6} md={8}>
          </Grid> */}

          <Grid item xs={6} sm={3} md={1}>
            <Grid item xs={12} md={6} className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchOutlinedIcon />
              </div>
              <InputBase
                placeholder="Search…"
                // classes={{
                //   root: classes.inputRoot,
                //   input: classes.inputInput,
                // }}
                inputProps={{ "aria-label": "search" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
}
export default NavHeader;
