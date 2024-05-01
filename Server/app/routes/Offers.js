const express = require('express');
const {GetOffersDatabase, GetPhotoFromDataBase} = require("../models/DatabaseCommunication");
const cors = require("cors");
const router = express.Router()
router.use(cors())

function generateSimilarWords(word) {
    const similarWords = [];
    similarWords.push(word);
    // Generate similar words by adding one character
    for (let i = 0; i <= word.length; i++) {
        for (let j = 97; j <= 122; j++) {
            const newWord = word.slice(0, i) + String.fromCharCode(j) + word.slice(i);
            similarWords.push(newWord);
        }
    }

    // Generate similar words by removing one character
    for (let i = 0; i < word.length; i++) {
        const newWord = word.slice(0, i) + word.slice(i + 1);
        similarWords.push(newWord);
    }

    // Generate similar words by replacing one character
    for (let i = 0; i < word.length; i++) {
        for (let j = 97; j <= 122; j++) {
            const newWord = word.slice(0, i) + String.fromCharCode(j) + word.slice(i + 1);
            similarWords.push(newWord);
        }
    }

    return similarWords;
}


async function ProcessIncomingSearch(inputValue){
    const search = inputValue.search.prop;
    if(search === ""){
        return await GetOffersDatabase();
    }else {
        const data = await GetOffersDatabase();
        const keyWords = generateSimilarWords(search);
        //keyWords.forEach((word) => {console.log(word);})
        console.log(keyWords);
        return data.filter((object)=>{
            return keyWords.includes(object.ItemName.substring(0, search.length));
        });
        // return data.filter((object)=>{return keyWords.forEach((word)=>{
        //     return (object.ItemName.substring(0, word.length) === word)
        // })
        // });
    }
}
router.post('/',  async (req, res)=>{
    console.log(req.body);
    const data = await ProcessIncomingSearch(req.body);
    console.log(data);
    if(data != null){
        const promises = data.map(async (item) => {
            item.PhotoString = await GetPhotoFromDataBase(item.PhotoId[0].PhotoId);
            return item;
        });
        const newData = await Promise.all(promises);
         res.status(200).json(newData);
    }else res.status(400).json({ error: 'Invalid data provided' });
    }
)
module.exports = router;