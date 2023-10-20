const { hashPassword, comparePassword } = require('../helpers/authHelper.js')
const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name) {
            return res.send({ error: 'Name is Required' })
        }
        if (!email) {
            return res.send({ error: 'Email is Required' })
        }
        if (!password) {
            return res.send({ error: 'Password is Required' })
        }

        // Check User 
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Already Signed up'
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await new User({
            name,
            email,
            password: hashedPassword
        }).save()

        res.status(200).send({
            success: true,
            message: 'User Registered',
            user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password',
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'Email is not registered',
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Password',
            })
        }

        // JWT Token
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}

// Test controller
const testController = async (req, res) => {
    try {
        res.send('Private Route')
    } catch (error) {
        console.log(error);
        res.send({ error })
    }
}

module.exports = { signup, login, testController }