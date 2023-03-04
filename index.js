const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config()
const itemRoutes = require('./routes/items.js')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/items', itemRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`connected to db and listening on port ${process.env.PORT}`))
    })
    .catch((err) => {
        console.log(err);
    })
