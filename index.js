const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// parse url-encoded bodies as sent by forms
app.use(express.urlencoded({ extended: false }));
// prase json bodies
app.use(express.json());

app.set("view engine", "hbs");

// Define routes
app.use("/", require("./routes/pages"));

app.use("/user", require("./routes/userRoutes"));
app.use("/posts", require("./routes/postRoutes"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
