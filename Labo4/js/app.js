$(document).ready(function () {

	var calculator = new Calculator();

	var screen = $('.screen .equation')

	$('.clear').click(function(event) {
		calculator.clear();
		fadeText('');
	});

	var memorySet = false;
	$('.memory').click(function(event) {
		if (memorySet) {
			calculator.value(calculator.getMemory());
			fadeText(calculator.getEquation());
			memorySet = false;
		} else {
			calculator.setMemory(screen.text());
			memorySet = true;
		}
	});

	$('.keys span').click(function(event) {
		var selectedKey = $(event.target);
		if (selectedKey.hasClass('operator')) {
			var operation = selectedKey.data('operation');

			var result = calculator[operation]();

			if (operation === 'equals') {
				fadeText(result);
			} else {
				fadeText(calculator.getEquation());
			}
		} else {
			calculator.value(selectedKey.text());
			fadeText(calculator.getEquation());
		}
	});

	$('.geo').click(function (event) {;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				fadeText('Lat: ' + position.coords.latitude + 
					' Long: ' + position.coords.longitude);
			});
		} else {
			fadeText('Geolocation non disponible');
		}
	});

	function fadeText(value) {
		screen.fadeOut(200, function() {
			screen.text(value);
			screen.fadeIn(200);
		});
	}
});