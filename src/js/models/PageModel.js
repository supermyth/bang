var Constants = require('../constants/Constants');

var CurrentPage = {};
var regEx = {
    TAG: /\/tag/i,
    POST: /\/blog/i,
    PRODUCT: /\/product/i,
    PROJECT: /\/project/i,
    APP: /\/app/i,
    ADMIN: /\/admin/i
};

var PageModel = {
    getCurrentPage: function() {
        return CurrentPage;
    },

    setCurrentPage: function(path) {
        if (path.search(regEx.TAG) != -1) {
            CurrentPage.page = Constants.CurrentPage.TAG;
            CurrentPage.query = path.slice(5, path.length);
        }
        else if (path.search(regEx.POST) != -1) {
            CurrentPage.page = Constants.CurrentPage.POST;
            CurrentPage.query = null;
        }
        else if (path.search(regEx.PRODUCT) != -1) {
            CurrentPage.page = Constants.CurrentPage.PRODUCT;
            CurrentPage.query = null;
        }
        else if (path.search(regEx.PROJECT) != -1) {
            CurrentPage.page = Constants.CurrentPage.PROJECT;
            CurrentPage.query = null;
        }
        else if (path.search(regEx.APP) != -1) {
            CurrentPage.page = Constants.CurrentPage.APP;
            CurrentPage.query = null;
        }
        else if (path.search(regEx.ADMIN) != -1) {
            CurrentPage.page = Constants.CurrentPage.ADMIN;
            CurrentPage.query = null;
        }
        else {
            CurrentPage.page = Constants.CurrentPage.INDEX;
            CurrentPage.query = null;
        }
    }
};

module.exports = PageModel;