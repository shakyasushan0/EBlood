const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = express();
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

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/user", userRouter);
app.use("/request", requestRouter);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
