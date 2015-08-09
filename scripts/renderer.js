(function (global) {
    // work using document
    global.Renderer = function Renderer(options) {
        options = options || {};
        this.el = options.el || document.getElementById('info');
    }

    function createItem(item) {
        return '<div class="info-div"><br><div>' + item.title + '</div>' +
            '<div>' + item.contentSnippet + '</div>' +
            '<button class="btn-custom">' + item.link + '</button>' +
            '</div>';
    }

    Renderer.prototype.renderList = function (list) {
        var self = this;
        _.forEach(list, function (item) {
            self.el.innerHTML += createItem(item);
        });
    };
    /*
    Renderer.prototype.renderError = function (error) {
        this.el.innerHTML = JSON.stringify(error);
    };
    */
    Renderer.prototype.renderFeed = function (feedUrl) {
        this.el.innerHTML = '<button id="back">Back</button>' +
                            '<webview id="webview" class="title" src="http://habrahabr.ru/post/263791/" autosize="on"></webview>';
    };

    /* feature */

    /* render configuration page */
    Renderer.prototype.renderConfig = function () {
      // body...
    };
    /* render list of feeds */
    /*Renderer.prototype.renderList = function (list) {
      var element = document.getElementById('info');
      _.forEach(list, function (item) {
        element.innerHTML += createItem(item);
      });
    };
    */
    /* render error message */
    Renderer.prototype.renderError = function (message) {
      //ipc.send('asynchronous-message', 'http://www.google.ru');
    };
    /* render feed */
    Renderer.prototype.renderFeed = function () {
      // body...
    };
})(window);
