(function (global) {
    // work using document
    global.Renderer = function Renderer(options) {
        this.options = options || { elementId : 'info' };
        this.ipc = require('ipc');
    }

    function createListItem(item) {
      var ListItemView = {title: item.title, contentSnippet: item.contentSnippet, link: item.link};
      var Mustache = require('mustache');
      var output = Mustache.render('<div class="info-div">
                                      <br>
                                      <div>{{title}}</div>
                                      <div>{{contentSnippet}}</div>
                                      <button class="btn-custom" data-url="{{link}}" data-type="feed-url">read more</button>
                                    </div>',ListItemView);

      return output;
    }

    /* render configuration page */
    Renderer.prototype.renderConfig = function () {
      // body...
    };
    /* render list of feeds */
    Renderer.prototype.renderList = function (list) {
      var element = document.getElementById(this.options.elementId);
      element.innerHTML = '';
      _.forEach(list, function (item) {
        //element.appendChild(createListItem(item));
        element.innerHTML += createListItem(item);
      });
    };

    /* render error message */
    Renderer.prototype.renderError = function (message) {
      console.log('error : ' + message);
      var params = {action : 'showErrorBox', message : 'internal error'};
      app.ipc.send('asynchronous-message', params);
    };
    /* render feed */
    Renderer.prototype.renderFeed = function (url) {
      console.log('render feed');
      var element = document.getElementById(this.options.elementId);
      element.innerHTML = '';
      /* create button */
      var button = document.createElement('button');
      button.setAttribute('id','back');
      button.setAttribute('class','btn-custom');
      button.setAttribute('data-type','back');
      button.innerHTML = 'back';
      element.appendChild(button);
      /* create webview */
      var webview = document.createElement('webview');
      webview.setAttribute('id','webview');
      webview.setAttribute('class','title');
      webview.setAttribute('src',url);
      element.appendChild(webview);
    };

    Renderer.prototype.getWorkingElement = function () {
      return document.getElementById(this.options.elementId);
    };

    Renderer.prototype.renderSettings = function () {
      // body...
    };
})(window);
