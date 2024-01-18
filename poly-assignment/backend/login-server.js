const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
// const bcrypt = require ('bcrypt');
// const jwt = require ('jsonwebtoken');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// const users = [
//     {id: 1, username:"tahalokhandwala1303@gmail.com", password: "abcd"},
//     {id: 2, username:"lokhandwala.taha7864@gmail.com", password: "pqrst"},
//     {id: 3, username:"taha.lokhandwala@polyglotconsultants.com", password: "xyz"}
// ];
const hardUsername = "taha";
const hardPassword = "abcd";

app.post('/login', (req, res)=>{
    const {username, password}=req.body;

    if(hardUsername === username && hardPassword === password){
        res.status(200).json({success: true, message: 'Login successful'})
    } else {
        res.status(401).json({success: false, message: 'Invalid username or password'})
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})