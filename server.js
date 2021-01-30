const http = require('http')
const fs = require('fs')
const path = require('path');

function getUpperPath(path) {
    let idx = -1;
    const lastPos = path[path.length - 1] == '/' ? path.length - 1 : path.length;
    for (let i = 0; i < lastPos; i++) {
        if (path[i] == '/')
            idx = i;
    }
    if (idx == -1) return "";
    return path.slice(0, idx);
}

const server = http.createServer((req, res) => {
    const baseUrl = `http://localhost:${port}/`;
    try {
        const filePath = path.join('.', req.url)

        const date = new Date();
        console.log(date.toISOString(), filePath);

        if (filePath == "favicon.ico") {
            return;
        }

        if (fs.lstatSync(filePath).isDirectory()) {
            const files = fs.readdirSync(filePath);
            let response = `<div style="padding: 30px;"> Current path: ${filePath}</br>`;
            response += `<a href="${baseUrl}/${getUpperPath(filePath)}">..</a></br>`;
            files.forEach(file => {
                response += `<a href="${baseUrl}/${filePath}/${file}">${file}</a></br>`
            })
            response += "</div>"

            res.write(response);
            return;
        }

        res.setHeader('Access-Control-Allow-Origin', '*');

        if (filePath.includes(".html")) {
            res.setHeader('Content-Type', 'text/html');
            file = fs.readFileSync(filePath, 'utf-8')
            res.write(file)
        } else if (filePath.includes(".js")) {
            res.setHeader('Content-Type', 'text/javascript');
            file = fs.readFileSync(filePath, 'utf-8')
            res.write(file)
        } else if (filePath.includes(".wasm")) {
            res.setHeader('Content-Type', 'application/wasm');
            file = fs.readFileSync(filePath)
            res.write(file)
        } else if (!(filePath == "favicon.ico")) {
            file = fs.readFileSync(filePath, 'utf-8')
            res.write(file)
        }

        res.end();
    } catch (e) {
        console.log(e);
    }
});

const port = 8081;
console.log(`Running server on port: ${port}`);
server.listen(port);