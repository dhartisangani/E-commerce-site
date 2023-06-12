import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@material-ui/core";
import colorWheel from "../../assets/images/color-wheel.png";
import CloseIcon from "@mui/icons-material/Close";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import theme from "../../UI/theme";
import ColorPicker from "react-pick-color";
import { ColorResult } from "react-color";

const drawerWidth = 250;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: "hidden",
      display: "flex",
      width: "100%",
      justifyContent: "right",
      borderRadius: 50,
      position: "fixed",
      left: "96%",
      top: "20%",
      zIndex: 1,
      padding: "5px",
    },
    drawer: {
      width: drawerWidth,
      position: "relative",
      overflow: "hidden",
      top: "50%",
      // height: "50%",
    },
    drawerPaper: {
      width: drawerWidth,
      overflow: "hidden",
      marginTop: "calc(25vh)",
      borderRadius: "5px",
      // height: "65%",
      boxShadow:
        "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
    },
    imageRotate: {
      animation: "$rotate 5s linear infinite",
    },
    "@keyframes rotate": {
      "0%": {
        transform: "rotateZ(0deg)",
      },
      "100%": {
        transform: "rotateZ(360deg)",
      },
    },
    button: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    button2: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
    reset: {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      width: "50%",
      height: 35,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.contrastText,
      },
    },
    nestedDrawer: {
      width: 250,
      flexShrink: 0,
      overflow: "hidden",
      position: "relative",
      top: "50%",
    },
  })
);

interface Props {
  paletteType?: "light" | "dark";
  toggaleMode: () => void;
  resetColorHandle: () => void;
  colorChangeHandle: (color: any, lightColor: any) => void;
  color: string;
  lightColor: string;
}

