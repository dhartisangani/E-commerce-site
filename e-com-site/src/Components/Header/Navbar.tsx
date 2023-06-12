import { useEffect } from "react";
import {
  AppBar,
  CssBaseline,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import DropdownAccount from "./DropDownNav";
import { cartActions } from "../../redux/Slices/CartSlice";
import { useDispatch } from "react-redux";
import { WishListAction } from "../../redux/Slices/WishListSlice";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      // background: theme.palette.background.default,
      // color: theme.palette.text.primary,
      position: "sticky",
      top: 0,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    nav: {
      // color: theme.palette.text.primary,
      color: theme.palette.primary.contrastText,
      display: "flex",
      alignItems: "center",
      fontSize: "5px",
      "&:active": {
        color: theme.palette.text.primary,
      },
    },
    list: {
      textDecoration: "none",
      fontSize: "18px",
      // color: theme.palette.text.primary,
      color: theme.palette.primary.contrastText,
      listStyle: "none",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      "&:hover": {
        color: theme.palette.text.primary,
      },
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
      "& li": {
        marginLeft: theme.spacing(3),
      },
    },

    logo: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      // color: theme.palette.text.primary,
      color: theme.palette.primary.contrastText,
    },
    icons: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      "& div": {
        position: "relative",
        marginLeft: theme.spacing(2),
      },
    },

    icon: {
      margin: "10px",
      textDecoration: "none",
      // color: theme.palette.text.primary,
      color: theme.palette.primary.contrastText,
    },
    badge: {
      position: "absolute",
      top: 5,
      right: "0px",
      background: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      fontSize: "0.8rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);
export {};

function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );
  const totalWishlist = useSelector(
    (state: RootState) => state.wishlist.totalWishlistQuantity
  );

  useEffect(() => {
    dispatch(cartActions.getTotals(totalQuantity));
    dispatch(WishListAction.getTotals(totalWishlist));
  }, [totalQuantity, totalWishlist]);
  return (
    <AppBar position="sticky" className={classes.root}>
      <Container maxWidth="xl">
        <CssBaseline />
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item md={2} sm={2} xs={3}>
            <Typography variant="h6" className={classes.logo}>
              <span>
                <LocalMallOutlinedIcon fontSize="large" />
              </span>
              <Link to="/" className={classes.logo}>
              {t(`navbar.logo`)}
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={6} md={4}>
            <Typography component="ul" className={classes.list}>
              <li>
                <Link to="/shop" className={classes.list}>
                {t(`navbar.Products`)}
                </Link>
              </li>
              <li>
                <Link to="/contact" className={classes.list}>
                {t(`navbar.Contact`)}
                </Link>
              </li>
            </Typography>
          </Grid>

          <Grid item sm={4} md={3} xs={3}>
            <div className={classes.icons}>
              <div>
                <Link to="/whishlist">
                  <FavoriteBorderOutlinedIcon
                    fontSize="large"
                    className={classes.icon}
                  />
                </Link>
                <span className={classes.badge}>{totalWishlist}</span>
              </div>
              <div>
                <Link to="/cart">
                  <ShoppingCartOutlinedIcon
                    fontSize="large"
                    className={classes.icon}
                  />
                </Link>

                <span className={classes.badge}>{totalQuantity}</span>
              </div>
              <div>
                <div className={classes.icon}>
                  <DropdownAccount />
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
}
export default Navbar;
