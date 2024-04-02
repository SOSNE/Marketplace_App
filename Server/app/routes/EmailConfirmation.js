const express = require('express');
//const {GetOffersDatabase} = require("../models/DatabaseCommunication");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const {PUBLIC_KEY} = require("../../env")
const {ConfirmEmailToDataBase} = require("../models/DatabaseCommunication");
const router = express.Router()
router.use(cors())

router.get('/:token',  (req, res)=>{
    try{
        const email = jwt.verify(req.params.token, PUBLIC_KEY)
        ConfirmEmailToDataBase(email.email);
    }catch (e){
        throw e;
    }
    return res.redirect("http://localhost:5173/login")
});
module.exports = router;