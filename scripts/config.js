window.$ = require('jquery-deferred');
window._ = require('lodash');

(function (global){
    var container;

    function Config() {
    }

    Config.prototype.save = function() {
        return JSON.stringify(container);
    };

    Config.prototype.load = function() {
        container = { 'habrahabr' : 'http://habrahabr.ru/rss/interesting/' };
        return (new $.Deferred()).resolve().promise();
    };

    Config.prototype.get = function(k) {
        var result = container[k];
        return _.isUndefined(result) ? null : result;
    };

    Config.prototype.set = function(k, v) {
        // body...
    };

    global.Config = Config;
})(window);