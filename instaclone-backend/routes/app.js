const express = require('express');
const app = express();
const User = require('../model/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const multer = require('multer')

app.use(bodyParser());


router.post('/login', async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // console.log(user);

        if (!user) {
            return res.json({
                status: 'failed',
                message: 'User not registered'
            });
        }

        const match = await bcrypt.compare(password, user.password)
        // console.log("match",match)
        if (!match) {
            return res.json({
                status: 'failed',
                message: 'invalid credentials'
            });
        }
        // console.log('userid',user._id);
        const str = String(user._id);
        // console.log("str", str);
        // const token= jwt.sign({
        //     exp: Math.floor(Date.now() / 1000) + (60 * 60),
        //     data: str
        // }, "Insta-secret-123");
        // console.log('data',data);
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: str
        }, 'Insta-Secret-123');

        res.json({
            status: 'success',
            data: {
                id: str,
                token
            }
        });
    } catch (e) {
        res.json({
            status: 'failed',
            message: e.message
        });

    }
});

router.post('/signup', async function (req, res) {
    try {
        const { name, email, password } = req.body;
        // console.log('password',name)
        const hash = await bcrypt.hash(password, 10);
        // console.log(hash);
        await User.create({ name, email, password: hash });
        res.json({
            status: 'success',
            message: 'sign up success'
        });
    } catch (e) {
        res.json({
            status: 'failed',
            message: e.message
        });
    }
});

module.exports = router;