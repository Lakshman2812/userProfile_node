const Post = require("../models/post");
const User = require("../models/user");
exports.createPost = async (req, res) => {
  const { email } = req.users;
  const { title, image, description } = req.body;
  try {
     // fetching user details
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({
        status: 0,
        message: "User not exist!",
      });
    }
    
    const newPost = new Post({
      title,
      image,
      description,
      userId: existUser._id,
    });
    //save the post details in datbase
    const savedPost = await newPost.save();
    return res.status(201).json({
      status: 1,
      post: savedPost,
      user: existUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 0,
      message: "Something went wrong!",
    });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({
      status: 1,
      posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 0,
      message: "Something went wrong!",
    });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    //fetching the post from database
    const post = await Post.findById({ _id: id });
    const user = await User.findById({ _id: post.userId });
    return res.status(200).json({
      status: 1,
      post,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 0,
      message: "Something went wrong!",
    });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { email } = req.users;
  try {
     // fetching user details
    const existingPost = await User.findOne({ email });
    if (!existingPost)
      return res.status(400).json({
        status: 0,
        message: "Post not found this token",
      });
      // find the post by and updating it
    const updatedPost = await Post.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    return res.status(200).json({
      status: 1,
      updatedPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 0,
      message: "Something went wrong!",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.users;
     // fetching user details
    const existingPost = await User.findOne({ email });
    if (!existingPost)
      return res.status(400).json({
        status: 0,
        message: "Post not found this token",
      });
    // deleting the post from database
    const updatedPost = await Post.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      status: 1,
      message: "Post deleted successfully!",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 0,
      message: "Something went wrong!",
    });
  }
};
