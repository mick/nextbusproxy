var request = require("request");
var express = require("express");
var app = express.createServer();
var fs = require("fs");


app.use(express.bodyParser());
app.use(express.logger({ format: ':method :url' }));

var base_url = (process.env.BASE_URL ? process.env.BASE_URL : "http://webservices.nextbus.com")

app.all('*', function(req, res, next) {
  // allow request from other sites with cors
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


app.all('*', function(req, resp){
  var url = req.originalUrl;
  console.log("url", url);
  var requesturl = base_url+url //base_url + req._parsedUrl.pathname;

  console.log(requesturl);
  // need to strip jsonp arg.
  
  //console.log(req._parsedUrl.pathname);
  //console.log(req.query);
  callback = null;
  query = {};
  for (q in req.query){
    //console.log("q", q);
    if(q == "callback"){
      callback = req.query[q];
    }else{
      query[q] =req.query[q];
    }
  }
  qstr = "?"
  qstr_parts = []
  for(q in query){
    qstr_parts.push(q+"="+encodeURIComponent(query[q]));
  }
  qstr += qstr_parts.join("&");
  console.log("request", requesturl+qstr)
  var pxreq = request({uri:requesturl+qstr, method:req.method, headers:req.header}, function(error, response, body){
    if(callback)
      body = callback+"("+body+")"
    resp.send(body);
  });

});

var port = process.env.PORT || 3006;
app.listen(port, function() {
  console.log("Listening on " + port);
});



