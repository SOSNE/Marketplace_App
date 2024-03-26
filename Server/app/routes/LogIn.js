const express = require('express');
const {LogInDataFromDataBase} = require("../models/DatabaseCommunication");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const {SECRET} = require("../../env")
const {ConfirmEmailToDataBase} = require("../models/DatabaseCommunication");
const router = express.Router()
router.use(cors())

router.post('/',  (req, res)=>{
    const email = req.body.email;
    const selectedPassword = req.body.password;
    const password = LogInDataFromDataBase(email);
    if (selectedPassword === password){
        const token = jwt.sign({email}, SECRET, { expiresIn: '30d' })
        const dataObject ={
            token: token,
            email: email

        }
        res.status(200).send
    }

});
module.exports = router;