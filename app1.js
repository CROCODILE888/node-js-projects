const http= require('http');
const fs=require('fs');

const server=http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;
    // console.log(url, method);
    if (url==='/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>First Page</title></head>')
        res.write('<body><h1>HEY THERE!</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"/> <button type="submit">Submit</button></form>')
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url==='/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>List of Users</title></head>')
        res.write('<body><ul> <li>Taha</li><li>Batul</li><li>Burhanuddin</li></ul></body>');
        res.write('</html>');
        return res.end();
    }
    if (url==='/create-user' && method==='POST') {
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        return req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            console.log(parsedBody);
            const uname=parsedBody.split('=')[1];
            console.log(uname);
            fs.writeFile('data.txt', parsedBody, (err)=>{
                res.statusCode = 302;
                res.setHeader('Location', '/users');
                return res.end();
            });
            
        });
    }

});
server.listen(3000);