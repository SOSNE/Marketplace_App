const express = require('express');
const {GetUserInfoFromDataBase, AddNewOfferToDatabase} = require("../models/DatabaseCommunication");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {PUBLIC_KEY} = require("../../env");

const router = express.Router()
router.use(cors())

router.post('/',async (req, res)=>{
    const tokenData = req.body;

    try{
        const UserId = jwt.verify(tokenData.token, PUBLIC_KEY).UserId;
        const userInfoData = await GetUserInfoFromDataBase(UserId)
        res.status(200).send({userInfoData})
    }catch(err){
        throw err;
    }
});
module.exports = router;