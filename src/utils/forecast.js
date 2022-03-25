const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const lat = latitude.toString();
    const long = longitude.toString();
    const lat_long = long+','+lat;
    const url = 'http://api.weatherstack.com/current?access_key=2e33ae3f0a80446ddba07232fa2d3638&query='+latitude+','+longitude;
    request({url, json:true}, (error, {body}) => {
        console.log(url);
        if(error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            console.log(url);
            console.log(body);
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike +' degrees out. The humadity is '+body.current.humidity+'%. Wind speed is '+body.current.wind_speed+'m/s. Time Zone is '+body.location.timezone_id+'. Localtime is '+body.location.localtime+'.');         
        }
    });
}

module.exports = forecast;
