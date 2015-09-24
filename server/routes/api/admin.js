var db = require('../../db');
var Paper = db.model('Paper');

var Constants = require('../../../src/js/constants/Constants');
var mongoose = require('mongoose');


exports.doRoutes = function(app) {
    app.get(Constants.API.ADMIN_GET_PAPERS, getPapers);
    app.post(Constants.API.ADMIN_POST_PAPER, postPaper);
    app.post(Constants.API.ADMIN_DELETE_PAPER, deletePaper);
};

var getPapers = function(req,res) {
    Paper.find({}, function(err, docs) {
        if (err) { res.send(err); console.log(err); return; }

        var _papers;

        if (docs == null) { _papers = null; }
        else {
            _papers = docs;
        }

        res.send({papers: _papers});
    });
};

var deletePaper = function(req,res) {
    var paperId = req.body.paperId;

    Paper.find({_id: paperId}).remove(function(err,result) {
        if (err) { console.log("ERROR in 페이퍼 삭제할 때", err); }
    });

    res.end();
};

var postPaper = function(req,res) {
    var isNew = req.body.isNew;
    var paper = req.body['paper'];

    if (isNew) {
        var newPaper = new Paper({
            'title': paper['title'],
            'type': paper['type'],
            'data': _createNewPaperData(paper)
        });

        newPaper.save(function(err, doc) {
            if (err) { res.send(err); console.log("ERROR in 새로운 페이퍼 저장할 때", err); next(err); }
            res.end();
        });
    }
    else {
        var updateData = _createNewPaperData(paper);

        Paper.findOneAndUpdate(
            {_id: mongoose.Types.ObjectId(paper['_id'])},
            {
                $set: {
                    'title': paper['title'],
                    'data': updateData
                }
            },
            function(err, doc) {
                if (err) { res.send(err); console.log("ERROR in 기존의 페이퍼 업데이트 할 때", err); }
                res.end();
            });
    }
};



function _createNewPaperData(paper) {
    var _data;

    switch(paper['type']) {
        case Constants.PaperType.POST:
            _data = {
                'titleId': paper.data['titleId'],
                'title-image': paper.data['title-image'],
                'sub-title': paper.data['sub-title'],
                'text': paper.data['text'],
                'views': (paper.data.hasOwnProperty('views')) ? paper.data['views'] : 0,
                'tags': __createTags(paper.data['tags'])
            };
            return _data;

        case Constants.PaperType.ABOUT:
            _data = {
                'main': paper.data['main'],
                'tags': __createTags(paper.data['tags'])
            };
            return _data;

        case Constants.PaperType.PRODUCT:
            _data = {
                'released': new Date(paper.data['released']),
                'icon': paper.data['icon'],
                'summary': paper.data['summary'],
                'tags': __createTags(paper.data['tags'])
            };
            return _data;

        case Constants.PaperType.PROJECT:
            _data = {
                'progress': paper.data['progress'],
                'summary': paper.data['summary'],
                'tags': __createTags(paper.data['tags'])
            };
            return _data;

        case Constants.PaperType.APP:
            _data = {
                'main': paper.data['main']
            };
            return _data;
    }
}

function __createTags(protoTags) {
    var _tags = [];
    for (var idx= 0, len= protoTags.length; idx<len; idx++) {
        var _tag = {
            'title': protoTags[idx]
        };
        _tags.push(_tag);
    }
    return _tags;
}
