const express = require("express");
const bodyParser = require("body-parser");
const authCheck = require("./middleware/authCheckMiddleware");
const routes = require("./routes/routes");
const cors = require('cors');
const app = express();

require("dotenv").config();

app.use(bodyParser.json());

//cors
//cors option
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

const port = 8000;

// routes
app.use("/", authCheck, routes);

app.listen(port, () => {
  console.log(`Code-Executor server is running on Port ${port}`);
});
