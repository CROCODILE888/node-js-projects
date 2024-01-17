const http = require('http');
const fs= require ('fs')
const url= require('url')

const myServer = http.createServer((req, res)=>{
    const log=`${Date.now()}: ${req.url} New request received.\n`;
    if (req.url==="/favicon.ico") return res.end();
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile('log.txt', log, (err,data)=>{
        switch(myUrl.pathname){
            case '/':
                res.end("Home page");
                break;
            case '/about':
                const user = myUrl.query.myName;
                res.end(`Hey ${user}`);
                break;
            default: 
            res.end("404, Not found");
        }
        
    })
    // console.log(req.headers);
    
});

myServer.listen(8000, ()=>console.log("server started"))