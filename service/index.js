
const axios = require('axios');

const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3030

const fs = require('fs')
const path = require('path')

server.use(jsonServer.bodyParser)
server.use(middlewares)

let countryList = [];

const loadMock = () => {
    let rawdata = fs.readFileSync(path.resolve(__dirname, 'accounts.json'));
    let accounts = JSON.parse(rawdata);
    return accounts;
}

/* preload country list from public api
data > object that contains country code element
*/
const getCountries = (data) => {
    if (!countryList.length) {
        return axios.get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                // save contry list for other country lookups
                const countries = res.data;
                countryList = countries;

                return mapCountries(data);

            }).catch(function (error) {
                console.log(error);
            })
    } else {
        return promise = new Promise((resolve) => {
            resolve( mapCountries(data) );
        });

    }
    
}

/* map out countries and pupulate country name in object
data > object that contains country code element
*/
const mapCountries = (data) => {
    const newData = data.map(e => {
        const countryElement = countryList.find(item => item.alpha2Code == e.country);
        e.countryName = countryElement.name;
        return e;
    });

    return newData;
}

server.get('/users', (request, response) => {
    if (request.method === 'GET') {


        let accounts = loadMock();
        let returnAccount = [];

        
        if (typeof request.query.mfa != 'undefined') { 
            accounts = accounts.filter(function (account) {
                if (account.mfa === request.query.mfa) {
                    return account;
                }
            });
        }


        if (typeof request.query.country != 'undefined') {
            accounts = accounts.filter(function (account) {
                if (account.country === request.query.country) {
                    return account; 
                }
            });
        }


        if (Object.keys(request.query).length === 0) {
            returnAccount = accounts;
        }


        getCountries(returnAccount).then(res => {
            response.status(200).jsonp(res)
        })


        
    }
})

server.get('/countries', (request, response) => {
    let accounts = loadMock();
    let uniqueCountries = [...new Set(accounts.map(account => account.country))]
    uniqueCountries = uniqueCountries.map(item => {
        return { 'country': item };
    });
    
    getCountries(uniqueCountries).then(res => {
        response.status(200).jsonp(res)
    })
    
})

server.get('/mfa', (request, response) => {
    let accounts = loadMock();
    let uniqueMFA = [...new Set(accounts.map(account => account.mfa))]
    uniqueMFA = uniqueMFA.filter(item => item !== "null")

    response.status(200).jsonp(uniqueMFA)
})

server.listen(port, () => {
    console.log('JSON Server is running')
})