import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import AdminNav from "./Components/Header/AdminNav";
import AllProducts from "./Components/Products/AllProducts";
import AddProduct from "./Components/Products/AddProduct";
import EditProduct from "./Components/Products/EditProduct";
import DashBoard from "./Components/DashBoard";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Helmet from "./Components/Helmet/Helmet";
import Users from "./Pages/Users";
import Categories from "./Pages/Categories";
import Order from "./Pages/Order";
import Protected from "./Components/Route/ProtectedRoute";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);

  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      {/* {isLoggedIn ? ( */}
      <Helmet title={"admin-panel"}>
        <Protected>
          <AdminNav />
        </Protected>
        <Container maxWidth="xl">
          <Routes>
            <Route
              path="/"
              element={
                <Protected>
                  <DashBoard />
                </Protected>
              }
            />
            <Route
              path="/dashboard/users"
              element={
                <Protected>
                  <Users />
                </Protected>
              }
            />
            <Route
              path="/dashboard/allproducts"
              element={
                <Protected>
                  <AllProducts />
                </Protected>
              }
            />
            <Route
              path="/dashboard/addproduct"
              element={
                <Protected>
                  <AddProduct />
                </Protected>
              }
            />
            <Route
              path="/dashboard/categories"
              element={
                <Protected>
                  <Categories />{" "}
                </Protected>
              }
            />
            <Route
              path="/dashboard/order"
              element={
                <Protected>
                  <Order />
                </Protected>
              }
            />
            <Route
              path="/dashboard/editproduct/:_id"
              element={
                <Protected>
                  <EditProduct />
                </Protected>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Helmet>
    </>
  );
};

export default App;
