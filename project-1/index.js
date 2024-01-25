const express= require('express');

const userRouter = require('./routes/user')
const {connectMongoDB} = require ('./connection')

const port = 8000;

const app= express();

connectMongoDB('mongodb://127.0.0.1:27017/project-1');

//middleware
app.use(express.urlencoded({extended: false}));

app.use("/api/users", userRouter)

app.listen(port, ()=> console.log(`Server started at port ${port}`));