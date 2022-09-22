const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const coinRoute = require("./routes/coin.route");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(helmet());
app.use(cors());

app.use("/coins", coinRoute);
app.get("/", (req, res) => {
  res.json({
    message: "ok",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not found",
  });
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    error: err,
  });
});

module.exports = app;
