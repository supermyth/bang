var mongoose = require('mongoose');
var PaperSchema = require('./models/Paper');

mongoose.connect('mongodb://localhost:27017/bang');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongoDB connection error:'));
db.once('open', function callback () {
    console.log("mongoDB connection OK.");
});

mongoose.model('Paper', PaperSchema, 'Papers');

module.exports = mongoose;