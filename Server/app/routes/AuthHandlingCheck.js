const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const {PUBLIC_KEY} = require("../../env");
const router = express.Router()
router.use(cors())
router.post('/',(req, res)=>{
    const token = req.body.text;

    try{
        //console.log(token);
        jwt.verify(token, PUBLIC_KEY);
        res.status(200).send(true)
    }catch (error){
        res.status(200).send(false)
        }
})
module.exports = router;