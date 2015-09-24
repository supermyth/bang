var ServerActionCreator = require('../actions/ServerActionCreator');
var Constants = require('../constants/Constants');
var request = require('superagent');
var urlencode = require('urlencode');


var WebAPI = {
    getPaperIndex: function(_query) {
        var encodedQuery = urlencode(_query);

        request
            .get(Constants.API.GET_PAPER_INDEX)
            .query({query: encodedQuery})
            .set('API-Key', 'GET_PAPER_INDEX')
            .set('Accept', 'application/json')
            .end(function(err,res) {
                if (err) {}
                else {
                    ServerActionCreator.receivePaperIndex(res.body.paperIndex);
                }
            });
    },

    getPapers: function(_paperIndex) {
        console.log("PaperIndex", _paperIndex);

        request
            .post(Constants.API.GET_PAPERS)
            .send({paperIndex: _paperIndex})
            .set('API-Key', 'GET_PAPERS')
            .set('Accept', 'application/json')
            .end(function(err,res) {
                if (err) {}
                else {
                    ServerActionCreator.receivePapers(res.body.papers);
                }
            });
    }
};

module.exports = WebAPI;