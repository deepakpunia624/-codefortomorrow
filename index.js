const express = require("express");
require("./connection/dbConnection");
const userRouter = require("./router/userRoute");
const categoryRouter = require("./router/categoryRouter");
const serviceRouter = require("./router/serviceRouter");

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/service", serviceRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
