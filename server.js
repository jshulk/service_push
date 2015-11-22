var express = require("express"),
	http = require("http"),
	https = require("https"),
	fs  = require("fs"),
	app = express();

var options = {
	key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

app.set('view engine', 'ejs');
app.set("views", __dirname + '/views');

app.use("/static", express.static(__dirname + "/public"));

app.get("/", function(req, res){
	res.render("index");
});

https.createServer(options, app).listen(3000, function(){
	console.log("Listing on port 3000 ");
});

