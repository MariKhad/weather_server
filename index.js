const { getWeather } = require('./getData.js');
const http = require('http');
const server = http.createServer().listen(3000);
const format = require('date-fns/format');


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
			console.log(cityName);
			let { name, weather, main, sys } = await getWeather(cityName);
			console.log(main);
			if (name) {
				result = `conditions for ${name} is ${weather[0].main}. Sunset: ${format(sys.sunrise, 'H:m')}`;
			} else result = 'The city is not found, try another one';
			break;
	}
	return res.end(result);
});