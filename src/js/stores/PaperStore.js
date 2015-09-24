var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');


var paperIndex = [];
var papers = new Array();
var index = 0;
var lastIndex = null;

var filters = [];
var order = Constants.OrderType.ORDER_BY_AUTO;


function initPaperIndex(_newPaperIndex) {
    paperIndex = _newPaperIndex;
    papers = [];
    index = 0;

    var len = paperIndex.length;
    if (len%8 == 0) {
        lastIndex = parseInt(len/8) - 1;
    }
    else {
        lastIndex = parseInt(len/8);
    }
}

function addPapers(_newPapers) {
    for (var idx= 0, len=_newPapers.length; idx<len; idx++) {
        papers.push(_newPapers[idx]);
    }
    index++;
}

function setFiltersAndOrder(_filters, _order) {
    filters = _filters;
    order = _order;
}


var PaperStore = _.extend({}, EventEmitter.prototype, {
    getPapers: function() {
        /*
        var _papers;

        _papers = _.filter(papers, function(paper) {
            for (var idx= 0, len= filters.length; idx<len; idx++) {
                if (paper.type == filters[idx]) { return true; }
            }
            return false;
        });

        switch(order) {
            case Constants.OrderType.ORDER_BY_AUTO:
                break;

            case Constants.OrderType.ORDER_BY_NEWEST:
                _papers = _.sortBy(_papers, function(paper) {
                    return -(new Date(paper.date)).getTime();
                });
                break;

            case Constants.OrderType.ORDER_BY_OLDEST:
                _papers = _.sortBy(_papers, function(paper) {
                    return (new Date(paper.date)).getTime();
                });
                break;

            case Constants.OrderType.ORDER_BY_NAME:
                _papers = _.sortBy(_papers, function(paper) {
                    return paper.title;
                });
                break;
        }

        return _papers;
        */
        return papers;
    },

    getPaperIndexes: function() {
        return paperIndex.slice(index, (index+1)*8);
    },

    emitInitialize: function() {
        this.emit('init');
    },
    emitChange: function() {
        this.emit('change');
    },
    emitFilter: function() {
        this.emit('filter');
    },
    addInitializeListener: function(callback) {
        this.on('init', callback);
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    addFilterListener: function(callback) {
        this.on('filter', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },
    removeInitializeListener: function(callback) {
        this.removeListener('init', callback);
    },
    removeFilterListener: function(callback) {
        this.removeListener('filter', callback);
    }
});


AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case Constants.PaperActionType.RECEIVE_PAPER_INDEX:
            initPaperIndex(action.paperIndex);
            PaperStore.emitInitialize();
            break;

        case Constants.PaperActionType.RECEIVE_PAPERS:
            addPapers(action.papers);
            PaperStore.emitChange();
            break;

        case Constants.PaperActionType.SET_FILTERS_AND_ORDER:
            setFiltersAndOrder(action.filters, action.order);
            PaperStore.emitFilter();
            break;

        default:
            return true;
    }
});

module.exports = PaperStore;
