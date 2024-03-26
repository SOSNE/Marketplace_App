const express = require('express');
//const {GetOffersDatabase} = require("../models/DatabaseCommunication");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const {ConfirmEmailToDataBase} = require("../models/DatabaseCommunication");
const router = express.Router()
router.use(cors())
const SECRET = "ENucETfq44KXsFta7Vp3giOCbKWpeaBv"
router.get('/:token',  (req, res)=>{
    try{
        const email = jwt.verify(req.params.token, SECRET)
        ConfirmEmailToDataBase(email.email);
    }catch (e){
        throw e;
    }
    return res.redirect("http://localhost:5173/login")
});
module.exports = router;