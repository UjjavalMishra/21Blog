const {Router} = require('express');
const multer = require('multer');
const path = require('path');
const {Blog} = require('../models/blog');
const Comment = require('../models/comment');
// setting up router 
const router = Router();

// creating disk storage for storing using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`));
    },
    filename: function (req, file, cb) {
     const fileName = `${Date.now()}-${file.originalname}`;
     cb(null, fileName);
    },
  });
// uploading using multer
const upload = multer({ storage: storage })

// get route for blogs 
router.get('/add-new', (req, res)=>{
return res.render('addBlog');
})

//get route for perticular id of blogs 
router.get('/:id', async (req,res)=>{
  const blog = await Blog.findById(req.params.id).populate('createdBy');
  const comments = await Comment.find({blogId:req.params.id}).populate('createdBy');
  return res.render('blog', {
    user:req.user,
    blog:blog,
    comments,
  });
});

//post route for blogs 
router.post('/add-new', upload.single('coverImage'), async (req, res)=>{
   const {title, body} = req.body;
   const blog = await Blog.create({
    body,
    title,
    coverImageURL:`/uploads/${req.file.filename}`,    
    createdBy: req.user._id
   });
    return res.redirect(`/blog/${blog._id}`);
    });

    //routes for adding comments
    router.post('/comment/:blogId', async (req, res)=>{
      const comment = await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy:req.user._id,
      });
      return res.redirect(`/blog/${req.params.blogId}`);
    });

module.exports = router;