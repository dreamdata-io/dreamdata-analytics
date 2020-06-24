(function () {
    // Create a dummy analytics object until real loaded
    window.dreamdata || (window.dreamdata = []);
    window.dreamdata.methods = [
        'identify',
        'track',
        'trackLink',
        'trackForm',
        'trackClick',
        'trackSubmit',
        'page',
        'pageview',
        'ab',
        'alias',
        'ready',
        'group',
        'on',
        'once',
        'off'
    ];
    window.dreamdata.factory = function (method) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(method);
            window.dreamdata.push(args);
            return window.analytics;
        };
    };
    for (var i = 0; i < window.dreamdata.methods.length; i++) {
        var method = window.dreamdata.methods[i];
        window.dreamdata[method] = window.dreamdata.factory(method);
    }

    // Load analytics async
    dreamdata.load = function (callback) {
        if (document.getElementById('dreamdata-analytics')) return;

        // We make a copy if our dummy object
        window.a = window.dreamdata;
        var script = document.createElement('script');
        script.async = true;
        script.id = 'dreamdata-analytics';
        script.type = 'text/javascript';
        script.src = './script.js';

        if (script.addEventListener) {
            script.addEventListener(
                'load',
                function (e) {
                    if (typeof callback === 'function') {
                        callback(e);
                    }
                },
                false
            );
        } else {
            //IE8
            script.onreadystatechange = function () {
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    callback(window.event);
                }
            };
        }
        var first = document.getElementsByTagName('script')[0];
        first.parentNode.insertBefore(script, first);
    };

    dreamdata.load(function () {
        // On load init our integrations
        dreamdata.initialize({ 'Dreamdata.io': { apiKey: '<API_KEY>' } });
        // Now copy whatever we applied to our dummy object to the real analytics
        while (window.a.length > 0) {
            var item = window.a.shift();
            var method = item.shift();
            if (dreamdata[method]) dreamdata[method].apply(dreamdata, item);
        }
    });
    dreamdata.page();
})();
