const express = require("express");
const pool = require("./connection/dbConnection");
const userRouter = require("./router/userRoute");
const categoryRouter = require("./router/categoryRouter");
const serviceRouter = require("./router/serviceRouter");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/service", serviceRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
