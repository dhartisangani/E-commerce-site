import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Helmet from "../Components/Helmet/Helmet";
import Services from "../Components/OurServices/Services";
import Header from "../Components/Header/Header";
import { FETCH_PRODUCTlIST } from "../Configs/AppConfig";
import instance from "../Services/AxiosInterCeptors";
import ProductCardSkeleton from "../UI/ProductCardLoder";
import { Product } from "../type";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: theme.spacing(20),
      minHeight: "100vh",
      padding: theme.spacing(3),
    },
    image: {
      marginTop: theme.spacing(8),
      maxWidth: "100%",
      height: "auto",
    },
  })
);
export {};

const Home: React.FC = () => {
  const classes = useStyles();
  const [bestSalse, setBestSalse] = useState<Product[]>([]);
  const [chair, setChair] = useState<Product[]>([]);
  const [mobile, setMobile] = useState<Product[]>([]);
  const [wireless, setWireless] = useState<Product[]>([]);
  const [watch, setWatch] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await instance.get(FETCH_PRODUCTlIST);
    const data = await response.data;
    // setProductsData(
    //   data.filter((product: Product) => product.status === "active")
    // );
    setBestSalse(
      data.filter(
        (product: any) =>
          product.subcategory === "bestselling" && product.status === "active"
      )
    );
    setChair(
      data.filter(
        (product: any) =>
          product.category === "chair" && product.status === "active"
      )
    );
    setMobile(
      data.filter(
        (product: any) =>
          product.category === "mobile" && product.status === "active"
      )
    );
    setWireless(
      data.filter(
        (product: any) =>
          product.category === "wireless" && product.status === "active"
      )
    );
    setWatch(
      data.filter(
        (product: any) =>
          product.category === "watch" && product.status === "active"
      )
    );
    setIsLoading(false);
  };

  const renderProductSection = (title: any, product: any) => {
    return (
      <section>
        <Typography align="center" variant="h4">
          {title}
        </Typography>
        <ul>
          <ProductCardSkeleton isLoading={isLoading} data={product} />
        </ul>
      </section>
    );
  };

  return (
    <Helmet title={"Home"} className={classes.root}>
      <Header />
      <Services />
      <div>
        {renderProductSection(" Best Selling Products", bestSalse)}
        {renderProductSection("Trending Products", chair)}
        {renderProductSection("New Arrivals in Mobile", mobile)}
        {renderProductSection("Popular in Watches and Headphones", [
          ...watch,
          ...wireless,
        ])}
      </div>
    </Helmet>
  );
};

export default Home;
