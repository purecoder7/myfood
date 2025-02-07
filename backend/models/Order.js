
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  
    email:{
        type: String,
        required: true,
        unique: true
    },
    order:{
        type: Array,
        required: true
    },
    date:{
        type: Date,
    },
})

module.exports = mongoose.model("order",orderSchema)