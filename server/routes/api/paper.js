var db = require('../../db');
var Paper = db.model('Paper');

var Constants = require('../../../src/js/constants/Constants');
var mongoose = require('mongoose');
var async = require('async');
var urlencode = require('urlencode');


exports.doRoutes = function(app) {
    app.get(Constants.API.GET_PAPER_INDEX, getPaperIndex);
    app.post(Constants.API.GET_PAPERS, getPapers);
};


var getPaperIndex = function(req,res) {
    var query = urlencode.decode(req.query.query);
    console.log("query", query);

    Paper.find({}, function(err, docs) {
        if (err) { res.send(err); console.log(err); return; }

        var _paperIndex = [];
        for (var idx= 0, len=docs.length; idx<len; idx++) {
            _paperIndex.push(docs[idx]._id);
        }

        res.send({paperIndex: _paperIndex});
    })
};

var getPapers = function(req,res) {
    var paperIndex = req.body.paperIndex;
    console.log(paperIndex);

    var _papers = [];

    async.waterfall([
        function(callback) {
            for (var idx= 0, len=paperIndex.length; idx<len; idx++) {
                Paper.find({_id: mongoose.Types.ObjectId(paperIndex[idx])}, function(err, doc) {
                    if (err) { res.send(err); console.log(err); return; }

                    _papers.push(doc[0]);
                    callback(null);
                });
            }
        },

        function(callback) {
            if (_papers.length == paperIndex.length) {
                res.send({papers: _papers});
                callback();
            }
            else return;
        }
    ]);
};