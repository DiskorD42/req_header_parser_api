// server.js
// where your node app starts

// init project
var express = require('express');
var parser = require('ua-parser-js');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", function (req, response) {
  
 
  var ua = parser(req.headers['user-agent']);
  console.log(JSON.stringify(ua));
  var start_pos = ua.ua.indexOf('(') + 1;
  var end_pos = ua.ua.indexOf(')',start_pos);
  var os_plus = ua.ua.substring(start_pos,end_pos);
 
  var client = {
              ip_adress:  (req.headers['x-forwarded-for'] || '').split(',')[0]  || req.connection.remoteAddress,
              local : req.headers["accept-language"].split(',')[0],
              OS: os_plus
                 
  }
  
  
  response.end(JSON.stringify(client))
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
