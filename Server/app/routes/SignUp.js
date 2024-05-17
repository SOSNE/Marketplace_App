const cors = require("cors");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const express = require("express");
const {GetSignUpDataFromDatabase, SignUpDataBase} = require("../models/DatabaseCommunication");
const {EMAIL, EMAIL_PASSWORD, SECRET_KEY} = require("../../env")
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
    const signInDataBaseData = await GetSignUpDataFromDatabase()
    const email = req.body.email;
    const username = req.body.nickName;
    console.log('Received data:', req.body, signInDataBaseData);
    if(signInDataBaseData.some(obj => obj.Email === email && obj.email_confirmed == 1)){
        console.log("wrong email");
        return res.status(200).send({status:false});
    }
    if(signInDataBaseData.some(obj => obj.Username === username && obj.email_confirmed == 1)){
        console.log("wrong username")
        return res.status(200).send({status:false});
    }
        SignUpDataBase(username, email, req.body.password)

        jwt.sign({email}, SECRET_KEY, { expiresIn: '1h', algorithm: 'RS256' }, (err, token) => {
            const url = `http://localhost:8080/emailConfirmation/${token}`;
            transporter.sendMail({
                from: EMAIL,
                to: email,
                subject: "Email Confirmation",
                html: `Click confirm to confirm email: <a href=${url}>confirm</a>`
            }, (err,res)=>{
                if(err){
                    res.status(200).send({status:false});
                }
            })
           if(err){
               res.status(200).send({status:false});
           }
        });
    /*try {

    }catch(err) {
        res.status(200).send("error with adding new user");
    }*/
        res.status(200).send({status:true});
}
)
module.exports = router;