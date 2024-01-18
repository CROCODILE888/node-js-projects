const express= require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs')

const port = 8000;

const app= express();

//middleware
app.use(express.urlencoded({extended: false}));

app.get('/users', (req, res)=>{
    const html = `
    <ul>
        ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})

//rest api point
app.get('/api/users', (req, res)=>{
     res.send(users)
})

app.route('/api/users/:id').get((req, res)=>{
    //display specific user with id
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id===id);
    if(!user) return res.status(404).json({msg: "No user found with this id"});
    res.json(user)
}).patch((req, res)=>{
    // edit/update user with id
    res.json({status: "pending"})
}).delete((req,res)=>{
    //Delete user with id
    res.json({status: "pending"})
});
// app.get('/api/users/:id',)

app.post('/api/users', (req,res)=>{
    const body = req.body;
    if(!body || !body.first_name || !body.last_name ||!body.email || !body.gender || body.job_title){
        return res.status(400).json({msg: "All fields are required"});
    }    
    users.push({id: users.length+1, ...body});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
        return res.status(201).json({status: "success", id: users.length});
    })
});

app.listen(port, ()=> console.log("Server started"))