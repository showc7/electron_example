(function (global) {
    function APP() {
        this.config = new Config();
        this.dispatcher = new Dispatcher();
        this.renderer = new Renderer();
        this.RSS = new RSS();

        this.currentPost = 'habrahabr';
        this.errorCb = _.bind(this._failCb, this);
    }
    APP.prototype.init = function() {
        this.config.load().done(_.bind(this.renderRSSList, this));
    };

    APP.prototype.renderRSSList = function () {
        var self = this;
        this.RSS.getList(this.config.get(this.currentPost))
        .done(function (result) {
            if (!_.isArray(result)) { self.renderer.renderError(result); }
            self.renderer.renderList(result);
            self._addCallbacks();
        }).fail(this.errorCb);
    };

    APP.prototype._addCallbacks = function () {
        var self = this,
            list = this.renderer.el.getElementsByClassName('btn-custom');

        _.forEach(list, function (item) {
            item.addEventListener('click', _.bind(self.dispatcher.onclick, self.dispatcher));
        });
    };

    APP.prototype.loadFeed = function (url) {
        console.log(url);
        this.renderer.renderFeed(url);
    };

    APP.prototype._failCb = function (error) {
        this.renderer.renderError(error);
    };

    global.APP = APP;

})(window);