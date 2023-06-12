import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Product } from "../../type";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import axios from "axios";
import instance from "../../Services/AxiosInterCeptors";

function RelatedProducts() {
  const { _id } = useParams<{ _id: string }>();
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(
          `http://localhost:4000/product/getproductList/${_id}`
        );
        const data = await response.data;
        const { category } = data; // Get the category of the opened product

        const allProductsResponse = await instance.get(
          "http://localhost:4000/product/getproductList"
        );
        const allProductsData = await allProductsResponse.data;

        const relatedProducts = allProductsData.filter(
          (product: Product) =>
            product.category === category && product._id !== _id
        );

        setProductsData(relatedProducts);
        setIsLoading(false);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Typography component={"div"}>
      <Typography variant="h5" ml={3} fontWeight={"bold"}>
        -: You might also like this :-
      </Typography>
      <ProductList data={productsData} />
    </Typography>
  );
}

export default RelatedProducts;
