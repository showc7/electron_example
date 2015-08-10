(function (global) {
    function RSS() {}

    function httpGet(url, dfd) {
        var xhr = new XMLHttpRequest();
        //xhr.open( 'GET', 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url) + '&output=json', true );

        xhr.open( 'GET', 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=' + url, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                dfd.reject(xhr.status);
            } else {
                dfd.resolve(JSON.parse(xhr.responseText).responseData.feed.entries);
            }
        }

        xhr.send( null );
    }

    RSS.prototype.getList = function (feedURL) {
        var dfd = new $.Deferred();
        httpGet.call(this, feedURL, dfd);
        return dfd;
    };

    global.RSS = RSS;
})(window);

// curl -e http://www.my-ajax-site.com 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://www.habrahabr.ru/rss/interesting'
