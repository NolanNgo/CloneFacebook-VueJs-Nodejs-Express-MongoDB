const {check} = require('express-validator');

const ValidatorSignUp = [
    check('email')
    .exists().withMessage("Vui lòng điền email")
    .notEmpty().withMessage("Vui lòng không bỏ trống Email")
    .isEmail().withMessage("Vui lòng sử dụng Email hợp lệ"),

    check('username')
    .exists().withMessage("Vui lòng cung cấp tên người dùng")
    .notEmpty().withMessage("Vui lòng không để trống tên người dùng")
    .isLength({min:6}).withMessage("Tên người dùng phải có ít nhất 6 ký tự"),
    
    check('password')
    .exists().withMessage("vui lòng điền mật khẩu ")
    .notEmpty().withMessage("Vui lòng không được để trống mật khẩu")
    .isLength({min:6}).withMessage("Mật khẩu phải có ít nhất 6 kí tự")
]
const ValidatorSignIn = [
    check('email')
    .exists().withMessage("Vui lòng điền email")
    .notEmpty().withMessage("Vui lòng không bỏ trống Email")
    .isEmail().withMessage("Vui lòng sử dụng Email hợp lệ"),
    check('password')
    .exists().withMessage("vui lòng điền mật khẩu ")
    .notEmpty().withMessage("Vui lòng không được để trống mật khẩu")
    .isLength({min:6}).withMessage("Mật khẩu phải có ít nhất 6 kí tự")
]
const validatiorChangePass = [
    check("oldPassword")
    .exists().withMessage("Vui lòng điền mật khẩu hiện tại")
    .notEmpty().withMessage("Vui lòng không bỏ trống mật khẩu hiện tại"),

    check("newPassword")
    .exists().withMessage("Vui lòng điền mật khẩu mới")
    .notEmpty().withMessage("Vui lòng không bỏ trống mật khẩu mới")
    .isLength({min:6}).withMessage("Mật khẩu mới phải có ít nhất 6 kí tự")
]

const validationChangeProfile = [
    check('username')
    .exists().withMessage("Vui lòng cung cấp tên người dùng")
    .notEmpty().withMessage("Vui lòng không để trống tên người dùng")
    .isLength({min:6}).withMessage("Tên người dùng phải có ít nhất 6 ký tự"),
]


module.exports ={ ValidatorSignUp, ValidatorSignIn, validatiorChangePass,validationChangeProfile };