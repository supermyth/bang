var express = require('express');
var bodyParser = require('body-parser');

var routes = require('./server/routes/index');

var app = express();
app.engine('.ejs', require('ejs').__express);
app.set('views', __dirname + '/build/html');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

routes.doRoutes(app);

app.listen(8888);
console.log("Running at Port 8888");
