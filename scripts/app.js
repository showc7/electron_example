(function (global) {
    function APP() {
        this.config = new Config();
        this.dispatcher = new Dispatcher();
        this.renderer = new Renderer();
        this.RSS = new RSS();
        this.ipc = require('ipc');

        this.currentFeed = 'habrahabr';
        this.errorCb = _.bind(this._failCb, this);
    }
    APP.prototype.init = function() {
        this.config.load(Constants.ConfigurationFile).done(_.bind(this.renderRSSList, this));
    };

    APP.prototype.renderRSSList = function () {
        var self = this;
        this.RSS.getList(this.config.get(this.currentFeed))
        .done(function (result) {
            if (!_.isArray(result)) { self.renderer.renderError(result); }
            self.renderer.renderList(result);
            self._addCallbacks();
        }).fail(this.errorCb);
    };

    APP.prototype._addCallbacks = function () {
        var self = this,
            list = this.renderer.getWorkingElement().getElementsByClassName('btn-custom');

        _.forEach(list, function (item) {
            item.addEventListener('click', _.bind(self.dispatcher.onclick, self.dispatcher));
        });
    };

    APP.prototype.loadFeed = function (url) {
        console.log(url);
        this.renderer.renderFeed(url);
        this._addCallbacks();
    };

    APP.prototype._failCb = function (error) {
        this.renderer.renderError(error);
    };

    APP.prototype.back = function () {
      console.log('back');
      this.renderRSSList();
    };

    APP.prototype.setcurrentFeed = function (postName) {
      if(!postName) return;
      if(!this.config.get(postName)) return;

      this.currentFeed = postName;
    };

    APP.prototype.showErrorMessage = function (message) {
      var params = {};
      params.action = 'showErrorBox';
      params.message = message;
      this.ipc.send('asynchronous-message', params);
    };

    APP.prototype.settings = function () {
      this.renderer.renderSettings();
    };

    APP.prototype.getFeedTitle = function () {
      return this.currentFeed;
    };

    global.APP = APP;

})(window);
