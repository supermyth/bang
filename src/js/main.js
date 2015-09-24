var PageModel = require('./models/PageModel');
var PaperModel = require('./models/PaperModel');
var AdminSingletonModel = require('./models/AdminSingletonModel');
var PaperHanldeModel = require('./models/PaperHandleModel');

var FBObserver = require('./observe/FB');

$(document).ready(function() {
    PageModel.setCurrentPage(location.pathname);
    var currentPage = PageModel.getCurrentPage();

    PaperModel.initialize($, currentPage);
    AdminSingletonModel.initialize($, currentPage);
});
