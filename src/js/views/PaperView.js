var imagesLoaded = require('imagesloaded');

var FBObserver = require('../observe/FB');
var PaperViewObserver = require('../observe/PaperViewObserver');
var Constants = require('../constants/Constants');

function PaperView(_DOM) {
    this.DOM = _DOM;

    this.setTitle = function(_title) {
        _DOM.find('["data-attr"=title]').text(_title);

        this.observer.done(this.setTitle);
    };
    this.setSubTitle = function(_subTitle) {
        _DOM.find('["data-attr"="sub-title"]').text(_subTitle);

        this.observer.done(this.setSubTitle);
    };
    this.setTitleLink = function(_titleId) {
        _DOM.find('["data-attr"=title]').on("click tap", function() {
            location.href = '/blog/' + _titleId;
        });

        this.observer.done(this.setTitleLink);
    };
    /*
    this.setDate = function(_date) {
        var date = new Date(_date);
        _DOM.find('["data-attr"=date]').text(date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate());
    };
    */
    this.setTitleImage = function(_titleImage) {
        _DOM.find('["data-attr"="title-image"]').attr('src', _titleImage);

        imagesLoaded(this.DOM, function() {
            this.observer.done(this.setTitleImage);
        }.bind(this));
    };

    this.setViewCount = function(_viewCount) {
        _DOM.find('["data-attr"="view-count"]').text(_viewCount);

        this.observer.done(this.setViewCount);
    };
    this.setLikeCount = function(_titleId) {
        var url = Constants.URL + '/blog/' + _titleId;
        var init = function() {
            var FB = FBObserver.getFB();
            FB.api(
                { method: 'fql.query', query: "SELECT like_count FROM link_stat WHERE url='" + url + "'" },
                function(res) {
                    _DOM.find('["data-attr"="like-count"]').text(res[0]['like_count']);

                    this.observer.done(this.setLikeCount);
                }.bind(this)
            );
        };

        if (FBObserver.init) { init(); }
        else {
            FBObserver.addEmitListener(init);
        }
    };
    this.setCommentCount = function(_titleId) {
        var url = Constants.URL + '/blog/' + _titleId;
        var init = function() {
            var FB = FBObserver.getFB();
            FB.api(
                { method: 'fql.query', query: "SELECT comment_count FROM link_stat WHERE url='" + url + "'" },
                function(res) {
                    _DOM.find('["data-attr"="comment-count"]').text(res[0]['comment-count']);

                    this.observer.done(this.setCommentCount);
                }.bind(this)
            );
        };

        if (FBObserver.init) { init(); }
        else {
            FBObserver.addEmitListener(init);
        }
    };

    this.setTags = function(_tags) {
        var tagProto = '<span class="paper-tags-tag" ';
        var tags = _DOM.find('["data-attr"=tags]');

        for (var idx=0; idx< _tags.length; idx++) {
            tags.append(tagProto + 'idx=' + idx + ' >' +'#' + _tags[idx].title + '</span>');
            tags.find('[idx=' + idx + ']').on("click tap", function() {
                location.href = '/tag/' + _tags[idx].title;
            });
        }

        this.observer.done(this.setTags);
    };

    this.setReleasedDate = function(_date) {
        var date = new Date(_date);
        _DOM.find('["data-attr"="released"]').text("Released. " + date.getYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());

        this.observer.done(this.setReleasedDate);
    };

    this.setIcon = function(_src) {
        _DOM.find('["data-attr"=icon]').attr('src', _src);

        imagesLoaded(this.DOM, function() {
            this.observer.done(this.setIcon);
        }.bind(this));
    };

    this.setSummary = function(_summary) {
        _DOM.find('["data-attr"=summary]').text(_summary);

        this.observer.done(this.setSummary);
    };

    this.setProgress = function(_progress) {
        _DOM.find('["data-attr"=progress]').css('width', _progress + '%');

        this.observer.done(this.setProgress);
    };

    this.setGit = function(_src) {
        _DOM.find('["data-attr"=git]').attr('src', _src);

        this.observer.done(this.setGit);
    };

    this.setMainHTML = function(_mainHTML) {
        _DOM.find('["data-attr"=main]').html(_mainHTML);

        this.observer.done(this.setMainHTML);
    };
}

PaperView.prototype.initialize = function(paper) {
    var completeLoaded = function() {

    };

    switch(paper.type) {
        case Constants.PaperType.POST:
            this.observer = new PaperViewObserver(this.setTitle, this.setSubTitle, this.setTitleLink, this.setTitleImage, this.setLikeCount, this.setViewCount, this.setCommentCount, this.setTags);
            this.observer.addCompleteListener(completeLoaded);

            this.setTitle(paper.title);
            this.setSubTitle(paper.data['sub-title']);
            this.setTitleLink(paper.data['titleId']);
            this.setTitleImage(paper.data['title-image']);
            this.setLikeCount(paper.data['titleId']);
            this.setViewCount(paper.data['view-count']);
            this.setCommentCount(paper.data['titleId']);
            this.setTags(paper.data['tags']);

            break;

        case Constants.PaperType.ABOUT:
            break;

        case Constants.PaperType.APP:
            break;

        case Constants.PaperType.PRODUCT:
            break;

        case Constants.PaperType.PROJECT:
            break;
    }
};

module.exports = PaperView;