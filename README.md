This just proxies the nextbus api and allows adds CORS and JSONP support

Just add callback as a param to the query string. Or just use a browser that supports CORS (most all of them), because it is the awesome.

example:
    http://nextbusproxy.herokuapp.com/service/publicJSONFeed?command=routeConfig&a=sf-muni&r=N&stopid=5197&callback=func
