import { Grid, Typography } from "@mui/material";
import {
  Button,
  Card,
  FormHelperText,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
// import { Dashboard } from "@material-ui/icons";
import { useNavigate } from "react-router";
import { AddnewProduct } from "../../types";
import { ADD_PRODUCT } from "../../Configs/AppConfig";
import axios from "axios";
import instance from "../../Services/AxiosInterCeptors";

interface Category {
  id: number;
  name: string;
}
const AddProduct = () => {
  const navigate = useNavigate();
  const BillingInforef = useRef<HTMLFormElement>(null);
  const [id, setID] = useState("");
  const [productName, setProductName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [category, setCategory] = useState<Category[]>([]);
  // const [categories, setCategories] = useState<Category[]>([]);
  const [subcategory, setSubcategory] = useState("");
  const [status, setstatus] = useState("inactive");
  const [price, setPrice] = useState(Number);
  const [quantity, setQuantity] = useState(Number);
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState(false);
  // const [imageFile, setImageFile] = useState<File | null>(null);
  // const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategory(JSON.parse(storedCategories));
    }
  }, []);
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };

  // useEffect(() => {
  //   localStorage.setItem("categories", JSON.stringify(category));
  // }, [category]);
  // useEffect(() => {
  //   setCategory(localStorage.getItem("categories"));
  // }, []);

  // const handleImageFileChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setImageFile(event.target.files[0]);
  //     setImgUrl(URL.createObjectURL(event.target.files[0]));
  //   }
  // };

  const onSubmitBtnClickHnd = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !productName ||
      !description ||
      !selectedCategory ||
      !imgUrl ||
      !price ||
      !status
    ) {
      setFormError(true);
      return;
    }
    if (!price || isNaN(Number(price))) {
      setFormError(true);
      return;
    }

    const product: AddnewProduct = {
      id: id,
      productName: productName,
      description: description,
      shortDesc: shortDesc,
      category: selectedCategory,
      subcategory: subcategory,
      price: price,
      quantity: quantity,
      imgUrl: imgUrl,
      status: status,
    };
    setFormError(false);
    const token: string = localStorage.getItem("token") as string;
    const response = await instance.post(ADD_PRODUCT, product,{
      // method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      // body: JSON.stringify(product),
    });

    const data = await response.data;
    console.log(data);
    console.log(product);
    navigate("/dashboard/allproducts");
  };

  // const handleAddCategory = () => {
  //   if (newCategory.trim() !== "") {
  //     setCategory([...category, newCategory]);
  //     setNewCategory("");
  //   }
  // };
  // const handleCategoryChange = (e: any) => {
  //   setNewCategory(e.target.value);
  // };

  return (
    <Grid container spacing={1} mb={5} mt={5}>
      <Grid item xs={12} md={12} sm={12} m={5} justifyContent={"center"}>
        <Card style={{ padding: "8px" }}>
          <form onSubmit={onSubmitBtnClickHnd} ref={BillingInforef}>
            <Typography variant="h5">Add New Product</Typography>
            <Grid container spacing={1} mb={5} mt={2} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  margin="dense"
                  label="Product ID"
                  name="id"
                  value={id}
                  onChange={(e) => setID(e.target.value)}
                  // style={{ color: theme.palette.text.primary }}
                />
                {formError && !id && (
                  <FormHelperText error>Please enter Product ID</FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  margin="dense"
                  label="category"
                  name="category"
                  type="text"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  style={{ display: "flex", alignItems: "center" }}
                  select
                >
                  {category.map((category, index) => (
                    <MenuItem key={index} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
                {formError && !category && (
                  <FormHelperText error>
                    Please select Product category
                  </FormHelperText>
                )}
                {/* <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  margin="dense"
                  label="New Category"
                  name="newCategory"
                  type="text"
                  value={newCategory}
                  onChange={handleCategoryChange}
                />

                <button onClick={handleAddCategory}>Add Category</button>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  margin="dense"
                  label="Category"
                  name="category"
                  type="text"
                  select
                  value={newCategory || ""}
                  onChange={handleCategoryChange}
                >
                  {category.map((category: any) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField> */}
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  multiline
                  margin="dense"
                  label="Sub-category"
                  name="subcategory"
                  type="text"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  select
                >
                  <MenuItem value="bestselling">bestselling</MenuItem>
                  <MenuItem value="trending">Trending</MenuItem>
                  <MenuItem value="newarrivels">New Arrivals</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={9}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  multiline
                  margin="dense"
                  label="product  Name"
                  name="productname"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                {formError && !productName && (
                  <FormHelperText error>
                    Please enter productName
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  multiline
                  margin="dense"
                  label="Quantity"
                  name="quantity"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                {formError && (!quantity || isNaN(Number(quantity))) && (
                  <FormHelperText error>
                    Please enter Product Quantity
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  multiline
                  margin="dense"
                  label="price"
                  name="price"
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                {formError && (!price || isNaN(Number(price))) && (
                  <FormHelperText error>
                    Please enter price (ex. 250)
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  multiline
                  margin="dense"
                  label="Status"
                  name="status"
                  type="text"
                  value={status}
                  onChange={(e) => setstatus(e.target.value)}
                  select
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
                {formError && !status && (
                  <FormHelperText error>Please enter status</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  multiline
                  margin="dense"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 6 } }}
                  label="imgUrl"
                  name="imgUrl"
                  onChange={(e) => setImgUrl(e.target.value)}
                />
                {formError && !imgUrl && (
                  <FormHelperText error>
                    Please enter Product Image Url
                  </FormHelperText>
                )}
              </Grid>
              {/* <Grid
                item
                xs={12}
                sm={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  flexDirection: "row",
                }}
              >
                <input
                  accept="image/*"
                  type="file"
                  id="imgUrl"
                  style={{ display: "none" }}
                  onChange={handleImageFileChange}
                />
                <label htmlFor="imgUrl">
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                </label>
                {formError && !imgUrl && (
                  <FormHelperText error>
                    Please select an image file
                  </FormHelperText>
                )}
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt="Preview"
                    style={{ maxWidth: "10%", marginTop: 10 }}
                  />
                )}
              </Grid> */}
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  multiline
                  margin="dense"
                  label="shortDesc"
                  name="shortDesc"
                  onChange={(e) => setShortDesc(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  multiline
                  minRows={5}
                  margin="dense"
                  label="description"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                {formError && !description && (
                  <FormHelperText error>
                    Please enter Product description
                  </FormHelperText>
                )}
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};
export default AddProduct;
