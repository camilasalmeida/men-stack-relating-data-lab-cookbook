//Create the logic that checks if req.session.user exists. If YES, allows the request to continue on the normal chain by invoking next(). If NO, the user should be redirected to the sign in page.

const isSignedIn = (req, res, next) => {
    if(req.session.user) return next();
    res.redirect('/auth/sign-in');
};

module,exports = isSignedIn;          //Export it to the server.js

