// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// Request Header Parser Microservice
// Reference: http://expressjs.com/en/guide/behind-proxies.html
app.enable("trust proxy");
app.get("/api/whoami", function (req, res) {
  res.json({
    // With "trust proxy" set, req.ip should use first address in 
    // XFF header if available, otherwise use connection.remoteAddress
    ipaddress: req.ip || req.connection.remoteAddress,
    language:  req.get("Accept-Language"),
    software:  req.get("User-Agent")
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
