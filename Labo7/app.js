$(function () {
    if (navigator.geolocation) {
        // Get the current position.
        navigator.geolocation.getCurrentPosition(function (position) {
            var weeklyForecast = new WeeklyForecastCollection({});
            query = position.coords.latitude + ',' + position.coords.longitude;
            weeklyForecast.url = 'http://api.wunderground.com/api/893bb702be7668e4//forecast10day/geolookup/q/' + query + '.json';
            var view = new ForecastView({
                collection: weeklyForecast
            });
            weeklyForecast.fetch({
                dataType: 'jsonp'
            });

        });
    } else {
        var weeklyForecast = new WeeklyForecastCollection({});
        weeklyForecast.url = 'http://api.wunderground.com/api/893bb702be7668e4/forecast10day/q/canada/montreal.json';

        var view = new ForecastView({
            collection: weeklyForecast
        });
        weeklyForecast.fetch({
            dataType: 'jsonp'
        });
    }
});