const express = require("express");
const http = require("http");
const path = require("path");
const multer = require("multer");

const app = express();


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "files"));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage }).single("file");

app.use("/", express.static(path.join(__dirname, "public")));


app.use("/files", express.static(path.join(__dirname, "files")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});



app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: "Errore durante l'upload" });
        }
        console.log("File caricato:", req.file.filename);
        res.json({ url: "/files/" + req.file.filename });
    });
});


const server = http.createServer(app);
server.listen(80, () => {
    console.log("- Server in esecuzione su http://localhost:80");
});
