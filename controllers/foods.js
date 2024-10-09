const express = require('express');
const router = express.Router();

const User = require('../models/user.js')
//-----------------------------------------------------------\\
//Landing page/Index page
router.get('/', async (req, res) => {
    try {
    const currentUser = await User.findById(req.session._id);            //Find the User
    res.render('foods/index.ejs', {
        foods: currentUser.pantry,
    });
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

//Form
router.get('/new', (req, res) => {
    //console.log(req.params.userId); // Log the userId
    res.render('foods/new.ejs', {
        user: req.session.user })
    });




module.exports = router;

