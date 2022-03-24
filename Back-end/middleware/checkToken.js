const jwt = require("jsonwebtoken");
require('dotenv').config();

const checkToken = (req,res,next) => {
    const authorToken = req.header('Authorization');
    const token = authorToken && authorToken.split(' ')[1];
    if(!token){
        return res.status(404).json({success:false , message: "Access Token not found"});
    }
    try{
        const decode = jwt.verify(token , process.env.ACCESS_TOKEN);
        req.userId = decode.userId;
        next();
    }catch(error){
        return res.status(403).json({success: false, message: error.message});
    }
}
module.exports = checkToken;