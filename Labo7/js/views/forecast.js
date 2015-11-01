/**
 * Created by Antoine on 2015-11-01.
 */
$(function () {
    ForecastView = Backbone.View.extend({
        template: _.template($('#forecast-template').html()),
        el: "#forecast-container",
        events: {
            "click #btn-refresh": "refresh"
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
        render: function(){
            this.$el.html(this.template({
                weeklyForecast:this.collection.toJSON()
            }));
        },
        refresh : function(event){
            this.hideError();
            var isSuccessful= this.collection.fetch();

            if(!isSuccessful){
                this.showError();
            }
        },
        showError: function(){
            $('#error-handler').slideDown('fast');
        },
        hideError:function(){
            $('#error-handler').slideUp('fast');
        }
    });
});