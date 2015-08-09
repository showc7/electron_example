(function (global) {
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

    Renderer.prototype.renderError = function (error) {
        this.el.innerHTML = 'Fuck' + JSON.stringify(error);
    };

    Renderer.prototype.renderFeed = function (feedUrl) {
        this.el.innerHTML = '<button id="back">Back</button>' + 
                            '<webview id="webview" class="title" src="http://habrahabr.ru/post/263791/"></webview>';
    };
})(window);