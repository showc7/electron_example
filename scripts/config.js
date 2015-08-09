window.$ = require('jquery-deferred');
window._ = require('lodash');

var fs = require('fs');

(function (global){
    var container;

    function Config() {
    }

    Config.prototype.save = function(fileName) {
        var data = JSON.stringify(container);
        fs.writeFile(fileName, data, function(err) {
          if(err) {
            // call error message
            console.log('error saving config' + err);
            return;
          }
          // OK
        });
    };

    Config.prototype.load = function(fileName) {
        var dfd = $.Deferred();
        console.log(fileName);
        fs.readFile(fileName, function read(err, data){
          if(err) {
            container = {};
            return dfd.reject();
          }
          console.log(data);
          container = JSON.parse(data);
          console.log(container);
          return dfd.resolve();
        });
        //container = JSON.parse(fs.readFileSync(fileName));
        //container = { 'habrahabr' : 'http://habrahabr.ru/rss/interesting/' };
        return dfd;
    };

    Config.prototype.get = function(k) {
        var result = container[k];
        return _.isUndefined(result) ? null : result;
    };

    Config.prototype.set = function(k, v) {
        container[k] = v;
    };

    global.Config = Config;
})(window);
