var PageModel = require('./models/PageModel');
var PaperModel = require('./models/PaperModel');
var AdminSingletonModel = require('./models/AdminSingletonModel');
var PaperHanldeModel = require('./models/PaperHandleModel');

var FBObserver = require('./observe/FB');

$(document).ready(function() {
    PageModel.setCurrentPage(location.pathname);
    var currentPage = PageModel.getCurrentPage();

    //PaperModel.initialize($, currentPage);
    AdminSingletonModel.initialize($, currentPage);


    FBObserver.addEmitListener(getLikes);
    /*
        FB.api(
            {
                'method': 'fql.query',
                'query': "SELECT like_count FROM link_stat WHERE url='" + url + "'"
            },
            function(res) {
                console.log(res);
            }
        );
    */
});

var getLikes = function() {
    var url = 'http://seokma.com/blog/15091401';
    var FB = FBObserver.getFB();
    FB.api(
        {
            method: 'fql.query',
            query: "SELECT like_count FROM link_stat WHERE url='" + url + "'"
        },
        function(res) {
            console.log(res);
        }
    )
};