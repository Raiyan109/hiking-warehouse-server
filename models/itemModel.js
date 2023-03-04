const mongoose = require('mongoose')


const Schema = mongoose.Schema

const itemSchema = new Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    des: {
        type: String,
        required: true
    },
    supplier: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Item', itemSchema)