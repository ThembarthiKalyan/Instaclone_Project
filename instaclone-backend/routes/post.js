const express=require("express");
const cors=require('cors');
const Post = require("../model/post");
const router = express.Router();
const bodyParser = require('body-parser');
const { watch } = require("../model/post");
const multer  = require('multer');
router.use(cors());
//const upload = multer({ dest: '../uploads'})
router.use(bodyParser());

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'public/uploads')
    },
    filename: function (req, file, callback) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //callback(null, file.originalname)
      console.log('file', file);
      callback(null, file.fieldname + "-" + Date.now() + ".jpg");
    }
  })
  
const upload = multer({ storage: storage })

router.get("/", async function(req, res) {
    try {
        const posts=await Post.find();
        return res.json({
            status: "success",
            data: {
                posts
            }
        })
    } catch(e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

// router.post("/", async function(req, res) {
//     const {title, body, image} = req.body;
//     const post = await Post.create({
//         title, body, image, user: req.user
//     });

//     res.json({
//         status: "success",
//         data: {
//             post
//         }
//     })
// })

router.post("/addpost", upload.single("image") ,async function(req, res) {
    try{
        console.log("entered post method");
        const {title,location, body} = req.body;
        const date = new Date().toGMTString().slice(5,16);
        console.log('body',req.body);
        // const image = req.file.filename;
        // const imagePath = req.file.path
        const imagePath = req.file.filename;
        // const {image} = req.file
        console.log(imagePath);
        const post = await Post.create({
            title, location, body, image:imagePath, date:date, user: req.user
        });

        res.json({
            status: "success",
            data: {
                post
            }
        })
    } catch(e){
        console.log('err',e);
    }
});

//     res.json({
//         status: "success",
//         data: {
//             image
//         }
//     })
// });

// router.put("/:id", async function(req, res) {
//     const {title} = req.body;
//     const post = await Post.findOne({_id: req.params.id});

//     if(!post) {
//         return res.status(404).json({
//             status: "failed",
//             message: "Post not found"
//         })
//     }

//     if(String(post.user) !== req.user) {
//         return res.status(403).json({
//             status: "failed",
//             message: "Forbidden"
//         })
//     }

//     await Post.updateOne({_id: req.params.id}, {
//         title
//     });
//     res.json({
//         status: "success"
//     })
// })

router.put("/:id", upload.single("image"), async function(req, res) {
    try{
        const post = await Post.findOne({_id: req.params.id});
        // if(req.body.title!==''){
        //     const title=req.body.title
        // }
        // if(req.body.body!==''){
        //     const body=req.body.body
        // }
        const {title, location, body} = req.body;
        const imagePath = req.file? req.file.filename : null;

        if(!post) {
            return res.status(404).json({
                status: "failed",
                message: "Post not found"
            })
        }

        if(String(post.user) !== req.user) {
            return res.status(403).json({
                status: "failed",
                message: "Forbidden"
            })
        }
        console.log('title backend',title);
        // console.log('body backend',body);
        // console.log('image backend',imagePath);
        if(imagePath !== null){
            await Post.updateOne({_id: req.params.id}, {
                title:title, location:location, body:body, image:imagePath
            });
            res.json({
                status: "success",
                message: "pic also uploaded"
            })

        }else{
            await Post.updateOne({_id: req.params.id}, {
                title:title, location:location, body:body,
            });
            res.json({
                status: "success",
                message: "pic not given from user"
            })
        }
    } catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }

})

router.put("/likes/:id", async function(req,res){
    try{
        const post = await Post.findOne({_id: req.params.id});
        const {likes}=req.body;

        if(!post) {
            return res.status(404).json({
                status: "failed",
                message: "Post not found"
            })
        }
        console.log('likes backend',likes)

        await Post.updateOne({_id: req.params.id}, {
            likes:likes
        });

        res.json({
            status: "success",
            message: {
                likes
            }
        });


    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        }); 
    }
})

router.delete("/:id", async function(req, res) {
    try{
        console.log("del entered");
        // const {title} = req.body;
        const post= await Post.findOne({_id: req.params.id});
        // console.log("del post",post);

        if(!post) {
            return res.status(404).json({
                status: "failed",
                message: "Post not found"
            })
        }

        if(String(post.user) !== req.user) {
            return res.status(403).json({
                status: "failed",
                message: "Forbidden"
            })
        }

        // await Post.deleteOne({_id:req.params.id},function(err,res){
        //     if(!err){
        //         res.json({
        //             status: "success",
        //             message:"post deleted"
        //         })
        //     }else{
        //         console.log(err);
        //     }
        await Post.deleteOne({_id:req.params.id});
        res.json({
            status: "success",
            message:"successfully deleted"
        });
    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        });       
    }
});

module.exports=router;