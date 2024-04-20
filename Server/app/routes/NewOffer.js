const express = require('express');
const cors = require("cors");
const {AddNewOfferToDatabase} = require("../../app/models/DatabaseCommunication");

const router = express.Router()
router.use(cors())

router.post('/',async (req, res)=>{
    console.log(req.body)
    //email, price, description, productName, photoString
    const newOfferData = req.body;
   await AddNewOfferToDatabase(newOfferData.userEmail, newOfferData.price,
        newOfferData.description, newOfferData.productName, newOfferData.photoString);
    res.status(200).send({text:"ok"})
})
module.exports = router;