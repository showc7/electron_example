(function (global) {
    global.Dispatcher = function Dispatcher(options) {
       
    }

    Dispatcher.prototype.onclick = function (event) {
        app.loadFeed(event.target.innerHTML);
    };
})(window);