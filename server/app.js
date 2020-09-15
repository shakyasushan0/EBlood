const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express();
var path = require("path");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/userRouter");
const requestRouter = require("./routes/requestRouter");
require("dotenv").config();

//database Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Sucessfully connected to mongodb"))
  .catch((err) => console.log(err));

//views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/request", requestRouter);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
