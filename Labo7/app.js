$(function () {
    var weeklyForecast = new WeeklyForecastCollection({});
    weeklyForecast.url = 'http://api.wunderground.com/api/893bb702be7668e4/forecast10day/q/canada/ste_foy.json';

    var view = new ForecastView({
        collection: weeklyForecast
    });
    weeklyForecast.fetch({
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);
        }
    });
});