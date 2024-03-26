const cors = require('cors');
const GetFomDatabase = require("./models/DatabaseCommunication")
const express = require('express');
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json());

const offersRoute = require("./routes/Offers")
const signInRoute = require("./routes/SignIn")
const emailConfirmation = require("./routes/EmailConfirmation")
const logIn = require("./routes/LogIn")
app.use('/offers',offersRoute);
app.use('/signIn',signInRoute);
app.use('/emailConfirmation',emailConfirmation);
app.use('/login',logIn);
app.listen(8080, ()=> {console.log("server listening")})

