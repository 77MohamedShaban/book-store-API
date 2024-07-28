const express = require("express");
const connectToDB = require("./config/db");
const logger = require("./middlewares/logger");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errors");
require("dotenv").config();

//Connection To Database
connectToDB();

// Init App
const app = express();

// Aplly Middlewares

//Static folder ( GET images )
app.use(express.static(path.join(__dirname, "images")));

//take the file(JSON) from user  and convert it into file(JS)
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(logger);

// Add headers to response & more secure for the app
app.use(helmet());

// cors policy
app.use(cors());

app.set("view engine", "ejs");

app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/password", require("./routes/password"));
app.use("/api/upload", require("./routes/upload"));

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

//Runing The Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
  );
});
