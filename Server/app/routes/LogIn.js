const express = require('express');
const {LogInDataFromDataBase} = require("../models/DatabaseCommunication");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require("../../env")
const {ConfirmEmailToDataBase} = require("../models/DatabaseCommunication");
const router = express.Router()
router.use(cors())

router.post('/',  async (req, res)=>{
    const email = req.body.email;
    const selectedPassword = req.body.password;
    const userData = await LogInDataFromDataBase(email);
    if (userData.length >0 && selectedPassword === userData[0].Password){
        console.log(email, selectedPassword, userData[0].Password);
        const token = jwt.sign({email}, SECRET_KEY, { expiresIn: '30d' , algorithm: 'RS256'})
        const dataObject ={
            token: token,
            email: email,
            username: userData[0].Username,
            firstname: userData[0].firstname,
            lastname: userData[0].lastname,
            gender: userData[0].gender,
            dateOfBirth: userData[0].dateOfBirth,
        }
        res.status(200).json(dataObject);
    }else {
        res.status(200).send({text:"error while login"});
        console.log(email, selectedPassword);
    }
});
module.exports = router;