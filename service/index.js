const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3030

const fs = require('fs')
const path = require('path')

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.get('/users', (request, response) => {
    if (request.method === 'GET') {

        let rawdata = fs.readFileSync(path.resolve(__dirname, 'accounts.json'));
        let accounts = JSON.parse(rawdata);
        response.status(200).jsonp(accounts)
    }
})

server.listen(port, () => {
 console.log('JSON Server is running')
})