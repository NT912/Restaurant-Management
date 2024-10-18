const { check, validationResult } = require('express-validator');

const authValiddator = {
    validateLogin: [
        check('userName')
            .notEmpty()
            .withMessage('User name is required'),
        
        // Kiểm tra xem password có tồn tại không
        check('password')
            .notEmpty()
            .withMessage('Password is required'),

        // Middleware để kiểm tra lỗi và trả về nếu có lỗi
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
            next(); 
        }
    ]
}

module.exports = authValiddator;