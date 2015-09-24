var db = require('../db');

exports.doRoutes = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/admin', function(req,res) {
        res.render('./admin/admin.ejs');
    });

    require('./api/admin').doRoutes(app);
    require('./api/paper').doRoutes(app);
};
