'use strict'

//!dmbg

const { model, Schema, Types } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Shop'
const COLLECTION_NAME = 'Shops'

// Declare the Schema of the Mongo model
var shopSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxLength: 150
    },
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        require: true
    },
    status: {// cho phep hd hay khong
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    verfify: {//xac minh shop da dang ky thnah cong chua
        type: Schema.Types.Boolean,
        default: false,
    },
    role: {// shop co quyen crud
        type: Array,
        default: [],
    }
}, {
    timestampse: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);