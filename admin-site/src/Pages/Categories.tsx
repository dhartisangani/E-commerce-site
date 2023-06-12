import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Category {
  id: number;
  name: string;
}

interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       "http://localhost:4000/category/getcategory"
  //     );
  //     const data = await response.json();
  //     setCategories(data);
  //   };

  //   fetchData();
  // }, []);
  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      const newCategoryId = categories.length + 1;
      const newCategoryItem: Category = {
        id: newCategoryId,
        name: newCategory,
      };
      setCategories([...categories, newCategoryItem]);
      setNewCategory("");
    }
  };

  // const handleAddCategory = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const category: any = {
  //     category: newCategory,
  //   };
  //   const token: string = localStorage.getItem("token") as string;
  //   const response = await fetch("http://localhost:4000/category/addcategory", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": token,
  //     },
  //     body: JSON.stringify(category),
  //   });

  //   const json = await response.json();
  //   console.log(json);
  //   console.log(category);
  //   // navigate("/dashboard/allproducts");
  // };

  const handleDeleteCategory = (categoryId: number) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategories(updatedCategories);
  };

  const handleEditCategory = (categoryId: number, newName: string) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return { ...category, name: newName };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" mt={5} mb={5}>
          Product categories :-
        </Typography>
        <Typography
          component={"div"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={5}
        >
          <Grid item xs={12} sm={9}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              margin="dense"
              label="New Category"
              name="newCategory"
              type="text"
              required
              value={newCategory}
              onChange={handleCategoryChange}
            />
          </Grid>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleAddCategory}
          >
            Add Category
          </Button>
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Category
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Edit
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={index}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      margin="none"
                      defaultValue={category.name}
                      onBlur={(e) =>
                        handleEditCategory(category.id, e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                      onClick={() => handleDeleteCategory(category.id)}
                    />
                    {/* <Button variant="contained" color="error">
                      Delete
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default Categories;
