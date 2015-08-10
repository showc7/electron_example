(function (global) {
    global.Dispatcher = function Dispatcher(options) {

    }

    Dispatcher.prototype.onclick = function (event) {
        console.log('click');
        var element = event.target;

        switch(element.getAttribute('data-type')) {
          case 'feed-url': app.loadFeed(event.target.getAttribute('data-url')); break;
          case 'back': app.back(); break;
          default: return;
        }
    };
})(window);
