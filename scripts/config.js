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
            console.log('error saving configuration file' + err);
            app.showErrorMessage('can\'t save configuration file' + err);
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
            console.log('error reading configuration file' + err);
            app.showErrorMessage('can\'t read configuration file' + err);
            container = {};
            return dfd.reject();
          }
          console.log(data);
          container = JSON.parse(data);
          console.log(container);
          return dfd.resolve();
        });
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
