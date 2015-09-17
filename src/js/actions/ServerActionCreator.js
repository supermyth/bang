var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ServerActionCreator = {
    receivePaperIndex: function(_paperIndex) {
        AppDispatcher.handleServerAction({
            actionType: Constants.PaperActionType.RECEIVE_PAPER_INDEX,
            paperIndex: _paperIndex
        });
    },

    receivePapers: function(_papers) {
        AppDispatcher.handleServerAction({
            actionType: Constants.PaperActionType.RECEIVE_PAPERS,
            papers: _papers
        });
    }
};

module.exports = ServerActionCreator;