/**
 * Created by Antoine on 2015-11-01.
 */
$(function () {
    WeeklyForecastCollection = Backbone.Collection.extend({
        model: ForecastModel,
        parse: function (response) {
            console.log(response);
            var weeklyForcast = [];
            var forecastFromResponse = response.forecast.simpleforecast.forecastday;
            for (var i = 0; i < 7; i++) {

                weeklyForcast.push(forecastFromResponse[i]);
            }
            return weeklyForcast;
        }
    });

})
;