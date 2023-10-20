const express = require('express');
const { signup, login, testController } = require('../controllers/userController.js');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware.js')

const router = express.Router()

// Test controller
router.get('/test', requireSignIn, isAdmin, testController)

// Protected User Route 
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).json({ ok: true })
})
// Protected Admin Route 
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).json({ ok: true })
})

// get all items

// get a item

// Post items || Signup
router.post('/signup', signup)

// Login
router.post('/login', login)

// Delete a item

// Update an item




module.exports = router