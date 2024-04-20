// importing routes 
const {Router} = require("express");
const router = Router();

// importing model 
const User = require("../models/user");

// setting get routes 
router.get("/signup", (req,res)=>{
    return res.render('signup');
})

router.get("/signin", (req,res)=>{
    return res.render('signin');
})

// setting post routes on signup
router.post('/signup', async (req,res)=>{
    const {fullName, email, password} = req.body;
     await User.create({
        fullName,
        email,
        password,
     });
     return res.redirect("/");
})

router.get('/logout', (req, res)=>{
res.clearCookie("token").redirect('/');
})

// setting post routes on signin
router.post('/signin', async (req,res, next)=>{
    const {email, password} = req.body;
   try {
    const token = await User.matchedPasswordAndGenerateToken(email,password);
    return res.cookie("token", token).redirect("/");
   } catch (error) {
    return res.render('/', {
        error: "Incorrect username or password"
    });
   }
}) 

module.exports = router;