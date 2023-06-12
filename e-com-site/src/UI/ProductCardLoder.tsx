import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Skeleton from "@mui/material/Skeleton";
import { Product } from "../type";
import ProductCard from "./ProductCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 350,
      height: 300,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0px",
      backgroundSize: "contain",
    },
    media: {
      height: 150,
      fontWeight: "bold",
      zIndex: -1,
      [theme.breakpoints.down("lg")]: {
        height: 200,
      },
    },
    name: {
      textDecoration: "none",
      color: "black",
    },
    bottom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    icon: {
      color: theme.palette.primary.main,
    },
    hearticon: {
      color: theme.palette.error.main,
    },
  })
);

interface MediaProps {
  data: Product[];
  isLoading?: boolean;
}

export default function ProductCardSkeleton(props: MediaProps) {
  const { isLoading = false, data } = props;
  const classes = useStyles();

  return (
    <Box py={6}>
      <Grid container spacing={2} justifyContent="center" wrap="wrap">
        {(isLoading ? Array.from(new Array(20)) : data).map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              key={index}
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "100%",
                maxWidth: 350,
                height: 330,
                marginBottom: 5,
              }}
            >
              {item ? (
                <ProductCard item={item} />
              ) : (
                <>
                  <Skeleton
                    variant="rectangular"
                    className={classes.media}
                    width="100%"
                    height={190}
                  />

                  <Box sx={{ pt: 0.5, height: 70 }}>
                    <Skeleton width="100%" height={30} />
                    <Skeleton width="20%" height={20} />
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Skeleton width="50%" height={33} />
                      <Skeleton variant="circular" width="11%" height={33} />
                      <Skeleton variant="circular" width="11%" height={33} />
                    </span>
                  </Box>
                </>
              )}
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}
