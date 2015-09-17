var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

function PaperViewObserver() {
    this.emitor = _.extend({}, EventEmitter.prototype);

    this.functions = [];
    this.stack = [];

    for (var idx=0; idx<arguments.length; idx++) {
        if (typeof arguments[idx] == 'function') {
            this.functions.push(arguments[idx]);
            this.stack.push(false);
        }
        else {
            throw new Error("Error in PaperViewObserver, 인자가 함수가 아닙니다.");
        }
    }
}

PaperViewObserver.prototype.done = function(func) {
    for (var idx=0; idx<this.functions.length; idx++) {
        if (this.functions[idx] == func) {
            this.stack[idx] = true;
        }
    }

    for (var jdx=0; jdx<this.stack.length; jdx++) {
        if (this.stack[jdx] == false) return;
    }
    this.emitor.emit('complete');
};

PaperViewObserver.prototype.addCompleteListener = function(callback) {
    this.emitor.addEventListener('complete', callback);
};


module.exports = PaperViewObserver;