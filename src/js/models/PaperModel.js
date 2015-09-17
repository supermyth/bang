var PaperActionCreator = require('../actions/PaperActionCreator');
var PaperStore = require('../stores/PaperStore');
var Constants = require('../constants/Constants');

var PaperListDOM;
var ListDOM;
var PaperDOMs = [];

var query = null;
var windowWidth;


var PaperModel = {
    initialize: function($, currentPage) {
        switch(currentPage.page) {
            case Constants.CurrentPage.INDEX:
                query = currentPage.query;
                break;

            case Constants.CurrentPage.TAG:
                query = null;
                break;

            default:
                return;
        }
    },

    initPapers: function() {

    },

    updatePapers: function() {

    },

    resizeHandler: function() {
        windowWidth = $(window).width();
    }
};

module.exprots = PaperModel;
