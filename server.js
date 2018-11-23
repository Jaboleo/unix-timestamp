// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require("moment");
var app = express();


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/:date', function(req,res){
	var date = req.params.date;
	var checkUNIX = parseInt(date);
	var unixDate, naturalDate;
	var returnJSON = {};
	if(Date.parse(date)>0 || checkUNIX>0){
		// In case input value is natural language date
		if(Date.parse(date)>0){
			naturalDate = date;
			unixDate = Date.parse(date)/1000;
		}
		// In case input value is UNIX timestamp
		else if(checkUNIX >0){
			unixDate = date;
			var unix = parseInt(date)*1000
			var d = new Date(unix);
			naturalDate = moment(unix).format("MMMM DD ,YYYY");
		}
		// Prepare array for return
		returnJSON.unix = unixDate;
		returnJSON.natural = naturalDate
		res.send(JSON.stringify(returnJSON));
	}
	else{
		returnJSON.unix = "NaN";
		returnJSON.natural = "Nan";
		res.send(JSON.stringify(returnJSON));
	}
	

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
