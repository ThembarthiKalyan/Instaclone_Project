const bodyParser = require('body-parser');
const express=require('express');
const mongoose = require('mongoose');
const multer  = require('multer');
const cors = require('cors');
const app=express();
app.use(cors());
app.use(bodyParser());
const indexRoutes=require('./routes/app');
const postRoutes=require("./routes/post");
const jwt=require("jsonwebtoken");
const e = require('express');
app.use(bodyParser());
mongoose.connect('mongodb://localhost/instaclone');
//app.use(express.static(path.join(__dirname, "public")));
// this is compulsory for pic uploading
app.use('/public',express.static('public'));

// app.use(cors());

// middleware for checking authorised user can edit delete
app.use("/posts",function(req, res, next) {
    try {
        const token=req.headers.authorization?.split(" ")[1];
        // console.log('token', token);
        if (!token) {
            return res.status(401).json({
                status: "failed",
                message: "Not Authenticated"
            });
        }

        const decoded = jwt.verify(token, "Insta-Secret-123");
        // console.log("decoded", decoded.data);
        if (!decoded) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid token"
            });
        }

        req.user = decoded.data;


    } catch(e) {
        return res.status(500).json({
            status: "failed",
            message: e.message
        });
    }

    next();
})

app.use('/',indexRoutes);
app.use('/posts', postRoutes);

app.listen('3070', console.log("server running port 3070"));

