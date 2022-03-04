const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


//Load User Model
const User = require('../model/User');

module.exports = function(passport){
    passport.use(
        new LocalStrategy()
    );
}  