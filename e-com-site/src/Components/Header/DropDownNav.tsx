import { useState, useCallback, useRef, useEffect } from "react";
import { Card, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";
import { getProfileData } from "../../Services/EventTemplateServices";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      textDecoration: "none",
      color: theme.palette.primary.contrastText,
    },
  })
);
export {};

function DropdownAccount() {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const logOutHandler = async () => {
    setOpenProfile(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  let menuRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    let handleClickOutside = (event: any) => {
      if (!menuRef?.current?.contains(event.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const profileHandler = useCallback(async () => {
  //   setOpenProfile((prev) => !prev);

  //   const token: string = localStorage.getItem("token") as string;
  //   const response = await fetch("http://localhost:4000/user/userdata", {
  //     headers: {
  //       Authorization: token,
  //     },
  //   });
  //   const json = await response.json();
  //   setUsername(json.username);
  //   setEmail(json.email);
  // }, []);

  const profileHandler = async () => {
    setOpenProfile((prev) => !prev);
    try {
      const response = await getProfileData();
      if (response) {
        setUsername(response.username);
        setEmail(response.email);
      }
    } catch (error) {
      console.error("Error retrieving profile data:", error);
    }
  };

  return (
    <>
      <AccountCircleIcon
        className={classes.icon}
        // style={{ color: theme.palette.text.secondary, marginRight: "4%" }}
        fontSize="large"
        onClick={profileHandler}
      />
      {localStorage.getItem("token") ? (
        <div>
          {openProfile && (
            <Card
              ref={menuRef}
              // className={classes.profile}
              style={{
                color: "white",
                background: "black",
                display: "flex",
                position: "absolute",
                right: "-2rem",
                top: "0.8rem",
                padding: "1rem",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{username}</Typography>
              <Typography variant="body1" style={{ fontSize: "12px" }}>
                {email}
              </Typography>
              <Link
                to="/login"
                onClick={logOutHandler}
                style={{
                  color: "white",
                  background: "primary.main",
                }}
              >
                Log out
              </Link>
              <Link
                to="/dashboard"
                style={{
                  color: "white",
                  background: "primary.main",
                }}
              >
                Dashboard
              </Link>
            </Card>
          )}
        </div>
      ) : (
        <div>
          {openProfile && (
            <Card
              ref={menuRef}
              style={{
                color: "white",
                background: "black",
                display: "flex",
                position: "absolute",
                right: "-2rem",
                top: "0.6rem",
                padding: "1rem",
                width: 100,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                to="/login"
                onClick={logOutHandler}
                style={{
                  color: "white",
                  background: "primary.main",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                log In
              </Link>
            </Card>
          )}
        </div>
      )}
    </>
  );
}

export default DropdownAccount;
