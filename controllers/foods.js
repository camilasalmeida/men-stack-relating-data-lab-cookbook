const express = require('express');
const router = express.Router();

const User = require('../models/user.js')
//-----------------------------------------------------------\\
//Landing page/Index page
router.get('/', async (req, res) => {
    try {
    const currentUser = await User.findById(req.session.user._id);            //Find the User
    if (!currentUser) {
        return res.redirect('/')                                         //Could not find a User
    }
    res.render('foods/index.ejs', {
        foods: currentUser.pantry,
    });
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});

//Form
router.get('/new', (req, res) => {
    //console.log(req.params.userId); // Log the userId
    res.render('foods/new.ejs', {
        user: req.session.user })
    });

//Create functionality - POST
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.pantry.push(req.body);
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

//Delete route
router.delete('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.foodId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//Edit
router.get('/:foodId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const food = currentUser.pantry.id(req.params.foodId);
        res.render('foods/edit.ejs', {
            food: food,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//Update - PUT
router.put('/:foodId', async (req, res) => {
try {
    const currentUser = await User.findById(req.session.user._id)                    //Find the current user
    const food = currentUser.pantry.id(req.params.foodId);                           //Find the current food
    food.set(req.body);                                                              //Use the .set() method, to update the current food to reflect the new form data on req.body
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods/${food._id}`);

} catch(error) {
    console.log(error);
    res.redirect('/');
}
});

module.exports = router;

