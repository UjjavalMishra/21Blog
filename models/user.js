// importing mongoose
const {Schema, model} = require('mongoose');

// importing tools for hashing 
const {Hmac, randomBytes, createHmac} = require('crypto');

// importing function from authentication
const {createTokenForUser} = require('../services/authentication');

// creating a user schema
const userSchema = new Schema({
    fullName:{
        type:String, 
        required:true
    },
    email:{
        type:String, 
        unique:true,
        required:true
    },
    salt:{
        type:String, 
    },
    password:{
        type:String, 
        required:true,
    },
    role:{
        type:String, 
        enum:['User', 'Admin'],
        default:'User'
    },
    profileImage:{
        type:String, 
        default:'./Public/userProfile.jpg'
    },
}, {timestamps:true});

// using pre for doing something before saving the userSchema in db
userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified("password")) return;

    // creating a salt
    const salt = randomBytes(16).toString();

    //hashing password using salt 
    const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt ;
    this.password = hashedPassword;

    // calling the next middleware
    next();
})

// static method allows us to define static class methods for the models using schema objects. We can access static method on schema object to define static methods.
userSchema.static("matchedPasswordAndGenerateToken", async function(email, password){
    // here searching for the user with email = email ( given email ) and storing this user in the user object
    const user = await this.findOne({ email });

    if(!user) throw new Error('user not  found');
    
    // accessing  user salt
    const salt = user.salt;

    const HashedPassword = user.password;

    //creating a new hashedpassword using the given salt of the user 
    const UserPassword = createHmac('sha256', salt)
    .update(password)
    .digest('hex');

    // verifying 
     if(HashedPassword !== UserPassword) throw new Error('password does not matches');

    const token = createTokenForUser(user) ;
    return token;
});

const User = model('user', userSchema);

module.exports = User;