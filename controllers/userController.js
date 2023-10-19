const { hashPassword } = require('../helpers/authHelper.js')
const User = require('../models/userModel.js')


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

module.exports = { signup }