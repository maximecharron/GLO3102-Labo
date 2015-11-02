/**
 * Created by Antoine on 2015-11-01.
 */
var template = '<p id="error-handler" style="display:none;">Error when calling the api</p>' +

    '<h4 class="forecast-title">Here is the forecast for your location: <button class="btn-refresh" >Refresh</button></h4>' +
    '<% _.each(weeklyForecast, function(forecast){ %>' +
    '<div class="forecast">' +
    '<h2> <%=forecast.date.weekday %></h2>' +
    '<h3><%=forecast.date.monthname%> <%=forecast.date.day%>, <%=forecast.date.year%></h3>' +
    '<div class="forecast-icon">' +
    '<img src="<%=forecast.icon_url%>">' +
    '</div>' +
    '<div clas="forecast-temperature">' +
    '<span>High : <%=forecast.high.celsius%> Low : <%=forecast.low.celsius%></span>' +
    '</div>' +
    '</div>' +
    '<% }); %>';

$(function () {
    ForecastView = Backbone.View.extend({
        template: _.template(template),
        el: "#forecast-container",
        events: {
            "click .btn-refresh": "refresh"
        },
        initialize: function () {

            _.bindAll(this, 'render');

            // creating a variable for the current view
            var self = this;

            // rendering the page
            this.collection.bind('sync add remove', function () {
                self.render();
            });
        },
        render: function () {

            this.$el.html(this.template({
                weeklyForecast: this.collection.toJSON()
            }));
        },
        refresh: function (event) {
            console.log(event);
            this.hideError();
            var isSuccessful = this.collection.fetch();

            if (!isSuccessful) {
                this.showError();
            }
        },
        showError: function () {
            $('#error-handler').slideDown('fast');
        },
        hideError: function () {
            $('#error-handler').slideUp('fast');
        }
    });
});