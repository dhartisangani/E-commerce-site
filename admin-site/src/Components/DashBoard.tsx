import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@mui/material";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Legend,
  Line,
} from "recharts";
import axios from "axios";
import instance from "../Services/AxiosInterCeptors";

type StyleClass =
  | "backgroundPurple"
  | "backgroundOrange"
  | "backgroundCyan"
  | "backgroundSky";

interface ServiceBoxProps {
  title: string;
  quantity: any;
  styleClass: StyleClass;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: "black",
      height: "100%",
      padding: "5%",
    },

    backgroundPurple: {
      background: "#D6CDEA",
    },
    backgroundOrange: {
      background: "#EFF9DA",
    },
    backgroundCyan: {
      background: "#F9D8D6",
    },
    backgroundSky: {
      background: "#CDF5F6",
    },
  })
);

const ServiceBox: React.FC<ServiceBoxProps> = ({
  title,
  quantity,
  styleClass,
}) => {
  const classes = useStyles();
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={`${classes.root} ${classes[styleClass]}`}
    >
      <Box textAlign="center">
        <Typography
          component={"p"}
          gutterBottom
          style={{ fontWeight: "bold", fontSize: "18" }}
        >
          {title}
        </Typography>
        <Typography
          component={"p"}
          style={{ fontWeight: "bold", fontSize: "22px" }}
        >
          {quantity}
        </Typography>
      </Box>
    </motion.div>
  );
};

const DashBoard: React.FC = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [perDaySales, setPerDaySales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalCountResponse = await instance.get(
          "http://localhost:4000/totals"
        );
        const totalCountData = await totalCountResponse.data;
        setTotalCount(totalCountData.totalUser);
        setTotalProducts(totalCountData.totalProduct);
        setTotalOrder(totalCountData.totalOrder);
        setTotalSales(totalCountData.totalSales);

        const perDaySalesResponse = await instance.get(
          "http://localhost:4000/order/perdaysalse"
        );
        const perDaySalesData = await perDaySalesResponse.data;
        setPerDaySales(perDaySalesData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const orderData = perDaySales.map((item: any) => ({
    date: item.date,
    sales: item.sales,
    orders: item.orders,
  }));

  return (
    <>
      {/* {localStorage.getItem("token") ? ( */}
      <Box py={8}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <ServiceBox
              title="Total Sales"
              quantity={`$${totalSales?.toFixed(2)}`}
              styleClass="backgroundPurple"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceBox
              title="Total Orders"
              quantity={totalOrder}
              styleClass="backgroundOrange"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceBox
              title="Total Products"
              quantity={totalProducts}
              styleClass="backgroundCyan"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ServiceBox
              title="Total Users"
              quantity={totalCount}
              styleClass="backgroundSky"
            />
          </Grid>
        </Grid>
        <Typography variant="h5" align="center" m={8}>
          <span style={{ fontWeight: "bold", margin: "5px" }}>
            <TrendingUpOutlinedIcon />
          </span>
          Daily Orders/Sales OverView
        </Typography>

        <Grid item xs={12}>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={orderData}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                name="Total Sales"
                stroke="#8884d8"
              />
              <Line
                type="monotone"
                dataKey="orders"
                name="Total Orders"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Box>
    </>
  );
};

export default DashBoard;
