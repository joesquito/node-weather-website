const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=7b7f30b20b0d6f4ef85357d2c837d133&query=' + 
        latitude + ',' +
        longitude +
        '&units=f'

    request({ url, json: true }, (error, {body} = {}) => {
        
        if(error){
            callback('Unable to connect to weather service')
        } else if (body.error){ 
            callback('Unable to find location')
        } else {
            callback(undefined,
                body.current.weather_descriptions +
                `. It is currently ${body.current.temperature}\u00b0 out. It feels like ${body.current.feelslike}\u00b0 out.` +
                ` The humidity is ${body.current.humidity}% out.`
            )
        }
    })
}

module.exports = forecast