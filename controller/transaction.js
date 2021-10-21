const Transaction = require("../model/transaction")
const User = require("../model/user")
const mongoose = require("mongoose")
const conn = require("../conn")



exports.getTransactionById = (req,res,next,id)=>{
    Transaction.findById(id).exec((err,transaction)=>{
        if(err){
            return res.status(400).json({
                error:"No Such transaction found"
            })
        }
        req.transaction = transaction;
        next();
    })
}

const getUser = (id) => {
    User.findById(id).exec((err,user)=>{
        if(err){
            return -1;
        }
        return user;
    })
}

const getUserByAccNo=async(Accno)=>{
    return await User.findOne({
        accNo:Accno
    },
    (err,user)=>{
        if(err){
            return -1;
        }
        // console.log(user);
        return user
    }
    ).clone()
    .catch((err)=>console.log(err))
}

exports.makeTransaction = async(req,res) => {
    const {from} = req.body;
    const {to} = req.body;
    const {amount} = req.body;
    console.log(from,to);
    if(
        from===""||
        from===null||
        to===""||
        to===null||
        amount===""||
        amount===null
    ){
        return res.status(400).json({
            error:"Trasaction Cannot be proceeded with Null Values"
        });
    }
    if(from===to){
        return res.status(400).json({
            error:"Transaction cannot be done between same accounts"
        })
    }


    ///Starting Transaction
    const session = await User.startSession();

    const fromUser =await getUserByAccNo(from).then(x=>x)
    .catch(err=>console.log(err))
    const toUser= await getUserByAccNo(to).then(x=>x)
    .catch(err=>console.log(err));
    if(!fromUser||!toUser){
        return res.json({
            error:"Transaction Failed"
        })
    }
    console.log(fromUser.balance,amount)
    if(fromUser.balance>=amount){
        try{
            session.startTransaction();
            User.findOneAndUpdate({
                accNo:from
            },
            {
                $inc:{balance:-amount}
            },
            (err,value)=>{
                if(err){
                    return res.status(400).json({
                        error:"Not able to complete request"
                    })
                }
            },
            {session}
            )
            User.findOneAndUpdate({
                accNo:to
            },{
                $inc:{balance:amount}
            },(err,value)=>{
                if(err){
                    return res.status(400).json({
                        error:"Not able to complete request"
                    })
                }
            },
            {session}
            
            )
            const t = new Transaction({from:fromUser.accNo,to:toUser.accNo,amount:amount})
            t.save((err,trans)=>{
                if(err){
                    session.abortTransaction()
                }
            })
            session.commitTransaction();
        }catch(err){
            await session.abortTransaction().catch((err)=>console.log(err));
            res.status(400).json({
                error:"Not able to make transaction"
            })
        }
        return res.status(200).json({
            message:"Transaction Successfull"
        })
    // console.log(fromUser)
    }else{
        res.status(400).json({
            error:"No Sufficient Balance"
        })
    }
    
}

exports.getTransactionOfUser = (req,res)=>{
    const id = req.user._id;
    User.find({
        from:id
    },
    (err,user)=>{
        if(err){
            res.status(400).json({
                error:"Unable to process the request"
            })
        }
        res.status(200).json(user)
    }
    )
}

exports.getAllTransactions = (req,res)=>{
    Transaction.find({},(err,trans)=>{
        if(err){
            return res.status(400).json({
                error:"Something went wrong"
            });
        }
        return res.status(200).json(trans);
    })
}

exports.getTransactionOfUser = (req,res)=>{
    const userId = req.user._id;
    Transaction.find({
        from:userId
    },
    (err,trans)=>{
        if(err){
            res.status(400).json({
                error:"Something went wrong"
            });
        }
        res.status(200).json(trans)
    }
    ).limit(10);
}