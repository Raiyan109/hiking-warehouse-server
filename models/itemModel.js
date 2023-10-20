const mongoose = require('mongoose')


const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        // data:Buffer,
        // contentType: String
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