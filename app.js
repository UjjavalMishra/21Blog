require("dotenv").config();
// setting up express 
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8

//importing cookie parser middleware 
const cookieParser = require('cookie-parser');

//connecting mongo db 
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
.then( (e)=>{
    console.log('MOngoDB Connected');
    
})

// setting ejs 
app.set('view engine', "ejs");

//setting up middlewares 
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
app.use(checkForAuthenticationCookie('token'));

//setting path
const path = require('path');
app.set("views", path.resolve("./views"))

app.use(express.static(path.resolve("./public")));

// setting routes 
const UserRouter = require('./routes/user');
app.use('/user', UserRouter);
const BlogRouter = require('./routes/blog');
app.use('/blog', BlogRouter);

const {Blog} = require('./models/blog');

app.get('/', async (req,res)=>{
    const allBlogs = await Blog.find({});
    res.render('home', {
        user:req.user,
        blogs:allBlogs
    });
});


app.listen(8000);