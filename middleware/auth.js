const jwt=require('jsonwebtoken')
exports.auth=async(req,res,next)=>{
    // console.log(req.headers)
    const {authorization}=req.headers;
    const token=authorization.split(" ")[1];
    if(!token){
        return res.status(400).json({
            status:0,
        message:'Invalid Token!'
        })
    }
   try{
    //validating the token
     const isValidToken=jwt.verify(token,process.env.SECRET_KEY);
     //set all user details in request 
     req.users=isValidToken;
     next();
   }
   catch(err){
    return res.status(400).json({
        status:0,
        message:"Invalid token!!"
    })
   }
}