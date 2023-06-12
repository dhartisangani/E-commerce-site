import { Box, Container, Grid, Typography } from "@mui/material";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import GitHubIcon from "@mui/icons-material/GitHub";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // backgroundColor: theme.palette.primary.main,
      // color: theme.palette.primary.contrastText,
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      position: "sticky",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    links: {
      display: "flex",
      textDecoration: "none",
      color: theme.palette.text.primary,
      alignItems: "center",
    },
    contact: {
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
  })
);
export {};
const getLang = () => {
  const localLang: any = localStorage.getItem("lang");
  return localLang ? JSON.parse(localLang) : "";
};
const Footer = () => {
  const classes = useStyles();
  const [language, setLanguage] = useState(getLang());

  const { t, i18n } = useTranslation();

  // Handle to select language
  const handleLanguage = (e: any) => {
    setLanguage(e.target.value);
    localStorage.setItem("lang", JSON.stringify(e.target.value));
    i18n.changeLanguage(e.target.value);
  };
  return (
    <Box className={classes.root} p={5}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h5" gutterBottom>
              {/* E-Mart Online Shopping */}
              {t(`footer.title`)}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 5 }}>
              {t(`footer.aboutline`)}
            </Typography>

            <Link
              to="/contact"
              className={classes.contact}
              style={{ fontWeight: "bold" }}
            >
              {t(`footer.contact`)}
            </Link>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
                      {t(`footer.categories`)}
            </Typography>
            <Typography component="div">
              <Link to="/shop" className={classes.links}>
              {t(`footer.sofa`)}
              </Link>
              <Link to="/shop" className={classes.links}>
              {t(`footer.chair`)}
              </Link>
              <Link to="/shop" className={classes.links}>
              {t(`footer.mobile`)}
              </Link>
              <Link to="/shop" className={classes.links}>
              {t(`footer.watch`)}
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
            {t(`footer.account`)}
            </Typography>
            <Typography variant="body1" component="div">
              <Link to="/shop" className={classes.links}>
              {t(`footer.info`)}
              </Link>
              <Link to="/shop" className={classes.links}>
              {t(`footer.order`)}
              </Link>
              <Link to="/shop" className={classes.links}>
              {t(`footer.credit`)}
              </Link>
              <Link to="/shop" className={classes.links}>
              {t(`footer.address`)}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
            {t(`footer.contactInfo`)}
            </Typography>
            <Typography variant="body1" component="div">
              <Link to="/contact" className={classes.links}>
                <span>
                  <HomeOutlinedIcon />
                </span>
                {t(`footer.title`)}
              </Link>
              <Link to="/contact" className={classes.links}>
                <span>
                  <AddIcCallOutlinedIcon />
                </span>
                {t(`footer.phone`)}
              </Link>
              <Link to="/contact" className={classes.links}>
                <span>
                  <PrintOutlinedIcon />
                </span>
                {t(`footer.fex`)}
              </Link>
              <Link to="/contact" className={classes.links}>
                <span>
                  <MailOutlineOutlinedIcon />
                </span>
                {t(`footer.email`)}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className="language_select">
              <select
                className="form-select"
                value={language}
                onChange={handleLanguage}
                id="language-choose"
              >
                <option value="ja">{t(`translation.gujarati`)}</option>
                <option value="en">{t(`translation.english`)}</option>
              </select>
            </div>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Company Name. All rights reserved.
          </Typography>
          <Typography variant="body2">
            Terms & Conditions | Privacy Policy
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
