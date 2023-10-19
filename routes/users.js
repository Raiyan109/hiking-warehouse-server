const express = require('express');
const { signup, getItems, getItem, deleteItem, updateItem, decreaseQuantity } = require('../controllers/userController.js');

const router = express.Router()

// get all items

// get a item

// Post items || Signup
router.post('/signup', signup)

// Delete a item

// Update an item

// Decrease quantity


module.exports = router