window.fbAsyncInit = function() {
    FB.init({
        appId      : '750027861792328',
        xfbml      : true,
        status     : false,
        cookie     : false,
        version    : 'v2.4'
    });

    FBObserver.initialize(FB);
};

var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var FB_clone;

var FBObserver = _.extend({}, EventEmitter.prototype, {
    init: false,

    initialize: function(_FB) {
        this.init = true;
        FB_clone = _FB;
        this.emitInit();
    },

    getFB: function() {
        return FB_clone;
    },

    emitInit: function() {
        this.emit('init');
    },

    addEmitListener: function(callback) {
        this.on('init', callback);
    },

    removeEmitListener: function(callback) {
        this.removeListener('init', callback);
    }
});

module.exports = FBObserver;
