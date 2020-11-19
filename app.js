const express = require("express");
const app = express();
const port = 3000;
const router = require("./routers/index");
const session = require("express-session");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "its secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
