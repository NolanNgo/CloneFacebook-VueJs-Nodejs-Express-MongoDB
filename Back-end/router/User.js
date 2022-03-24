const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const gateToken = require("../middleware/checkToken");
const { cloudinary } = require("../cloud/cloudinary");
const {
  ValidatorSignUp,
  ValidatorSignIn,
  validatiorChangePass,
  validationChangeProfile
} = require("../Validator/ValidatorAccount");

const { validationResult } = require("express-validator");
const router = express.Router();
//Register Post User

router.post("/signUp", ValidatorSignUp, async (req, res) => {
  let result = validationResult(req);
  if (result.errors.length === 0) {
    let { email, username, password, } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.json({ success: false, message: "Email đã tồn tại" });
      }
      let hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        username,
        password: hashPassword,
        avatar : "http://res.cloudinary.com/dd1vmklog/image/upload/v1630173038/dev_setup/ai2uqvulbxt7xeeaxukw.jpg"
      });
      await newUser.save();
      const accessTokens = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN
      );
      return res.status(200).json({
        success: true,
        message: "Đăng Kí thành công",
        data: newUser,
        token: accessTokens,
      });
      // res.json({success: true , message:"password after hash"+hashPassword});
    } catch (error) {
      return res.status(500).json({ success: false, mesage: error.message });
    }
  }
  let arrMessage = result.mapped();
  let mess = "";
  for (let m in arrMessage) {
    mess = arrMessage[m];
    break;
  }
  return res.json({ success: false, message: mess });
});

//Login User
router.post("/signIn", ValidatorSignIn, async (req, res) => {
  let result = validationResult(req);
  if (result.errors.length === 0) {
    let { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({
          success: false,
          message: "Người dùng không tồn tại",
        });
      }
      let match = await bcrypt.compare(password, user.password);
      if (match) {
        const accessTokens = jwt.sign(
          { userId: user._id },
          process.env.ACCESS_TOKEN
        );
        return res.json({
          success: true,
          message: "Đăng nhập thành công",
          data: user,
          token: accessTokens,
        });
      }
      return res.json({ success: false, message: "Đăng nhâp thất bại" });
    } catch (errors) {
      return res.json({ success: false, message: errors.message });
    }
  }
  let arrMessage = result.mapped();
  let mess = "";
  for (let m in arrMessage) {
    mess = arrMessage[m];
    break;
  }
  return res.json({ success: false, message: mess.msg });
});
//Edit Profile
router.post( "/changepassword",validatiorChangePass, gateToken, async (req, res) => {
    const userId = req.userId;
    let result = validationResult(req);
    if (result.errors.length === 0) {
      const { oldPassword, newPassword } = req.body;
      try {
        const user = await User.findOne({ _id: userId });
        let match = bcrypt.compareSync(oldPassword, user.password);
        if(!match){
            return res.json({success: false, message:"Thông tin không chính xác"});
        }
        let newhash = bcrypt.hashSync(newPassword, 10);
        let updateUser = ({password : newhash});
        const conditionsUpdate = {_id : userId};
        updateUser = await User.findOneAndUpdate(conditionsUpdate, updateUser, {new: true});
        if(!updateUser){
            return res.status(401).json({success: false, message:"Mật khẩu không đúng hoặc không thể đổi"});
        }
        return res.status(200).json({success: true, message:"Thay đổi thành công", data: updateUser});
      } catch (error) {
          return res.status(500).json({success: false, message:error.message});
      }
    }
    let arrMessage = result.mapped();
    let mess = "";
    for (let m in arrMessage) {
      mess = arrMessage[m];
      break;
    }
    return res.json({ success: false, message: mess.msg });
  }
);

router.put('/editProfile', gateToken, async (req, res) => {
  const userId = req.userId;
  const { avatar, username} = req.body;
  let fileAvatar = "";
  if (!username) {
    return res.status(404).json({ success: false, message: 'Vui lòng điền tên người dùng' });
  }
  if(avatar.length >0){
    console.log('hihihihi');
    try {
      const uploadsFile = await cloudinary.uploader.upload(avatar, {
        upload_preset: "dev_setup",
      });
      console.log(uploadsFile);
      if (!uploadsFile) {
        return res.json({ success: false, message: "Cập nhật thất bại" });
      }
      fileAvatar = uploadsFile.url;
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  }
  try {
    let updatedUser = {};
    if(fileAvatar.length>0){
      updatedUser = ({ avatar: fileAvatar, username});
    }else{
      updatedUser = ({username});
    }
    const updateCondition = { _id: userId };
    updatedUser = await User.findOneAndUpdate(updateCondition, updatedUser, { new: true });
    if (!updatedUser) {
      return res.status(401).json({ sucess: false, message: 'Comment not found or not authorized' })
    }
    return res.json({ success: true, message: "update Thanh Cong", data: updatedUser });

  } catch (err) {
    res.json({ success: false, message: err.message })
  }
})


router.post('/profile/:idUser',async(req,res)=>{
  const userId = req.params.idUser;
  try{
    const user = await User.findById({_id: userId});
    if(user){
      return res.json({success:true , message:"Lấy người dùng thành công", data:user });
    }
    return res.status(404).json({ success:false , message:"Không tìm thấy người dùng này"});
  }catch(error){
    return res.status(500).json({ success:false, message:error.message});
  }
})


// router.post('/changeProfile',validationChangeProfile,gateToken, async (req, res) => {
//   const userId = req.userId;
//   let result = validationResult(req);
//   if(result.errors.length === 0){
//     const {avatar , username} = req.body;
//     try{
      
//     }catch(error){
      
//     }
//   }

// })
module.exports = router;
