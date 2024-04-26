const express = require('express');
const {GetOffersDatabase, GetPhotoFromDataBase} = require("../models/DatabaseCommunication");
const cors = require("cors");
const router = express.Router()
router.use(cors())
router.get('/',  async (req, res)=>{
        const data = await GetOffersDatabase();
    const promises = data.map(async (item) => {
        // Wait for the photo to be retrieved
        item.PhotoString = await GetPhotoFromDataBase(item.PhotoId[0].PhotoId);
        return item;
    });
    const newData = await Promise.all(promises);
    //console.log(newData);
    res.status(200).json(newData);
    }
)
module.exports = router;