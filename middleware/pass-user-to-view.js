//Create a logic that ASSIGNS req.session.user to res.locals.user
//If NO user is found, we set it to null. Then allow the request to continue on the normal chain by invoking next().
//These middleware functions should run before any routes that check for a valid user or require a user to be signed in to view a page.


const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null
    next()
};

module.exports = passUserToView;     //Exports it to the server.js.
