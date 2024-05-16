const express = require('express');
const {GetUserInfoFromDataBase, AddNewOfferToDatabase} = require("../models/DatabaseCommunication");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {PUBLIC_KEY} = require("../../env");
const {UpdateUserInfo} = require("../../app/models/DatabaseCommunication");

const router = express.Router()
router.use(cors())

router.post('/',async (req, res)=>{
    console.log(req.body);
    const tokenData = req.body.token;
    const userInfoData = req.body.infoData;
    try{
        const UserId = jwt.verify(tokenData, PUBLIC_KEY).UserId;
        console.log(UserId);
        UpdateUserInfo(UserId, userInfoData.FirstName, userInfoData.LastName, userInfoData.DateOfBirth, userInfoData.Gender, userInfoData.PhoneNumber)
        res.status(200).send(true)
    }catch(err){
        res.status(200).send(false)
        throw err;
    }
});
module.exports = router;