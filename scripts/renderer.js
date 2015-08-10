(function (global) {
    // work using document
    global.Renderer = function Renderer(options) {
        this.options = options || { elementId : 'info' };
        this.ipc = require('ipc');
    }

    function createListItem(item) {
      /* create div main*/
      var element = document.createElement('div');
      element.setAttribute('class','info-div');
      element.appendChild(document.createElement('br'));
      /* append title */
      var title = document.createElement('div');
      title.innerHTML = item.title;
      element.appendChild(title);
      /* append content */
      var content = document.createElement('div');
      content.innerHTML = item.contentSnippet;
      element.appendChild(content);
      /* append button */
      var button = document.createElement('button');
      button.setAttribute('class','btn-custom');
      button.innerHTML = 'read more';
      button.setAttribute('data-url',item.link);
      button.setAttribute('data-type','feed-url');
      element.appendChild(button);

      return element;
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
        element.appendChild(createListItem(item));
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
