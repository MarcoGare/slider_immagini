const express = require("express");
const http = require("http");
const path = require("path");
const app =express();
const multer = require("multer");
const database = require("./database");
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "files"));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

database.createTable();
const upload = multer({ storage: storage}).single('file');
app.use("/", express.static(path.join(__dirname, "public")));
app.