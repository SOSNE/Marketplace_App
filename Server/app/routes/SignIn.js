const cors = require("cors");
const express = require("express");
const {GetSignInDataFromDatabase} = require("../models/DatabaseCommunication");
const router = express.Router()
router.use(cors())

router.post('/',async (req, res)=>{
    const signInDataBaseData = await GetSignInDataFromDatabase()
    console.log('Received data:', req.body, signInDataBaseData);
    if(signInDataBaseData.some(obj => obj.Email === req.body.email && obj.email_confirmed == 1)){
        return res.status(200).send("user with this email exist");
    }
    if(signInDataBaseData.some(obj => obj.Username === req.body.nickName && obj.email_confirmed == 1)){
        return res.status(200).send("user with this nickName exist");
    }
    res.status(200).send("new user added");
}
)
module.exports = router;