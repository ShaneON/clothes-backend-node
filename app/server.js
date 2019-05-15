const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      path          = require("path");

const fileRoutes    = require("./routes/file-upload");

app.use(bodyParser.json());
app.use(fileRoutes);

const PORT = process.env.PORT || '3001';

app.listen(PORT, function(){
    console.log("Node server started on port " + PORT);
});
