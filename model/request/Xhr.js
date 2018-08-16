const http = require("http");
const https = require("https");

getJSON = (options, onResult) => {

    const protocol = options.port == 443 ? https : http;

    const req = protocol.request(options, (res) => {
        let output = '';
        res.setEncoding('utf8');

        res.on('data', (chunk) => { output += chunk });
        res.on('end', () => onResult(res.statusCode, JSON.parse(output)));
    });

    req.end();
};

exports.get = (req, res) => {
    const options = {
        "method": "GET",
        "hostname": "127.0.0.1",
        "port": "1202",
        "path": "/categories",
        "headers": {
            "Cache-Control": "no-cache",
            'Content-Type': 'application/json'
        }
    };

    getJSON(options, (statusCode, result) => {
        res.send(result);
    });

}