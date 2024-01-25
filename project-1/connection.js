const mongoose = require('mongoose');

async function connectMongoDB(url){
    mongoose
    .connect(url)
    .then(()=> console.log("MongoDB connected"))
    .catch((err)=> console.log("MongoDB error in connection", err))
}

module.exports = {
    connectMongoDB
}