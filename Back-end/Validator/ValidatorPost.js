const {check} = require('express-validator');

const validatorPost = [
    check('title')
    .exists().withMessage('Vui lòng nhập nội dung bài viết')
    .notEmpty().withMessage('Vui lòng không để trống bài viết')
    .isLength({min:6}).withMessage("Mật khẩu phải có ít nhất 6 kí tự")
]
const validatorComment = [
    check('content')
    .exists().withMessage("Vui lòng nhập nội dung bình luận")
    .notEmpty().withMessage("Vui lòng không để trống bình luân")
]
module.exports = {validatorPost , validatorComment};