const url = require('url')
const fs = require('fs')
const path = require('path')

function getContentType(url) {
    let contentExtension = path.extname(url);

    switch (contentExtension) {
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        case '.ico':
            return 'image/x-icon';
        case '.html':
            return 'text/html';
        case '.jpg':
        case '.jpeg':
        case '.gif':
        case '.png':
            return 'image/jpeg';
        default:
            return 'text/plain';
    }
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    if (req.pathname.startsWith('/content/') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, `../${req.pathname}`))

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.WriteHead(404, {
                    'Content-Type': 'text/plain'
                })

                res.write('Resource not found!')
                res.end()
                return
            }

            res.writeHead(200, {
                'Content-Type': getContentType(req.pathname)
            })
            res.write(data)
            res.end()
            return
            //TODO: Send data and end response
        })
    } else {
        return true
    }
}