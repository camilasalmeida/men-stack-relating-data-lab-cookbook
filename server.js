const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/foods.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const isSignedIn = require('./middleware/is-signed-in.js');

//------------------------------------------------------------------------\\

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//------------------------------------------------------------------------\\
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);


//------------------------------------------------------------------------\\
app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});

app.use(passUserToView);                                               //For this app, users must be signed in to view any of the routes associated with their pantry.
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/foods', foodsController);                        //Use middleware to direct incoming requests to /users/:userId/foods to the foods controller.


//------------------------------------------------------------------------\\
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!🎧`);
});


/*`fatal: The current branch main has no upstream branch.`
In Git, the term "upstream" refers to the remote repository that your local branch is tracking. When you have an upstream branch set, it allows you to easily push your local changes and pull updates from the remote branch.
In your case, the error message indicates that the local branch main doesn’t have an upstream branch associated with it. This is why the git push command is failing.
To set the upstream branch, you can use the following command:
git push -u origin main
-u: This flag sets the upstream branch for the local branch.
origin: This is the default name for the remote repository.
main: This is the name of your local branch.
*/
