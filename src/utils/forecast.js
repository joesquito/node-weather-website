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
            const dateAndTime = new Date(body.location.localtime)
            
            callback(undefined, 
                `<img src =${body.current.weather_icons[0]} style="float:left;padding:4px">` + 
                body.current.weather_descriptions +
                `. It is currently ${body.current.temperature}\u00b0 out.` +
                ` It feels like ${body.current.feelslike}\u00b0 out.` +
                `<br>The humidity is ${body.current.humidity}% out.` + 
                `<br>As of ${dateAndTime.toLocaleTimeString()}`
            )
        }
    })
}

module.exports = forecast