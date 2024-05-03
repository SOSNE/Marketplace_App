const cors = require('cors');
const GetFomDatabase = require("./models/DatabaseCommunication")
const express = require('express');
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json());

const offersRoute = require("./routes/Offers")
const signUpRoute = require("./routes/SignUp")
const emailConfirmation = require("./routes/EmailConfirmation")
const logIn = require("./routes/LogIn")
const auth = require("./routes/AuthHandlingCheck")
const newOffer = require("./routes/NewOffer")
const photos = require("./routes/Image")
app.use('/offers',offersRoute);
app.use('/signup',signUpRoute);
app.use('/emailConfirmation',emailConfirmation);
app.use('/login',logIn);
app.use('/auth',auth);
app.use('/newoffer',newOffer);
app.use('/photo',photos);
app.listen(8080, ()=> {console.log("server listening")})