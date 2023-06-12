import { Typography, Container, Grid, Box } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import WelcomeImage from "../../assets/images/hero-img.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(12),
    },

    button: {
      textDecoration: "none",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      position: "relative",
      top: "5%",
      textAlign: "center",
      padding: "10px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.contrastText,
      },
    },
    image: {
      marginTop: theme.spacing(8),
      maxWidth: "100%",
      height: "auto",
    },
  })
);
export {};

function Header() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      {/* //maxWidth="md" */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} className={classes.title}>
          <Typography variant="h4" align="left">
            Welcome to E-Mart
          </Typography>
          <p>Trending Products in 2023</p>
          <Typography variant="body1">
            You're now the list - and will be the first to know about our Latest
            styles, exclusive offers and much more. Don't miss one of our
            biggest sales of the year! Shop the Mother's Day Sale and save up to
            30% off sitewide.
          </Typography>

          <Link
            to="/shop"
            className={classes.button}
            onClick={() => console.log("Button clicked!")}
          >
            Shop Now
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
            <img src={WelcomeImage} alt="Welcome" className={classes.image} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Header;
