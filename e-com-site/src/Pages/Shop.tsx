import { useCallback, useEffect, useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputBase,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Helmet from "../Components/Helmet/Helmet";
import theme from "../UI/theme";
import { Button } from "@material-ui/core";
import { Product } from "../type";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ProductCardSkeleton from "../UI/ProductCardLoder";
import {
  FETCH_PRODUCTlIST,
  GET_SEARCH_PRODUCTLIST,
} from "../Configs/AppConfig";
import instance from "../Services/AxiosInterCeptors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchInput: {
      marginRight: "10px",
      display: "flex",
      alignItems: "center",
      // background: theme.palette.background.default,
      // color: theme.palette.text.primary,
    },
    search: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      borderRadius: "0px",
      backgroundColor: theme.palette.primary.main,
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
  })
);
export {};

function Shop() {
  const classes = useStyles();
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProduct = async () => {
    try {
      const response = await instance.get(FETCH_PRODUCTlIST);
      const data = response.data;
      setIsLoading(false);
      setProductsData(
        data.filter((product: Product) => product.status === "active")
      );
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  // const getProduct = async () => {
  //   try {
  //     const response = await instance.get("/product/getproductList");
  //     // const data = response.filter((product:Product) => product.status === 'active');
  //     const data = await response.data;
  //     setIsLoading(false);
  //     setProductsData(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    getProduct();
  }, []);

  const handleFilterChange = async (event: SelectChangeEvent<any>) => {
    const response = await instance.get(FETCH_PRODUCTlIST);
    const data = response.data;
    const filterValue = event.target.value;
    if (filterValue === "all") {
      setProductsData(data);
    }
    if (filterValue === "chair") {
      setProductsData(
        data.filter(
          (product: Product) =>
            product.category === "chair" && product.status === "active"
        )
      );
    }
    if (filterValue === "sofa") {
      setProductsData(
        data.filter(
          (product: Product) =>
            product.category === "sofa" && product.status === "active"
        )
      );
    }
    if (filterValue === "mobile") {
      setProductsData(
        data.filter(
          (product: Product) =>
            product.category === "mobile" && product.status === "active"
        )
      );
    }
    if (filterValue === "wireless") {
      setProductsData(
        data.filter(
          (product: Product) =>
            product.category === "wireless" && product.status === "active"
        )
      );
    }
    if (filterValue === "watch") {
      setProductsData(
        data.filter(
          (product: Product) =>
            product.category === "watch" && product.status === "active"
        )
      );
    }
  };

  const handleSortValue = async (event: SelectChangeEvent<any>) => {
    const sortValue = event.target.value;
    if (sortValue === "default") {
      setProductsData(productsData);
    } else if (sortValue === "price-low-to-high") {
      const sortedProducts = [...productsData].sort(
        (a, b) => a.price - b.price
      );
      setProductsData(sortedProducts);
    } else if (sortValue === "price-high-to-low") {
      const sortedProducts = [...productsData].sort(
        (a, b) => b.price - a.price
      );
      setProductsData(sortedProducts);
    } else if (sortValue === "name-a-to-z") {
      const sortedProducts = [...productsData].sort((a, b) =>
        a.productName.localeCompare(b.productName)
      );
      setProductsData(sortedProducts);
    } else if (sortValue === "name-z-to-a") {
      const sortedProducts = [...productsData].sort((a, b) =>
        b.productName.localeCompare(a.productName)
      );
      setProductsData(sortedProducts);
    }
  };

  // const handleSerch = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const response = await fetch("http://localhost:4000/product/getproductList");
  //   const data = await response.json();
  //   const searchItem = event.target.value;
  //   const serchedProducts = data.filter(
  //     (product: any) =>
  //       product.productName.toLowerCase().includes(searchItem.toLowerCase()) ||
  //       product.category.toLowerCase().includes(searchItem.toLowerCase())
  //   );
  //   setProductsData(serchedProducts);
  // };
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = async (searchValue: string) => {
    try {
      let response;
      if (searchValue) {
        response = await instance.get(`${GET_SEARCH_PRODUCTLIST}${searchValue}`);
        const data = response.data;
        setProductsData(data.products);
        setIsLoading(false);
      } else {
        getProduct();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    debouncedHandleSearch(searchValue);
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 1000), []);

  // if (isLoading) {
  //   return (
  //     <Typography variant="h4" gutterBottom align="center">
  //       <ProductCardSkeleton isLoading={isLoading} />
  //     </Typography>
  //   );
  // }

  return (
    <Helmet
      title={"Shop"}
      style={{
        flexGrow: 1,
        marginBottom: "5%",
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Grid container spacing={2} mt={5} mb={5}>
        {/* <Grid item xs={12} sm={4}></Grid> */}
        <Grid item xs={12} md={3} sm={3} className={classes.search}>
          <FormControl
            variant="outlined"
            size="small"
            // className={classes.formControl}
            style={{
              marginRight: "10px",
              width: "30%",
              minWidth: 100,
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
            }}
          >
            <InputLabel
              id="sort-label"
              style={{ color: theme.palette.text.primary }}
            >
              Filter By
            </InputLabel>
            <Select
              onChange={handleFilterChange}
              style={{ color: theme.palette.text.primary }}
              labelId="filter-label"
              label="Filter By"
              defaultValue=""
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="sofa">Sofa</MenuItem>
              <MenuItem value="mobile">Mobile</MenuItem>
              <MenuItem value="chair">Chair</MenuItem>
              <MenuItem value="watch">Watch</MenuItem>
              <MenuItem value="wireless">Wireless</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} sm={5} className={classes.search}>
          <Grid item xs={8} md={12} sm={4} className={classes.searchbar}>
            <InputBase
              fullWidth
              placeholder="Search hear.."
              inputProps={{ "aria-label": "search google maps" }}
              className={classes.searchInput}
              style={{
                background: theme.palette.background.default,
                color: theme.palette.text.primary,
              }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2} md={1} sm={1}>
            <Button className={classes.button}>
              <SearchOutlinedIcon />
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} md={3} sm={3} className={classes.search}>
          <FormControl
            variant="outlined"
            size="small"
            // className={classes.formControl}
            style={{
              marginRight: "10px",
              width: "30%",
              minWidth: 100,
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
            }}
          >
            <InputLabel id="filter-label">Sort by</InputLabel>

            <Select
              style={{ color: theme.palette.text.primary }}
              labelId="sort-label"
              label="Sort By"
              size="small"
              defaultValue=""
              onChange={handleSortValue}
            >
              <MenuItem value="default">Default sorting</MenuItem>
              <MenuItem value="price-low-to-high">Price: Low to High</MenuItem>
              <MenuItem value="price-high-to-low">Price: High to Low</MenuItem>
              <MenuItem value="name-a-to-z">Name: A to Z</MenuItem>
              <MenuItem value="name-z-to-a">Name: Z to A</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid>
        <section>
          {/* <ProductList data={productsData} /> */}
          <ProductCardSkeleton isLoading={isLoading} data={productsData} />
        </section>
      </Grid>
    </Helmet>
  );
}
export default Shop;
