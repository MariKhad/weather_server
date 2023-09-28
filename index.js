const { getWeather } = require('./getData.js');
const http = require('http');
const server = http.createServer().listen(3000);
const format = require('date-fns/format')

server.on('request', async (req, res) => { // подписка на входящий запрос 
	const HOST = 'http://localhost';
	const urlParams = new URL(HOST + req.url);
	let result = '';
	switch (req.url) {
		case '/':
			result = ' Server is running \n To find out the weather in a specific city, enter a URL like http://site.ru/?city={cityName} \n Let\'s try!!';
			break;
		default:
			const cityName = urlParams.searchParams.get('city');
			const { name, weather, main, sys } = await getWeather(cityName);
			/* const timeZone = sys.country;
			const zonedDate = utcToZonedTime(sys.sunrise, timeZone); */
			if (name) {
				result = `Conditions for ${name} is ${weather[0].main}. \nSunrise: ${format(sys.sunrise * 1000, 'hh:mm')} \nSunset: ${format(sys.sunset * 1000, 'hh:mm')}`;
			} else result = 'The city is not found, try another one';
			break;
	}
	return res.end(result);
});