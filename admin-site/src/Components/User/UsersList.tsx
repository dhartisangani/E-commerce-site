import {
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import instance from "../../Services/AxiosInterCeptors";
interface User {
  _id: string;
  name: string;
  email: string;
}
const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    instance.get("http://localhost:4000/user/users")
      .then((response) => response.data)
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

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
        <Typography variant="h5">User List:--</Typography>
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} sm={12} m={5} justifyContent={"center"}>
          <Card>
            <TableContainer>
              {users.length === 0 ? (
                <Typography component={"div"} align="center" m={5}>
                  UserList is empty
                </Typography>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "18px" }}
                      >
                        User Name
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "18px" }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "bold", fontSize: "18px" }}
                      >
                        Delete
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {users?.map((item: any, index: any) => (
                      <Tr item={item} key={index} />
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

export interface AllProduct {
  item: {
    _id: any;
    username: string;
    email: string;
  };
}

const Tr: React.FC<AllProduct> = ({ item }) => {
  // const [products, setProducts] = useState<AllProduct[]>([]);
  // const imageUrl = Array.isArray(item.image) ? item.image[0] : item.image;
  const _id = item._id;
  const removeItem = async () => {
    if (!_id) {
      alert("Please provide a valid product ID.");
      return;
    }

    try {
      const token: string = localStorage.getItem("token") as string;
      const response = await instance.delete(
        `http://localhost:4000/user/users/${_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await response.data;
      console.log(data);

      // setProducts((prevProducts) =>
      //   prevProducts.filter((products) => products.item._id !== _id)
      // );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <TableRow>
      <TableCell>{item.username}</TableCell>
      <TableCell>{item.email}</TableCell>
      <TableCell onClick={removeItem}>
        <DeleteIcon />
      </TableCell>
    </TableRow>
  );
};

export default UsersList;
