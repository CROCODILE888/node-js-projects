const fs = require ('fs')
const os = require ('os')

// fs.writeFileSync("./test.txt", "Hello World")

// fs.writeFile('./test.txt', "Hello world async", (err)=>{})

// const result= fs.readFileSync("./contact.txt", "utf-8");
// console.log(result)

// fs.readFile("./contact.txt", "utf-8", (err, result) =>{
//     if(err){
//         console.log("error", err);
//     }
//     else{
//         console.log(result);
//     }
// });

// fs.appendFileSync("./test.txt", `${Date.now()} hey there\n`)

// fs.cpSync("./test.txt", "./copy.txt")

// fs.unlinkSync("./copy.txt")

console.log(os.cpus().length)