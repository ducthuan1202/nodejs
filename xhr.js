const http = require("http");
const https = require("https");

exports.getJSON = (options, onResult) => {

    const protocol = options.port == 443 ? https : http;

    const req = protocol.request(options, (res) => {
        let output = '';
        res.setEncoding('utf8');

        res.on('data', (chunk) => { output += chunk });
        res.on('end', () => onResult(res.statusCode, JSON.parse(output)));
    });

    req.end();
};