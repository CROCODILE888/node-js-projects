// const http = require ('http');
// const fs = require ('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const users = require('./MOCK_DATA (1).json')

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// const users = [
//     {id: 1, username:"tahalokhandwala1303@gmail.com", password: "abcd"},
//     {id: 2, username:"lokhandwala.taha7864@gmail.com", password: "pqrst"},
//     {id: 3, username:"taha.lokhandwala@polyglotconsultants.com", password: "xyz"}
// ];

app.get('/users', (req,res)=>{
    // const html= `
    //     <ul>
    //     ${users.map((user)=>`<li>${user.username}</li>`).join("")}
    //     </ul>
    // `
    res.send(users)
})

app.listen(port,()=> console.log(`Server started at port ${port}`));