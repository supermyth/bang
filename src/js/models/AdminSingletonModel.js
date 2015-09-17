var Constants = require('../constants/Constants');
var request = require('superagent');
var Remarkable = require('remarkable');
var md = new Remarkable({
    html:         true,
    xhtmlOut:     false,
    breaks:       true,
    langPrefix:   'language-',
    linkify:      false,
    typographer:  false,
    quotes: '“”‘’'
});


var PaperListDOM;
var Template;
var PostPaperDOM;
var AboutPaperDOM;
var ProductPaperDOM;
var ProjectPaperDOM;
var AppDOM;

var PaperList = [];


var AdminSingletonModel = {
    initialize: function ($, currentPage) {
        switch (currentPage.page) {
            case Constants.CurrentPage.ADMIN:
                break;

            default:
                return;
        }

        PaperListDOM = $('#PAPER_LIST');
        Template = $('#Template');

        PostPaperDOM = $('#ADMIN_POST').clone();
        $('#ADMIN_POST').remove();
        PostPaperDOM.removeAttr('id');
        PostPaperDOM.css({
            display: '-webkit-box',
            display: '-webkit-flex',
            display: '-moz-box',
            display: '-ms-flexbox',
            display: 'flex'
        });

        $('#submit').on('click tap', function() {
            var index = Template.find('.promote').attr('idx');
            this.submitPaper(index);
        }.bind(this));

        $('#delete').on('click tap', function() {
            var index = Template.find('.promote').attr('idx');
            this.deletePaper(index);
        }.bind(this));

        this.requestPapers();
    },

    requestPapers: function() {
        request
            .get(Constants.API.ADMIN_GET_PAPERS)
            .set('API-Key', 'ADMIN_GET_PAPERS')
            .set('Accept', 'application/json')
            .end(function(err,res) {
                if (err) { console.log(err); }
                else {
                    console.log("hello");
                    this.recivePapers(res.body.papers);

                    $('.add-btn').on('click tap', function(event) {
                        this.addNewItem($(event.target).attr('id'));
                    }.bind(this));
                }
            }.bind(this));
    },

    recivePapers: function(papers) {
        PaperListDOM.empty();
        Template.empty();

        if (papers.length == 0) {
            return;
        }
        PaperList = papers;

        for (var idx= 0, len=PaperList.length; idx<len; idx++) {
            var item = "<span class='paper-item' idx=" + idx + ">" + PaperList[idx].title + "</span>";
            PaperListDOM.append(item);
        }

        PaperListDOM.children().on("click tap", function(event) {
             this.selectItem($(event.target).attr('idx'));
        }.bind(this));

        this.selectItem(0);
    },


    addNewItem: function(btnId) {
        var newPaper = {};

        switch(btnId) {
            case 'btn_AddPostPaper':
                newPaper = {
                    'title': '새로운 Post 페이퍼',
                    'type': Constants.PaperType.POST,
                    'data': {
                        'titleId': '',
                        'text': '',
                        'title-image' : '',
                        'tags': []
                    },
                    'isNew': true
                };
                break;

            case 'btn_AddAboutPaper':
                newPaper = {
                    'title': '새로운 About 페이퍼',
                    'type': Constants.PaperType.ABOUT,
                    'data': {
                        'main': '',
                        'tags': []
                    },
                    'isNew': true
                };
                break;

            case 'btn_AddProductPaper':
                newPaper = {
                    'title': '새로운 Product 페이퍼',
                    'type': Constants.PaperType.PRODUCT,
                    'data': {
                        'released': '',
                        'icon': '',
                        'summary': '',
                        'tags': []
                    },
                    'isNew': true
                };
                break;

            case 'btn_AddProjectPaper':
                newPaper = {
                    'title': '새로운 Project 페이퍼',
                    'type': Constants.PaperType.PROJECT,
                    'data': {
                        'progress': 0,
                        'summary': '',
                        'tags': []
                    },
                    'isNew': true
                };
                break;

            case 'btn_AddAppPaper':
                newPaper = {
                    'title': '새로운 APP 페이퍼',
                    'type': Constants.PaperType.APP,
                    'data': {
                        'main': ''
                    },
                    'isNew': true
                };
                break;
        }

        var lastLength = PaperList.length;
        PaperList[lastLength] = newPaper;

        var item = "<span class='paper-item' idx=" + lastLength + ">" + newPaper.title + "</span>";
        PaperListDOM.append(item);

        PaperListDOM.children().on("click tap", function(event) {
            this.selectItem($(event.target).attr('idx'));
        }.bind(this));

        this.selectItem(lastLength);
    },

    selectItem: function(index) {
        Template.empty();

        PaperListDOM.children().removeClass('selected');
        PaperListDOM.find('[idx=' + index + ']').addClass('selected');

        switch(PaperList[index].type) {
            case Constants.PaperType.POST:
                Template.append(PostPaperDOM.clone().attr('idx', index));
                var adminPost = Template.find('.admin-post');

                adminPost.find('#post-input-title').val(PaperList[index].title);
                adminPost.find('#post-input-titleId').val(PaperList[index].data['titleId']);
                adminPost.find('#post-input-text').val(PaperList[index].data['text']);
                adminPost.find('#post-input-title-image').val(PaperList[index].data['title-image']);

                for (var idx=0; idx<PaperList[index].data['tags'].length; idx++) {
                    adminPost.find('#post-input-tags').val(adminPost.find('#post-input-tags').val() + PaperList[index].data['tags'][idx].title);
                    if (idx != PaperList[index].data['tags'].length - 1) {
                        adminPost.find('#post-input-tags').val(adminPost.find('#post-input-tags').val() + ',');
                    }
                }

                adminPost.find('.preview').html(md.render(adminPost.find('#post-input-text').val()));

                adminPost.find('#post-input-text').on('input change', function() {
                    var text = $(this).val();
                    adminPost.find('.preview').html(md.render(text));
                });
                break;

            case Constants.PaperType.ABOUT:
                break;

            case Constants.PaperType.PRODUCT:
                break;

            case Constants.PaperType.PROJECT:
                break;

            case Constants.PaperType.APP:
                break;
        }
    },

    submitPaper: function(index) {
        var paperDOM = Template.find('[idx=' + index + ']');
        var isNew = PaperList[index].hasOwnProperty('isNew') ? true : false;

        switch(PaperList[index]['type']) {
            case Constants.PaperType.POST:
                var tags = paperDOM.find('#post-input-tags').val().split(',');

                PaperList[index].title = paperDOM.find('#post-input-title').val();
                PaperList[index].data = {
                    'titleId': paperDOM.find('#post-input-titleId').val(),
                    'text': paperDOM.find('#post-input-text').val(),
                    'title-image' : paperDOM.find('#post-input-title-image').val(),
                    'tags': tags,
                    'like': PaperList[index].data['like'],
                    'views': PaperList[index].data['views']
                };
                break;

            case Constants.PaperType.ABOUT:
                break;

            case Constants.PaperType.PRODUCT:
                break;

            case Constants.PaperType.PROJECT:
                break;

            case Constants.PaperType.APP:
                break;
        }

        request
            .post(Constants.API.ADMIN_POST_PAPER)
            .send({isNew: isNew, paper: PaperList[index]})
            .set('API-Key', 'ADMIN_POST_PAPERS')
            .set('Accept', 'application/json')
            .end(function(err,res) {
                if (err) { console.log(err); }
                else {
                    this.requestPapers();
                }
            }.bind(this));
    },

    deletePaper: function(index) {
        if (PaperList[index].hasOwnProperty('isNew')) {
            if (PaperList[index].isNew == true) {
                alert("새로 만든겁니다!");
                return;
            }
        }

        request
            .post(Constants.API.ADMIN_DELETE_PAPER)
            .send({paperId: PaperList[index]['_id']})
            .set('API-Key', 'ADMIN_DELETE_PAPER')
            .set('Accept', 'application/json')
            .end(function(err,res) {
                if (err) { console.log(err); }
                else {
                    alert('성공적으로 삭제됬습니다!');
                    this.requestPapers();
                }
            }.bind(this));
    }
};

module.exports = AdminSingletonModel;
