const Item = require('../models/itemModel.js');
const multer = require('multer');
const fs = require('fs')
const path = require('path')


// storage
const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: Storage
}).single('image')

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
    const { name, price, des, supplier, quantity, imageUrl } = req.body

    // add doc to db
    try {
        const item = await Item.create({ name, price, des, supplier, quantity, image: imageUrl })
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    // upload(req, res, async (err) => {
    //     if (err) {
    //         return res.status(400).json({ error: err.message })
    //     }
    //     const { name, price, des, supplier, quantity } = req.body
    //     if (!req.file) {
    //         return res.status(400).json({ error: 'No file uploaded' })
    //     }

    //     // Access filename property of the uploaded file
    //     const filename = req.file.filename
    //     const image = {
    //         data: fs.readFileSync(path.join(__dirname, '../uploads' + req.file.filename)),
    //         contentType: 'image/png'
    //     }
    //     // add doc to db
    //     try {
    //         const item = await Item.create({ image: { data: req.file.buffer, contentType: req.file.mimetype }, name, price, des, supplier, quantity })
    //         res.status(200).json(item)
    //     } catch (error) {
    //         res.status(400).json({ error: error.message })
    //     }
    // })
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

// Decrease quantity 
const decreaseQuantity = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findByIdAndUpdate(
            { _id: id },
            { $inc: { quantity: -1 } },
            { new: true }
        );

        if (!item) {
            return res.status(404).json({ error: 'Not found your desired item' });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createItem,
    getItems,
    getItem,
    deleteItem,
    updateItem,
    decreaseQuantity
}
