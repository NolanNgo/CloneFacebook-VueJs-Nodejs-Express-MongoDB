const express = require("express");
const { validationResult } = require("express-validator");
const Post = require("../model/post.model");
const router = express.Router();
const gateToken = require("../middleware/checkToken");
const validatorPost = require("../Validator/ValidatorPost");
const { cloudinary } = require("../cloud/cloudinary");
const Comment = require('../model/comment.model');
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    fs.mkdir(`./uploads/users/${request.userId}`, (err) => {
      if (err) {
        // console.log("error occurred in creating new directory", err);
        return false;
      }
      // console.log("New directory created successfully");
      return true;
    });
    callback(null, `./uploads/users/${request.userId}`);
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

const uploads = multer({
  storage: storage,
  limits: {
    filedSize: 1024 * 1024 * 3,
  },
});


//---------------------------------------------------------------------------Comment-----------------------------------------------
router.get('/:id/comment', async(req,res)=>{
  const postId = req.params.id;
  try{
      const result = await Comment.find({post:postId}).populate('user')
      //const result = await Comment.find({post:postId}).populate('post').populate('user');
      res.json({success:true, data:result});
  }catch(err){
      res.json({success:false, message:err.message})
  }
})
router.post('/:id/comment',gateToken,async(req,res)=>{
  const postId = req.params.id;
  const userId = req.userId;
  const {content} = req.body;
  if(!content){
    return res.json({success:false , message:"Vui lòng điền nội dung bình luận"});
  }
  try{
      const post = await Post.find({_id:postId});
      if(!post){
         return  res.status(400).json({success: false, message:"Khong tim thay bai viet"} )
      }
      const newComment = new Comment({user:userId,faculty:userId , post: postId ,content});
      await newComment.save();
      const result = await Comment.find({_id: newComment._id}).populate('user');
      res.json({success:true, message:"Comment thanh Cong", data: result});
  }catch(error){
      res.json({success:false, message: error.message})
  }
})
router.delete('/:PostId/comment/:CommentId',gateToken, async(req,res)=>{
  const CommentId = req.params.CommentId;// tham số truyền vào cùng với đường dẫn
  const userId = req.userId;// sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
  try{
      const deleteCondition = {_id : CommentId , user: userId};
      const deletedComment = await Comment.findByIdAndDelete(deleteCondition);
      if(!deletedComment){
          return res.status(401).json({sucess: false , message : 'post not found or not authorized'})
      }
          return res.json({success:true , message : "Xoa Thanh Cong", data: deletedComment});
  }catch(err){
      res.json({success:false, message: err.message})
  }   
  // res.json(idPost)
})


router.put('/:PostId/comment/:CommentId',gateToken, async(req,res)=>{
  const userId = req.userId;
  const CommentId = req.params.CommentId;
  const{content} = req.body;
  if(!content){
      return res.status(404).json({success:false , message: 'Vui lòng điền nội dung bình luận'})
  }
  try{
      let updatedComment = ({content});
      const updateCondition = {_id :CommentId , user: userId};
      updatedComment = await Comment.findOneAndUpdate(updateCondition, updatedComment, {new: true}); 
      if(!updatedComment){
          return res.status(401).json({sucess: false , message : 'Comment not found or not authorized'})
      }
          return res.json({success:true , message : "update Thanh Cong", data: updatedComment});
  }catch(err){
      res.json({success:false, message: err.message})
  }
  //res.json({success:true, data:{idPost, idComment}});
})

//---------------------------------------------------------------------------Post------------------------------------------------
router.get("/getPost", gateToken, async (req, res) => {
  const userId = req.userId;
  // return res.json({
  //   success: true,
  //   message: "aaaaaaaaaaaaaaaaaa",
  //   data: userId,
  // });
  if(userId) {
    try{
      const result = await Post.find().sort({timePost:-1}).populate("user",['_id','email','username','avatar']);
      return res.json({success:true , message: "Lấy dữ liệu thành công", data: result});
    }
    catch(error){
      return res.json({success:false, message :errors.message });
    }
  }
});

router.post("/addPost", gateToken, async (req, res) => {
  const { title, image, url } = req.body;
  const userId = req.userId;
  let fileImage = "";
  if (title.length <= 0) {
    return res.json({
      success: false,
      message: "Vui lòng điền nội dung của bài viết",
    });
  } else if (title.length <= 6) {
    return res.json({
      success: false,
      message: "Nội dung phải có ít nhất 6 kí tự",
    });
  } else {
    if (image.length > 0) {
      try {
        const uploadsFile = await cloudinary.uploader.upload(image, {
          upload_preset: "dev_setup",
        });
        console.log(uploadsFile);
        if (!uploadsFile) {
          return res.json({ success: false, message: "Đăng bài thất bại" });
        }
        fileImage = uploadsFile.url;
      } catch (error) {
        res.json({ success: false, message: error.message });
      }
    }
    try {
      const newPost = new Post({ title, img: fileImage, url, user: userId });
      await newPost.save();
      const result = await Post.find({ _id: newPost._id }).populate("user");
      // console.log('sssssssss',result);
      res.json({ success: true, message: "Thêm Thành Công", data: result });
    } catch (errors) {
      res.status(500).json({ success: false, message: errors.message });
    }
  }
});
router.get('/user', gateToken ,async(req,res)=>{
  const userid = req.userId; // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
  try{
      const result = await Post.find({user:userid}).sort({timePost:-1}).populate('user');
      if(Object.values(result).length === 0){
          return res.status(404).json({success:false , message: "Không tìm thấy các bài post của user này"})
      }
      res.json({success: true , message : "Lấy dữ liệu thành công" ,data: result});
  }catch(error){
      res.json({success:false, message: err.message});
  }
})

router.put('/:id', gateToken ,async(req,res)=>{
  const user = req.userId // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
  const idPost = req.params.id
  const{title ,url,image:img} = req.body;
  if(!title){
      return res.status(404).json({success:false , message: 'Title is require'})
  }
  try{
      let updatedPost = ({title ,img, url});
      const updateCondition = {_id : idPost , user: user};
      updatedPost = await Post.findOneAndUpdate(updateCondition, updatedPost, {new: true}).populate('user',['name','email','_id','image']); 
      if(!updatedPost){
          return res.status(401).json({sucess: false , message : 'post not found or not authorized'})
      }
          return res.json({success:true , message : "update Thanh Cong", data: updatedPost});
  }catch(err){
      res.json({success:false, message: err.message})
  }
})

router.delete('/:id',gateToken, async(req,res)=>{
  const idPost = req.params.id;// tham số truyền vào cùng với đường dẫn
  const user = req.userId; // sau khi qua gateToken thì gateToken sẽ gắn userId sau khi decode với accessToken vào trong req
  try{

      // const deletedPost = await Post.findByIdAndDelete({ _id : idPost , user: req.userId});
      const deleteCondition = { _id : idPost , user: user};
      const deletedPost = await Post.findOneAndRemove(deleteCondition);
      const result = await Comment.find({post:idPost}).deleteMany();
      // console.log(deletedPost)
      if(!deletedPost){
          return res.status(401).json({sucess: false , message : 'post not found or not authorized'})
      }
          return res.json({success:true , message : "Xoa Thanh Cong", data: deletedPost});
  }catch(err){
      res.json({success:false, message: err.message})
  }   
  //res.json(idPost)
})
module.exports = router;
