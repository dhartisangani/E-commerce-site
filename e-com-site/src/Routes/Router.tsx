import { Routes, Route, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { darkPalette, lightPalette } from "../UI/theme";
import Navbar from "../Components/Header/Navbar";
import CustomThemeSidebar from "../Components/Theme/CustomThemeSidebar";
import ContactUs from "../Pages/ContactUs";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import Cart from "../Pages/Cart";
import Footer from "../Components/Footer/Footer";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Confirmation from "../Components/CheckOut/Confirmation";
import NewCheckout from "../Pages/NewCheckout";
import Checkout from "../Pages/Checkout";
import WishList from "../Pages/WhishList";
import ProductDetail from "../Pages/ProductDetails";

// import instance from "./Services/AxiosInterCeptors";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scrollButton: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      transition: "opacity 0.9s ease in",
      "&:hover": {
        opacity: 1,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.contrastText,
      },
    },
  })
);
export {};

const Router = () => {
  const classes = useStyles();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [paletteType, setPaletteType] = useState("light");
  const [theme, setTheme] = useState(() => {
    return createTheme({
      palette: {
        ...lightPalette,
        // type: paletteType,
      },
    });
  });
  const [primaryColor, setPrimaryColor] = useState(theme.palette.primary.main);
  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.getItem("mode");
  }, []);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  const togglePaletteType = () => {
    const newPaletteType = paletteType === "light" ? "dark" : "light";
    const newPalette = newPaletteType === "light" ? lightPalette : darkPalette;
    // localStorage.setItem("mode", newPaletteType);
    setPaletteType(newPaletteType);
    setTheme(
      createTheme({
        palette: {
          ...newPalette,
          type: newPaletteType,
        },
      })
    );
  };

  const ColorHandler = (color: any, lightColor: any) => {
    const newTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        primary: {
          ...theme.palette.primary,
          main: color,
          light: lightColor,
        },
      },
    };
    setPrimaryColor(newTheme.palette.primary.main);
    setTheme(newTheme);
  };

  const resetHandeler = () => {
    if (paletteType === "light") {
      ColorHandler("#3f51b5", "#cbe4fe");
    } else {
      ColorHandler("#90caf9", "#e3f2fd");
    }
  };
  const color = theme.palette.primary.main;
  const lightColor = theme.palette.primary.light;

  return (
    <ThemeProvider theme={theme}>
      <div>
        {location.pathname.startsWith("/dashboard") ? (
          <>
            {/* <AdminNav /> */}
            ""
          </>
        ) : (
          <Navbar />
        )}
        <CustomThemeSidebar
          toggaleMode={togglePaletteType}
          paletteType={"light" ? "dark" : "light"}
          colorChangeHandle={ColorHandler}
          resetColorHandle={resetHandeler}
          color={color}
          lightColor={lightColor}
        />

        <ToastContainer />

        <Container maxWidth="xl">
          {/* <Card> */} 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/whishlist" element={<WishList />} />
            <Route path="/product/:_id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/newcheckout" element={<NewCheckout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/* </Card> */}
          </Routes>
        </Container>

        <hr />
        <Footer />
        {visible && (
          <Button
            className={classes.scrollButton}
            variant="contained"
            color="primary"
            onClick={scrollToTop}
          >
            <KeyboardArrowUpIcon />
          </Button>
        )}
      </div>
    </ThemeProvider>
  );
};
export default Router;
