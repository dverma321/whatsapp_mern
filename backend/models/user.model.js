const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uname:{
        type: String,
        unique: true,
        required: true
    },

    name:{
        type: String,        
        required: true
    },

    email:{
        type: String,
        unique: true,
        required: true
    },

    password:{
        type: String,
        minlength: 6,
        required: true
    },

    cpassword:{
        type: String,
        minlength: 6,
        required: true
    },

    profilepic: {
        type: String,
        default:""
    },

    gender:{
        type: String,
        required: true,
        enum:["male","female"]
    },

    phone: {
        type: Number,
        required: true
    }
},{
    // created At, updated At
    timestamps: true
})

const newUser = mongoose.model('user', userSchema);

module.exports = newUser