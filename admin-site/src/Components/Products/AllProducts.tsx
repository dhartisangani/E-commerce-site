import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CardMedia, Grid, Switch, Typography, InputBase } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useCallback, useEffect, useState } from "react";
import { Allproducts } from "../../types";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  ALL_PRODUCTS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../../Configs/AppConfig";
import instance from "../../Services/AxiosInterCeptors";

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
      borderRadius: "0px",
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
    search: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    searchbar: {
      border: "2px solid",
      borderColor: theme.palette.primary.main,
      color: theme.palette.text.primary,
    },
    searchInput: {
      marginRight: "10px",
      display: "flex",
      alignItems: "center",
      padding: "2px",
      // background: theme.palette.background.default,
      // color: theme.palette.text.primary,
    },
  })
);
const AllProducts = () => {
  const [products, setProducts] = useState<Allproducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProduct, setTotalProduct] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>("");
  const classes = useStyles();

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const handleSearch = async (
    searchValue: string,
    page: number,
    limit: number
  ) => {
    try {
      let response;
      if (searchValue) {
        response = await instance.get(
          `${ALL_PRODUCTS}?search=${searchValue}&page=${page}&limit=${limit}`
        );
      } else {
        response = await fetchProducts(searchValue, 1, limit);
      }

      if (response) {
        const data = await response.data;
        setProducts(data.products);
        setCurrentPage(data.current_page);
        setTotalPages(data.total_pages);
        setTotalProduct(data.total_products);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    debouncedHandleSearch(searchValue, 1, rowsPerPage);
    setSearchValue(searchValue);
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 1000), []);

  const fetchProducts = async (
    searchValue: String,
    page: number,
    limit: number
  ) => {
    try {
      const response = await instance.get(
        `${ALL_PRODUCTS}?search=${searchValue}&page=${page}&limit=${limit}`
      );
      const data = await response.data;
      setProducts(data.products);
      setCurrentPage(data.current_page);
      setTotalPages(data.total_pages);
      setTotalProduct(data.total_products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(searchValue, 1, rowsPerPage);
  }, []);

  const handlePageChange = (page: number) => {
    if (searchValue) {
      handleSearch(searchValue, page, rowsPerPage);
    } else {
      fetchProducts(searchValue, page, rowsPerPage);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);

    if (searchValue) {
      handleSearch(searchValue, 1, newRowsPerPage);
    } else {
      fetchProducts(searchValue, 1, newRowsPerPage);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const token: string = localStorage.getItem("token") as string;
      await instance.delete(`${DELETE_PRODUCT}${productId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  
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
        <Typography variant="h5">All Products :-</Typography>
        <Grid item xs={12} md={6} sm={5} className={classes.search}>
          <Grid item xs={8} md={12} sm={4} className={classes.searchbar}>
            <InputBase
              fullWidth
              placeholder="Search hear.."
              inputProps={{ "aria-label": "search google maps" }}
              autoComplete="off"
              className={classes.searchInput}
              style={{
                background: "primary",
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

        <Link to={"/dashboard/addproduct"} className={classes.button}>
          Add New Product
        </Link>
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} sm={12} m={5} justifyContent={"center"}>
          <Card>
            <TableContainer>
              {products?.length === 0 ? (
                <Typography variant={"h5"} align="center" m={5}>
                  No Product added yet
                </Typography>
              ) : (
                <Table>
                  <TableHead style={{ position: "sticky" }}>
                    <TableRow>
                      <TableCell className={classes.thead}>Sr No.</TableCell>
                      <TableCell className={classes.thead}>Image</TableCell>
                      {/* <TableCell className={classes.thead}>
                        Product SKU
                      </TableCell> */}
                      <TableCell className={classes.thead}>Title</TableCell>
                      <TableCell className={classes.thead}>Category</TableCell>
                      <TableCell className={classes.thead}>Price</TableCell>
                      <TableCell className={classes.thead}>Quantity</TableCell>
                      <TableCell className={classes.thead}>Status</TableCell>
                      <TableCell className={classes.thead}>Edit</TableCell>
                      <TableCell className={classes.thead}>Delete</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {products?.map((item: any, index: any) => (
                      <Tr
                        item={item}
                        key={index}
                        srNo={index + 1}
                        onDelete={() => handleDeleteProduct(item._id)}
                      />
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={9}>
                        <TablePagination
                          style={{ display: "flex", justifyContent: "center" }}
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={totalProduct}
                          rowsPerPage={rowsPerPage}
                          page={currentPage - 1}
                          onPageChange={(_, page) => handlePageChange(page + 1)}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              )}
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};
export interface AllProduct {
  item: {
    id: any;
    _id: any;
    imgUrl: any;
    productName: string;
    category: string;
    quantity: number;
    status: string;
    price: number;
  };
  srNo: number;
  onDelete: () => void;
}

const Tr: React.FC<AllProduct> = ({ item, srNo, onDelete }) => {
  const [status, setStatus] = useState(item.status === "active");
  const [price, setPrice] = useState(item.price || 0);
  const [updatedPrice, setUpdatedPrice] = useState(item.price);
  const navigate = useNavigate();
  const _id = item._id;
  useEffect(() => {
    setStatus(item.status === "active");
    setPrice(item.price || 0);
    setUpdatedPrice(item.price);
  }, [item]);

  const handleChangeStatus = async () => {
    setStatus(!status);

    try {
      const token = localStorage.getItem("token");
      const response = await instance.put(
        `${UPDATE_PRODUCT}${_id}`,
        { status: !status ? "active" : "inactive" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          // body: JSON.stringify({ status: !status ? "active" : "inactive" }),
        }
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const updatePrice = async () => {
    try {
      const token = localStorage.getItem("token") as string;
      const response = await instance.put(
        `${UPDATE_PRODUCT}${item._id}`,
        { price: updatedPrice },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          // body: JSON.stringify({ price: updatedPrice }),
        }
      );
      const data = await response.data;
      console.log(data);
      setPrice(updatedPrice);
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setUpdatedPrice(value);
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>{srNo}</TableCell>
        <TableCell>
          {/* {imageUrl && ( */}
          <CardMedia
            image={item.imgUrl}
            sx={{
              backgroundSize: "contain",
              objectFit: "contain",
              height: "50px",
              width: "50px",
            }}
          />
          {/* )} */}
        </TableCell>
        {/* <TableCell>{item.id}</TableCell> */}
        <TableCell>{item.productName}</TableCell>
        <TableCell> {item.category}</TableCell>
        <TableCell>
          <Typography
            component={"div"}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{`$${price?.toFixed(2)}`}</span>
            <span>
              <input
                style={{ width: "25%" }}
                type="number"
                autoComplete="false"
                name="updateprice"
                value={updatedPrice}
                onChange={handlePriceChange}
              />
              <button onClick={updatePrice}>Save</button>
            </span>
          </Typography>
        </TableCell>
        <TableCell> {item.quantity}</TableCell>
        <TableCell>
          <Switch
            name="searchbar"
            checked={status}
            onChange={handleChangeStatus}
          />
        </TableCell>
        <TableCell
          onClick={() => {
            navigate(`/dashboard/editproduct/${_id}`);
          }}
        >
          <BorderColorIcon />
        </TableCell>
        <TableCell onClick={onDelete}>
          <DeleteIcon />
        </TableCell>
      </TableRow>
    </>
  );
};
export default AllProducts;

