const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken');

exports.createUser = async (req, res) => {
  const { name, username, email, mobile, dob, image, password } = req.body;

  //check all the field exist or not
  if (!name || !username || !email || !mobile || !dob || !password) {
    return res.status(400).json({
      status: 0,
      message: "All fields are required!",
    });
  }

  try {
    //check email is exist or not
    const existEmail = await User.find({ email });
    if (existEmail.length === 0) {
      const saltRounds = 10;

      //hashing password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      if (!hashedPassword) {
        return res.status(401).json({
          status: 0,
          message: "Something went wrong!!",
        });
      }

      //convert date string to date format
      const newDate = new Date(dob);

      //Initialize user's fields in user schema
      const newUser = new User({
        name,
        username,
        email,
        mobile,
        dob: newDate,
        image,
        password: hashedPassword,
      });

      //save user in database
      const savedUser = await newUser.save();
      return res.status(201).json({
        status: 1,
        message: "user created successfully",
        user: savedUser,
      });
    } else {
      return res.status(400).json({
        status: 0,
        message: "Email already exist!!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 0,
      message: "Something went wrong!",
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json({
      status: 1,
      length: allUsers.length,
      users: allUsers,
    });
  } catch (err) {
    return res.status(400).json({
      status: 0,
      message: "Something went wrong!",
    });
  }
};

exports.getUserById=async(req,res)=>{
    const {id}=req.params;
    try{
      const existUser=await User.findById({_id:id});
      if(existUser){
        return res.status(200).json({
            status:1,
            user:existUser
        })
      }
      else{
        return res.status(401).json({
            status:0,
            message:"User not exist!"
        })
      }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            status: 0,
            message: "Something went wrong!",
          });
    }
}

exports.deleteUser=async(req,res)=>{
    const {id}=req.params;
    try{
      const existUser=await User.findById({_id:id});
      if(existUser){
        const deleteUser=await User.findByIdAndDelete({_id:id});
        return res.status(200).json({
            status:1,
            message:"User deleted successfully!!"
        })
      }
      else{
        return res.status(401).json({
            status:0,
            message:"User not exist!"
        })
      }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            status: 0,
            message: "Something went wrong!",
          });
    }
}

exports.updateUser=async(req,res)=>{
    const {id}=req.params;
    try{
      const existUser=await User.findById({_id:id});
      console.log(existUser,"s");
      if(existUser){
        const updateUser=await User.findByIdAndUpdate({_id:id},req.body,{new:true});
        return res.status(200).json({
            status:1,
            message:"User updated successfully!!",
            updatedData:updateUser
        })
      }
      else{
        return res.status(401).json({
            status:0,
            message:"User not exist!"
        })
      }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            status: 0,
            message: "Something went wrong!",
          });
    }
}

exports.login=async(req,res)=>{
    const {email,password}=req.body;
    try{
      const existUser=await User.findOne({email});
      if(!existUser){
        return res.status(401).json({
            status:0,
            message:"Email or password are invalid!!"
        })
        
      }
      const isCorrectPassword=await bcrypt.compare(password,existUser.password);
      if(!isCorrectPassword)
      {
        return res.status(401).json({
            status:0,
            message:"Email or password are invalid!!"
        })
      }
      const jwtPayload={
        email,
        name:existUser.name,
        mobile:existUser.message,
        dob:existUser.dob,
      }
      const token= jwt.sign(jwtPayload,process.env.SECRET_KEY,{ expiresIn:"3600s"});
      return res.status(200).json({
        status:0,
        token
      })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            status:0,
            message:"Something went wrong!"
        })
    }
}
