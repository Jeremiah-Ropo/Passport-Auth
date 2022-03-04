const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

//User model
const User = require('../model/User')

//Login page
router.get('/login', (req,res) => {res.render('login')})


//Register page.
router.get('/register', (req,res) => {res.render('register')});

router.post('/register', (req,res) => {
    const {name, email, password, password2} = req.body;
    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Pls, fill properly '});
    }

    if (password !== password2){
        errors.push({msg: 'Passowrd do not match'});
    }

    if (password.length < 6){
        errors.push({msg: 'Password should be at least 6 characters'});
    }

    if (errors.length > 0){
        res.render('register', {
            errors,
            name,
            password,
            password2
        })
    }else{
       // Validation passed
       User.findOne({ email:email})
        .then(user => {
            if(user){
                //User exists.
                errors.push({msg:'User exist'})
                res.render('register', {
                    errors, // Rendering the errors, name, and password
                    name,       // to enter another email.
                    password,// meaning no one two email register.
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                //Hash Password
                bcrypt.genSalt(10, (err, salt) =>{
                    bcrypt.hash(newUser.password, salt, (err, hash) =>{
                        if(err) throw err;
                        newUser.password = hash;

                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You have succesfully registered')
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                });
            })
            }
        })
    }
});



module.exports = router;