const express = require("express");
const connectToMongo = require("./config/db");
const cors = require("cors");
const stripe = require("./routes/stripe");
const products = require("./data/products");
const User = require("./modals/User");
const Order = require("./modals/Order"); 
const ProductList = require("./modals/Product");
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv")  
dotenv.config()
const connect_port = process.env.PORT
connectToMongo();
const app = express();
const port = connect_port;

app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.raw({ type: 'multipart/form-data' }));
app.use(fileUpload());
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});
app.get("/products", (req, res) => {
  res.json(products);
});
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  res.json(product);
});


app.get("/totals", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const productListCount = await ProductList.countDocuments();
    const orderCount = await Order.countDocuments();
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);

    if (totalSales.length === 0) {
      return res.status(404).json({ error: "No orders found." });
    }

    const totalCounts = {
      totalUser: userCount,
      totalProduct: productListCount,
      totalOrder: orderCount,
      totalSales: totalSales[0].totalAmount,
    };

    res.json(totalCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.use("/user", require("./routes/authRoute"));
app.use("/admin", require("./routes/admin"));
app.use("/product", require("./routes/product"));
app.use("/category", require("./routes/category"));
app.use("/order", require("./routes/order"));

app.listen(port, () => {
  console.log(`listining on http://localhost:${port}`);
});
