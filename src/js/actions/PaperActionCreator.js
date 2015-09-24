var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var WebAPI = require('../webAPI/WebAPI');

var PaperActionCreator = {
    requestPaperIndex: function(_query) {
        AppDispatcher.handleClientAction({
            actionType: Constants.PaperActionType.REQUEST_PAPER_INDEX
        });
        WebAPI.getPaperIndex(_query);
    },

    requestPapers: function(_paperIndex) {
        AppDispatcher.handleClientAction({
            actionType: Constants.PaperActionType.REQUEST_PAPERS
        });
        WebAPI.getPapers(_paperIndex);
    },

    setFiltersAndOrder: function(_filters, _order) {
        AppDispatcher.handleClientAction({
            actionType: Constants.PaperActionType.SET_FILTERS_AND_ORDER,
            filters: _filters,
            order: _order
        });
    }
};

module.exports = PaperActionCreator;