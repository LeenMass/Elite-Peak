const express = require("express");
const server = express();
const router = require("./router");

const cookieParser = require("cookie-parser");
server.use(cookieParser());
server.use(express.static("assest"));
server.use(express.urlencoded({ extended: false }));
server.use(router);


server.listen(4000, () =>
    console.log("Server listening on http://localhost:4000")
);



