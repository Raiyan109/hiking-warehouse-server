const express = require('express');
const { createItem, getItems, getItem, deleteItem, updateItem } = require('../controllers/itemController');

const router = express.Router()

// get all items
router.get('/', getItems)
// get a item
router.get('/:id', getItem)
// Post items
router.post('/', createItem)
// Delete a item
router.delete('/:id', deleteItem)
// Update an item
router.patch('/:id', updateItem)

module.exports = router