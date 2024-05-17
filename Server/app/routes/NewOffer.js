const express = require('express');
const cors = require("cors");
const {AddNewOfferToDatabase} = require("../../app/models/DatabaseCommunication");
const jwt = require("jsonwebtoken");
const {PUBLIC_KEY} = require("../../env");

const router = express.Router()
router.use(cors())

router.post('/',async (req, res)=>{
    //console.log(req.body)
    const newOfferData = req.body;
    const UserId= jwt.verify(newOfferData.token, PUBLIC_KEY);
    console.log(UserId);
    try{
        await AddNewOfferToDatabase(UserId.UserId, newOfferData.price,
            newOfferData.description, newOfferData.productName, newOfferData.photoString);
    }catch(err){
       return res.status(200).send({status:false});
    }
    res.status(200).send({status:true})
})
module.exports = router;