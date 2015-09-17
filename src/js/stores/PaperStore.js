var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');


var paperIndex = [];
var papers = [];
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
    papers.concat(_newPapers);
    index++;
}

function setFiltersAndOrder(_filters, _order) {
    filters = _filters;
    order = _order;
}


var PaperStore = _.extend({}, EventEmitter.prototype, {
    getPapers: function() {
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
    },
    getPaperIndexes: function() {
        var indexes = paperIndex.slice(index, (index+1)*8);
        return indexes;
    },

    emitInitialize: function() {
        this.emit('init');
    },
    emitChange: function() {
        this.emit('change');
    },
    addInitializeListener: function(callback) {
        this.on('init', callback);
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },
    removeInitializeListener: function(callback) {
        this.removeListener('init', callback);
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
            break;

        case Constants.PaperActionType.SET_FILTERS_AND_ORDER:
            setFiltersAndOrder(action.filters, action.order);
            break;

    }

    if (action.actionType !== Constants.PaperActionType.RECEIVE_PAPER_INDEX) {
        PaperStore.emitChange();
    }
});

module.exprots = PaperStore;
