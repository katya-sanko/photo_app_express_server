'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    photos: [{
        url: String,
        date: Date,
        comments: [{
            body: String,
            date: Date
        }],
        likes: [{
            user_id: String
        }]
    }]
});

userSchema.methods.passwordValid = function (pass) {
    return this.password === pass;
}

mongoose.model('user', userSchema);

