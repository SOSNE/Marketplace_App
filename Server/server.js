const express = require('express');
//const cors = require('cors');

const app = express()
//app.use(cors())

app.get('/', (get,post)=>{
    return post.json("hello");
    }
)
app.listen(8081, ()=> {console.log("server listening")})