const CustomThemeSidebar = (props: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(true);
  // const { paletteType } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
  const [isSubColorPickerOpen, setIsSubColorPickerOpen] =
    useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState<string>("");
  const anchorRef = React.useRef<any>();
  useEffect(() => {
    setTimeout(() => setAnchorEl(anchorRef?.current), 1);
  }, [anchorRef]);
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleColorWheelClick = () => {
    setIsRotated(!isRotated);
    setOpen(!open);
  };

  const handleColorPickerOpen = (event: React.MouseEvent<any>) => {
    setIsColorPickerOpen(true);
    if (event.currentTarget.id === "sub-color-picker") {
      setIsSubColorPickerOpen(true);
    } else {
      setIsSubColorPickerOpen(false);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleColorPickerClose = () => {
    setIsColorPickerOpen(false);
    setIsSubColorPickerOpen(false);
    setAnchorEl(null);
  };

  const handleColorChange = (color: ColorResult) => {
    setCurrentColor(color.hex);
    if (isSubColorPickerOpen) {
      props.colorChangeHandle(props.color, color.hex);
    } else {
      props.colorChangeHandle(color.hex, props.lightColor);
    }
  };

  return (
    <Container maxWidth="xl" > 
      <Box className={classes.root}>
        <img
          src={colorWheel}
          alt="theme-sidebar"
          style={{
            width: "2%",
            position: "sticky",
            top: "8%",
            right: "97%",
            zIndex: 1,
          }}
          className={classes.imageRotate}
          // className={`${isRotated ? classes.rotated : ""}`}
          onClick={handleColorWheelClick}
        />
      </Box>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {/* <div className={classes.drawerContainer}> */}
        <Typography
          component={"div"}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "15%",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            Live Color Theme
          </span>
          <CloseIcon
            onClick={handleDrawerClose}
            style={{ alignContent: "right", cursor: "pointer" }}
          />
        </Typography>
        <List>
          <ListItem
            onClick={() => {
              props.toggaleMode();
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <ListItemIcon>
              <BrightnessHighIcon
                style={{ color: theme.palette.primary.main }}
              />

              {/* {paletteType === "light" ? (
              <BrightnessHighIcon
                />
              ) : (
                <DarkModeIcon />
              )} */}
            </ListItemIcon>
            <ListItemText primary="Toggle dark mode" />
          </ListItem>
        </List>
        <hr style={{ opacity: "0.3" }} />
        <Typography
          variant="body1"
          align="center"
          style={{ fontWeight: "bold" }}
        >
          Theme Color
        </Typography>
        <Grid
          container
          spacing={2}
          style={{ margin: "4px 4px 6px -9px", justifyContent: "center" }}
        >
          <Grid item xs={5}>
            <Box
              style={{
                width: "100%",
                height: 35,
                borderRadius: "10px",
                position: "relative",
              }}
              onClick={() => {
                props.colorChangeHandle("#FF5722", "#f0c58e");
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "50%",
                  background: "#FF5722",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "100%",
                  width: "50%",
                  background: "#f0c58e",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={5}>
            <Box
              style={{
                width: "100%",
                height: 35,
                borderRadius: "10px",
                position: "relative",
              }}
              onClick={() => {
                props.colorChangeHandle("#3551e3", "#bcc5f6");
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "50%",
                  background: "#3551e3",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "100%",
                  width: "50%",
                  background: "#bcc5f6",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
              style={{
                width: "100%",
                height: 35,
                borderRadius: "10px",
                position: "relative",
              }}
              onClick={() => {
                props.colorChangeHandle("#6a1b9a", "#cebcf6");
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "50%",
                  background: "#6a1b9a",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "100%",
                  width: "50%",
                  background: "#cebcf6",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
              style={{
                width: "100%",
                height: 35,
                borderRadius: "10px",
                position: "relative",
              }}
              onClick={() => {
                props.colorChangeHandle("#3ca3aa", "#c6e9eb");
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "50%",
                  background: "#3ca3aa",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "100%",
                  width: "50%",
                  background: "#c6e9eb",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
              style={{
                width: "100%",
                height: 35,
                borderRadius: "10px",
                position: "relative",
              }}
              onClick={() => {
                props.colorChangeHandle("#91c653", "#a4e09f");
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "50%",
                  background: "#91c653",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "100%",
                  width: "50%",
                  background: "#a4e09f",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
              style={{
                width: "100%",
                height: 35,
                borderRadius: "10px",
                position: "relative",
              }}
              onClick={() => {
                props.colorChangeHandle("#e69000", "#f9ce96");
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "50%",
                  background: "#e69000",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "100%",
                  width: "50%",
                  background: "#f9ce96",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
              style={{
                width: "100%",
                height: 35,
                borderRadius: "10px",
                position: "relative",
              }}
              onClick={() => {
                props.colorChangeHandle("#d44444", "#f1c1c1");
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "50%",
                  background: "#d44444",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "100%",
                  width: "50%",
                  background: "#f1c1c1",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
              style={{
                width: "100%",
                height: 35,
                borderRadius: "10px",
                position: "relative",
              }}
              onClick={() => {
                props.colorChangeHandle("#d24b7b", "#f0c2d2");
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "50%",
                  background: "#d24b7b",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "100%",
                  width: "50%",
                  background: "#f0c2d2",
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <hr style={{ opacity: "0.3" }} />
        <Typography
          variant="body1"
          style={{ marginTop: "10px", fontWeight: "bold" }}
          align="center"
        >
          Add Your Favourite Color
        </Typography>
        <Grid
          container
          spacing={2}
          style={{ margin: "4px 4px 6px -9px", justifyContent: "center" }}
        >
          <Grid item xs={6}>
            <Box
              style={{
                width: "100%",
                height: 35,
                position: "relative",
              }}
              className={classes.button}
              onClick={handleColorPickerOpen}
            />
            <Typography
              component={"p"}
              align="center"
              style={{ marginTop: 10 }}
            >
              Main Color
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Box
              style={{
                width: "100%",
                height: 35,
                position: "relative",
              }}
              className={classes.button2}
              id="sub-color-picker"
              onClick={handleColorPickerOpen}
            />
            <Typography
              component={"p"}
              align="center"
              style={{ marginTop: 10 }}
            >
              Sub Color
            </Typography>
          </Grid>
        </Grid>

        <Drawer
          variant="persistent"
          className={classes.nestedDrawer}
          anchor="right"
          open={isColorPickerOpen}
        >
          {/* {anchorEl && ( */}
          <Popover
            open={isColorPickerOpen}
            onClose={handleColorPickerClose}
            anchorEl={anchorEl || undefined}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
          >
            <ColorPicker onChange={handleColorChange} />
          </Popover>
          {/* )} */}
        </Drawer>

        <Box onClick={() => props.resetColorHandle()} className={classes.reset}>
          Reset
        </Box>
      </Drawer>
    </Container>
  );
};

export default CustomThemeSidebar;
