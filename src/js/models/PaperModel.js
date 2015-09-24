var PaperActionCreator = require('../actions/PaperActionCreator');
var PaperStore = require('../stores/PaperStore');
var Constants = require('../constants/Constants');

var PaperView = require('../views/PaperView');

var PaperListDOM;
var ListDOM;
var PaperProto = {};
var PaperDOMs = [];
var Papers = [];

var query = null;
var device = null;


var PaperModel = {
    initialize: function($, currentPage) {
        switch(currentPage.page) {
            case Constants.CurrentPage.INDEX:
                query = null;
                break;

            case Constants.CurrentPage.TAG:
                query = currentPage.query;
                break;

            default:
                return;
        }

        PaperListDOM = $('#paper-list');

        ListDOM = $('#COL');
        $('#COL').remove();
        ListDOM.removeAttr('id');
        ListDOM.css('display', "block");

        PaperProto[Constants.PaperType.POST] = $('#PAPER_POST');
        $('#PAPER_POST').remove();
        PaperProto[Constants.PaperType.POST].removeAttr('id');
        PaperProto[Constants.PaperType.POST].css({
            display: '-webkit-box',
            display: '-webkit-flex',
            display: '-moz-box',
            display: '-ms-flexbox',
            display: 'flex'
        });


        PaperStore.addInitializeListener(this.initPaperIndex.bind(this));
        PaperStore.addChangeListener(this.addPapers.bind(this));
        PaperStore.addFilterListener(this.updatePapers.bind(this));

        PaperActionCreator.requestPaperIndex(query);

        this._initLineAndDevice();

        $(window).resize(this._resizeHandler.bind(this));
    },

    initPaperIndex: function() {
        setTimeout(function() {
            PaperActionCreator.requestPapers(PaperStore.getPaperIndexes());
        }.bind(this), 300);
    },

    addPapers: function() {
        var newPapers = PaperStore.getPapers();
        var startPoint = Papers.length;
        for (var idx=Papers.length, len=newPapers.length; idx<len; idx++) {
            Papers.push(newPapers[idx]);
        }

        for (var i=startPoint, length=Papers.length; i<length; i++) {
            var colIndex = i % this.__columnCount();
            var targetCol = PaperListDOM.find('[index=' + colIndex.toString() + ']');
            var newPaper = PaperProto[Papers[i].type].clone();

            var newPaperView = new PaperView(newPaper, Papers[i]._id);

            targetCol.append(newPaper);
            newPaperView.initialize(Papers[i]);
        }
    },

    updatePapers: function(changedPapers) {

    },

    lineReRender: function() {

    },

    _initLineAndDevice: function() {
        var windowWidth = $(window).width();
        device = this.__checkTheDevice(windowWidth);

        switch(device) {
            case Constants.DEVICE.ONE:
                PaperListDOM.append(ListDOM.clone().attr('index', 0));
                break;

            case Constants.DEVICE.TWO:
                PaperListDOM.append(ListDOM.clone().attr('index', 0));
                PaperListDOM.append(ListDOM.clone().attr('index', 1));
                break;

            case Constants.DEVICE.THREE:
                PaperListDOM.append(ListDOM.clone().attr('index', 0));
                PaperListDOM.append(ListDOM.clone().attr('index', 1));
                PaperListDOM.append(ListDOM.clone().attr('index', 2));
                break;
        }
    },

    _resizeHandler: function() {
        var windowWidth = $(window).width();

        var currentDevice = this.__checkTheDevice(windowWidth);

        if (currentDevice != device) {
            this.lineReRender();
            device = currentDevice;
        }
    },

    __columnCount: function() {
        switch(device) {
            case Constants.DEVICE.ONE:
                return 1;

            case Constants.DEVICE.TWO:
                return 2;

            case Constants.DEVICE.THREE:
                return 3;
        }
    },

    __checkTheDevice: function(_width) {
        var _device;
        if (_width < Constants.RESPONSE_SIZE.ONE_BY_TWO) {
            _device = Constants.DEVICE.ONE;
        }
        else if (Constants.RESPONSE_SIZE.ONE_BY_TWO <= _width && _width < Constants.RESPONSE_SIZE.TWO_BY_THREE) {
            _device = Constants.DEVICE.TWO;
        }
        else {
            _device = Constants.DEVICE.THREE;
        }
        return _device;
    }
};

module.exports = PaperModel;
