const URL_WEATHER = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = `58b89486f948faa254f683ef52c04bb4`;

const fetch = require('node-fetch');

module.exports.getWeather = function (cityName) {
	return fetch(`${URL_WEATHER}?q=${cityName}&appid=${API_KEY}`)
		.then(response => {
			if (response.status === 404) {
				throw new Error('Запись не найдена');
			}
			return response.json();
		}).then(data => {
			console.log(data);
			return data;
		}).catch((error) => {
			return error.message;
		})
}

