const express = require('express');
const {GetPhotoFromDataBase} = require("../models/DatabaseCommunication");
const cors = require("cors");

const router = express.Router()
router.use(cors())

router.post('/',async (req, res)=>{
    //console.log(req.body.PhotoID);
    const PhotoID = await req.body.PhotoID;
    const photo = await GetPhotoFromDataBase(PhotoID);
    res.status(200).json(photo);
});
module.exports = router;