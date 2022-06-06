const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./utils/db");
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", require("./router/userRouter"));
// app.use("/api/like", require("./router/LikeRouter"));
app.use("/api/create", require("./router/ContentRouter"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Manel's E-Commerce App" });
});

app.listen(port, () => {
  console.log("connecting to server ...!");
});
