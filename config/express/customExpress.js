const express = require("express");
const cors = require('cors');
const router = require("../../routes/router");

const corsOptions = {
    exposedHeaders: ["x-access-token"],
};

module.exports = () => {
    const app = express();

    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: false}));
    app.use(express.json());

    app.use((req, res, next) => {
      req.headers["x-access-token"];
      next();
    });

    app.use("/", router);

    return app;
}