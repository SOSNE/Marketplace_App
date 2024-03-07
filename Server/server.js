const express = require('express');
const cors = require('cors');

const app = express()
app.use(cors())

let data = [
    {
       name: "Łukasz",
       surname: "knapczyk",
    },
    {
        name: "Łukasz",
        surname: "knapczyk",
    },
    {
        name: "Łukasz",
        surname: "knapczyk",
    }
]
app.get('/offers', (get,post)=>{
    return post.json(data);
    }
)

app.listen(8080, ()=> {console.log("server listening")})