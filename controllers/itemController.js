const Item = require('../models/itemModel.js');
const multer = require('multer');

// get all items
const getItems = async (req, res) => {
    const items = await Item.find({}).sort({ createdAt: -1 })
    res.status(200).json(items)
}
// get a item
const getItem = async (req, res) => {
    const { id } = req.params
    const item = await Item.findById(id)

    if (!item) {
        return res.status(404).json({ error: 'Not found your desired item' })
    }
    res.status(200).json(item)
}
// Post items
const createItem = async (req, res) => {
    const { name, price, des, supplier, quantity } = req.body

    // add doc to db
    try {
        const item = await Item.create({ name, price, des, supplier, quantity })
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
// Delete a item
const deleteItem = async (req, res) => {
    const { id } = req.params

    const item = await Item.findOneAndDelete({ _id: id })
    if (!item) {
        return res.status(404).json({ error: 'Not found your desired item' })
    }
    res.status(200).json(item)
}
// Update an item
const updateItem = async (req, res) => {
    const { id } = req.params

    const item = await Item.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!item) {
        return res.status(404).json({ error: 'Not found your desired item' })
    }
    res.status(200).json(item)
}

module.exports = {
    createItem,
    getItems,
    getItem,
    deleteItem,
    updateItem
}
