const express = require('express');
const {GetOffersDatabase} = require("../models/DatabaseCommunication");
const cors = require("cors");
const router = express.Router()
router.use(cors())
router.get('/',  async (req, res)=>{
        const data = await GetOffersDatabase();
        res.status(200).json(data);
    }
)
module.exports = router;