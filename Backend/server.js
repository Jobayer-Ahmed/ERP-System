const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const logger = require("morgan");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const prodRoutes = require("./routes/product");
// const productRoutes = require("./routes/productRoutes");
const keys = require("./config/keys");
const passportSetup = require("./config/passport");

//CONNECT TO MONGODB
mongoose.Promise = global.Promise;
mongoose
  .connect(keys.mongodb.dbURI)
  .then(db => console.log("DB CONNECTED"))
  .catch(error => console.log(error));
app.use(logger("dev"));

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
// COOKIE SESSION
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

//INITIALIZE PASSPORT
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/", prodRoutes);

// Express only serves static assets in production
// if (process.env.NODE_ENV === "production") {
app.use(express.static("client/build"));
// }
app.get("*", (req, res) =>
  res.sendFile(path.resolve("client/build", "index.html"))
);

app.listen(process.env.PORT || 4000, () => {
  console.log("SERVER RUNNING");
});
