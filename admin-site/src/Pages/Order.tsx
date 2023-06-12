import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Allproducts } from "../types";
import { useParams } from "react-router-dom";
import axios from "axios";
import instance from "../Services/AxiosInterCeptors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    thead: {
      fontWeight: "bold",
      fontSize: "18px",
      // [theme.breakpoints.down("lg")]: {
      //   // height: 'auto',
      //   width: 'auto',
      // },
    },
    total: {
      displpay: "flex",
      justifyContent: "center",
      width: 300,
      height: 300,
    },
    button: {
      textDecoration: "none",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      position: "relative",
      textAlign: "center",
      padding: "10px",
      height: "40px",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.primary,
      },
      "&.Mui-disabled": {
        background: "#eaeaea",
        color: "#c0c0c0",
        PointerEvent: "none",
        // onclick:"none"
      },
    },
  })
);
const Order = () => {
  const [products, setProducts] = useState<Allproducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get("http://localhost:4000/order/getorder");
      const data = await response.data;
      setProducts(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Typography variant="h4" gutterBottom align="center">
        Loading...
      </Typography>
    );
  }
  return (
    <Grid mb={28}>
      <Typography
        component={"div"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={5}
        mr={6}
        ml={6}
      >
        <Typography variant="h5">All orders Detail :--</Typography>
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} sm={12} m={5} justifyContent={"center"}>
          <Card>
            <TableContainer>
              {products.length === 0 ? (
                <Typography variant={"h5"} align="center" m={5}>
                  No Product added yet
                </Typography>
              ) : (
                <Table>
                  <TableHead style={{ position: "sticky" }}>
                    <TableRow>
                      <TableCell className={classes.thead}>Date</TableCell>
                      <TableCell className={classes.thead}>Image</TableCell>
                      <TableCell className={classes.thead}>Product</TableCell>
                      <TableCell className={classes.thead}>Quantity</TableCell>
                      <TableCell className={classes.thead}>Price</TableCell>
                      <TableCell className={classes.thead}>UserName</TableCell>
                      <TableCell className={classes.thead}>Address</TableCell>
                      <TableCell className={classes.thead}>
                        Payment Method
                      </TableCell>
                      <TableCell className={classes.thead}>
                        Total Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {products?.map((item: any, index: any) => (
                      <Tr
                        item={item}
                        key={index}
                        // getProductDetails={getProductDetails}
                      />
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};
interface CartItem {
  totalQuantity: number;
  image: string;
  productName: string;
  price: number;
  totalPrice: number;
  product: any;
  quantity: number;
}

export interface AllOrder {
  item: {
    _id: string;
    totalAmount: number;
    totalQuantity: number;
    cartItems: CartItem[];
    address1: string;
    address2: string;
    city: string;
    pincode: string;
    state: number;
    email: string;
    firstName: string;
    lastName: number;
    dateOrdered: any;
    paymentMethod: string;
  };
}
const Tr: React.FC<AllOrder> = ({ item }) => {
  const formatTime = (date: any) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <TableRow>
        <TableCell style={{ fontWeight: "bold" }}>
          {/* {formatDate(item.dateOrdered)} */}
          {formatTime(item.dateOrdered)}
          {/* {item.dateOrdered} */}
        </TableCell>
        <TableCell>
          {item.cartItems.map((cartItem: CartItem, index: number) => (
            <Typography
              component={"div"}
              style={{ display: "flex", flexDirection: "column" }}
              key={index}
            >
              <CardMedia
                key={index}
                component="img"
                image={cartItem.image}
                sx={{
                  backgroundSize: "contain",
                  objectFit: "contain",
                  height: "50px",
                  width: "50px",
                }}
              />
            </Typography>
          ))}
        </TableCell>
        <TableCell>
          {item.cartItems.map((cartItem: CartItem, index: number) => (
            <Typography
              component={"div"}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              key={index}
            >
              {cartItem.productName}
            </Typography>
          ))}
        </TableCell>
        <TableCell>
          {item.cartItems.map((cartItem: CartItem, index: number) => (
            <Typography
              component={"div"}
              style={{ display: "flex", flexDirection: "column" }}
              key={index}
            >
              {cartItem.quantity}
            </Typography>
          ))}
        </TableCell>
        <TableCell>
          {item.cartItems.map((cartItem: CartItem, index: number) => (
            <Typography
              component={"div"}
              style={{
                display: "flex",
                flexDirection: "column",
                fontWeight: "bold",
              }}
              key={index}
            >
              {`$${cartItem.price?.toFixed(2)}`}
            </Typography>
          ))}
        </TableCell>
        <TableCell>
          <Typography
            component={"div"}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <span>
              {item.firstName} {item.lastName},
            </span>
            <span>{item.email}</span>
          </Typography>
        </TableCell>

        <TableCell>
          <Typography
            component={"div"}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <span>{item.address1},</span>
            <span>{item.address2},</span>
            <span>
              {item.city},{item.state},
            </span>
            <span>{item.pincode}</span>
          </Typography>
        </TableCell>
        <TableCell>
          <span>{item.paymentMethod}</span>
        </TableCell>
        <TableCell>
          <span style={{ fontWeight: "bold" }}>
            {`$${item.totalAmount?.toFixed(2)}`}
          </span>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Order;
