const PComment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");


exports.createComment = async (req, res) => {
  const { email } = req.users;
  try {
    // fetching user details
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        status: 0,
        message: "User not found this token!",
      });
    }
    //Intializing comment using constructor
    const newComment = new PComment(req.body);
    //save comment in database
    const savedComment = await newComment.save();
    const post = await Post.findById({ _id: req.body.postId });
    return res.status(201).json({
      status: 1,
      comment: savedComment,
      user: existingUser,
      post,
    });
  } catch (error) {
    return res.status(400).json({
        status:0,
        message:'Something went wrong!'
     })
  }
};
exports.getAllComments = async (req, res) => {
  const { email } = req.users;
  try {
     // fetching user details
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        status: 0,
        message: "User not found this token!",
      });
    }
    //fetching comments from database
    const savedComment = await PComment.find();
    return res.status(201).json({
      status: 1,
      comment:savedComment
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
        status:0,
        message:'Something went wrong!'
     })
  }
};
exports.getCommentById = async (req, res) => {
  const { email } = req.users;
  const {id}=req.params
  try {
     // fetching user details
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        status: 0,
        message: "User not found this token!",
      });
    }
    //fetching comments from  database with id
    const savedComment = await PComment.findById({_id:id});
    return res.status(201).json({
      status: 1,
      comment:savedComment
    });
  } catch (error) {
    return res.status(400).json({
        status:0,
        message:'Something went wrong!'
     })
  }
};
exports.updateComment = async (req, res) => {
  const { email } = req.users;
  const {id}=req.params
  try {
     // fetching user details
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        status: 0,
        message: "User not found this token!",
      });
    }
    //find the comment by id and updating it.
    const savedComment = await PComment.findByIdAndUpdate({_id:id},req.body,{new:true});
    return res.status(201).json({
      status: 1,
      comment:savedComment
    });
  } catch (error) {
    return res.status(400).json({
        status:0,
        message:'Something went wrong!'
     })
  }
};
exports.deleteComment = async (req, res) => {
  const { email } = req.users;
  const {id}=req.params
  try {
     // fetching user details
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        status: 0,
        message: "User not found this token!",
      });
    }
    //deleting the comment from database
    const savedComment = await PComment.findByIdAndDelete({_id:id});
    return res.status(201).json({
      status: 1,
      message:"comment deleted successfully!1"
    });
  } catch (error) {
    return res.status(400).json({
        status:0,
        message:'Something went wrong!'
     })
  }
};



