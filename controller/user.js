const User = require("../model/user");


exports.getUserById=(req,res,next,id)=>{
    console.log("get user by id is called")
    User.findById(id).exec(
        (err,user)=>{
            if(err){
                res.json({error:"Something went wrong"})
            }
            req.user=user;
            next();
            console.log("I am getting called");
            console.log(JSON.stringify(req.user))
        }
    )
}
exports.getAllUsers = (req,res)=>{
    User.find({},(err,users)=>{
        if (err) {
            res.status(400).json({
                error:"Something went wrong"
            });
        }
        res.status(200).json(users);
    })
}

exports.getAUser = (req,res)=>{
    const user_id = req.user._id;
    User.find({
        _id:user_id
    },(err,user)=>{
        if(err){
            res.status(400).json({
                error:"Not able to get a User"
            });
        }
        res.status(200).json(user)
    })
}

exports.createUser = (req,res)=>{
    const {name} = req.body;
    const {phone} = req.body;
    const {balance}= req.body;
    const user = new User({name,phone,balance})
    user.save((err,savedUser)=>{
        if(err){
            return res.send("Could Not Save");
        }else{
            return res.json(savedUser)
        }
    })
}