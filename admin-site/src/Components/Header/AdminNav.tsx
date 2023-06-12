import {
  AppBar,
  CssBaseline,
  Typography,
  Grid,
  Container,
  InputBase,
  Button,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewListIcon from "@mui/icons-material/ViewList";
import LogoutIcon from "@mui/icons-material/Logout";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useState } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import theme from "../../theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      position: "sticky",
      top: 0,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    logo: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
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
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },

    icon: {
      margin: "10px",
      textDecoration: "none",
      color: theme.palette.primary.contrastText,
    },
    searchInput: {
      marginRight: "10px",
      display: "flex",
      alignItems: "center",
    },
    search: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      borderRadius: "0px",
      // backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.contrastText,
      },
    },
    searchbar: {
      border: "2px solid",
      borderColor: theme.palette.primary.main,
      color: theme.palette.text.primary,
    },
    drawerPaper: {
      width: 240,
      overflow: "hidden",
      borderRadius: "5px",
      // height: "65%",
      boxShadow:
        "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
    },
  })
);
export {};

function AdminNav() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const logOutHandler = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* {localStorage.getItem("token") ? ( */}
        <AppBar position="sticky" className={classes.root}>
          <Container maxWidth="xl">
            <CssBaseline />
            <Grid container justifyContent="space-between" alignItems="center">
              <Toolbar>
                <Button color="inherit" onClick={toggleSidebar}>
                  <FormatListBulletedIcon fontSize="large" />
                </Button>
              </Toolbar>
              <Drawer
                open={isOpen}
                onClose={toggleSidebar}
                style={{ width: 500 }}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <Typography
                  variant="h5"
                  align="center"
                  style={{
                    margin: "10%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    <AccountCircleIcon fontSize="large" />
                  </span>
                  Admin Panel
                </Typography>
                <List style={{ paddingLeft: "14px" }}>
                  <hr style={{ opacity: "0.3" }} />

                  <ListItem button component={Link} to="/">
                    <span style={{ marginRight: "5px" }}>
                      <DashboardIcon />
                    </span>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                  <hr style={{ opacity: "0.3" }} />
                  <ListItem button component={Link} to="/dashboard/addProduct">
                    <span style={{ marginRight: "5px" }}>
                      <AddCircleIcon />
                    </span>
                    <ListItemText primary="AddProduct" />
                  </ListItem>
                  <hr style={{ opacity: "0.3" }} />
                  <ListItem button component={Link} to="/dashboard/allproducts">
                    <span style={{ marginRight: "5px" }}>
                      <SummarizeIcon />
                    </span>
                    <ListItemText primary="All Products" />
                  </ListItem>
                  <hr style={{ opacity: "0.3" }} />

                  <ListItem button component={Link} to="/dashboard/categories">
                    <span style={{ marginRight: "5px" }}>
                      <ViewListIcon />
                    </span>
                    <ListItemText primary="Categories" />
                  </ListItem>
                  <hr style={{ opacity: "0.3" }} />
                  <ListItem button component={Link} to="/dashboard/order">
                    <span style={{ marginRight: "5px" }}>
                      <CheckCircleIcon />
                    </span>
                    <ListItemText primary="Order Detail" />
                  </ListItem>
                  <hr style={{ opacity: "0.3" }} />
                  <ListItem button component={Link} to="/dashboard/users">
                    <span style={{ marginRight: "5px" }}>
                      <PeopleAltIcon />
                    </span>
                    <ListItemText primary="Manage Users" />
                  </ListItem>
                  <hr style={{ opacity: "0.3" }} />
                  <ListItem button component={Link} to="/login">
                    <span style={{ marginRight: "5px" }}>
                      <LogoutIcon />
                    </span>
                    <ListItemText primary="Log Out" onClick={logOutHandler} />
                  </ListItem>
                </List>
              </Drawer>

              <Grid item md={2} sm={2} xs={1}>
                <Typography variant="h6" className={classes.logo}>
                  <span>
                    <LocalMallOutlinedIcon fontSize="large" />
                  </span>
                  <Link to="/" className={classes.logo}>
                    Admin 
                  </Link>
                </Typography>
              </Grid>

              <Grid item xs={4} md={6} sm={5} className={classes.search}>
                <Grid item xs={4} md={12} sm={5} className={classes.searchbar}>
                  <InputBase
                    fullWidth
                    placeholder="Search hear.."
                    autoComplete="false"
                    name="searchbar"
                    inputProps={{ "aria-label": "search google maps" }}
                    className={classes.searchInput}
                    style={{
                      background: theme.palette.background.default,
                      color: theme.palette.text.primary,
                    }}
                  />
                </Grid>
                <Grid item xs={2} md={1} sm={1}>
                  <Button className={classes.button}>
                    <SearchOutlinedIcon />
                  </Button>
                </Grid>
              </Grid>

              <Grid item md={2} sm={2}>
                <div className={classes.icons}>
                  <div>
                    <Link
                      to="/login"
                      onClick={logOutHandler}
                      style={{
                        color: "white",
                        background: "primary.main",
                        fontSize: "18px",
                        textDecoration: "none",
                      }}
                    >
                      Log out
                    </Link>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </AppBar>
      {/* ) : (
        ""
      )} */}
    </>
  );
}
export default AdminNav;
