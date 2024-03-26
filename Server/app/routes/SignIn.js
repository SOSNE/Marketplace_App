const cors = require("cors");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const express = require("express");
const {GetSignInDataFromDatabase, SignInDataBase} = require("../models/DatabaseCommunication");
const {EMAIL, EMAIL_PASSWORD, SECRET} = require("../../env")
const router = express.Router()
router.use(cors())


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    },
});

router.post('/',async (req, res)=>{
    const signInDataBaseData = await GetSignInDataFromDatabase()
    const email = req.body.email;
    const username = req.body.nickName;
    console.log('Received data:', req.body, signInDataBaseData);
    if(signInDataBaseData.some(obj => obj.Email === email && obj.email_confirmed == 1)){
        return res.status(200).send("user with this email exist");
    }
    if(signInDataBaseData.some(obj => obj.Username === username && obj.email_confirmed == 1)){
        return res.status(200).send("user with this nickName exist");
    }
        SignInDataBase(username, email, req.body.password)

       jwt.sign({email}, SECRET, { expiresIn: '1h' }, (err, token) => {
            const url = `http://localhost:8080/emailConfirmation/${token}`;
            transporter.sendMail({
                from: EMAIL,
                to: email,
                subject: "Email Confirmation",
                html: `Click confirm to confirm email: <a href=${url}>confirm</a>`
            }, (err,res)=>{
                if(err){
                    throw err;
                }
            })
           if(err){
               throw err;
           }
        });
    /*try {

    }catch(err) {
        res.status(200).send("error with adding new user");
    }*/
    res.status(200).send("new user added");
}
)
module.exports = router;