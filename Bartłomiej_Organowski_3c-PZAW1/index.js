const http = require('http');//pozwala tworzyc serwer http
const fs = require('fs');//file systrem (do pracy na plikach[favicon])
const path = require('path');//obsluga sciezek (C:\nazwa\cos\xpp...)

const PORT = 8000;

const serwer = http.createServer((req, res) => {
    if(req.url === '/'){
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
                <html>
                    <head>
                        <title> PZAW 1 </title>
                    </head>
                    <body style="font-family: sans-serif; text-align: center; padding: 50px;">
                        <h1> Strona PZAW1 </h1>
                    </body>
                </html>
            `);
    }else if(req.url === '/favicon.ico'){
        const faviconPath = path.join(__dirname, 'favicon.ico');
        fs.readFile( faviconPath, (err, data) => {
            if(err){
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('err 001 brak favicon.ico');
            } else{
                res.writeHead(200, {'Content-Type': 'image/vnd.microsoft.icon'});
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('err 002 - nie znaleziono');
    }
});

serwer.listen(PORT, () => {
    console.log(`serwer dziala na porcie http://localhost:${PORT}`);
});

