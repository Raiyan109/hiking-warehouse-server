const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js')

const requireSignIn = async (req, res, next) => {
    try {
        const decode = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode
        next();
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                msg: 'Unauthorized access'
            })
        }
        else {
            next()
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

module.exports = { requireSignIn, isAdmin }