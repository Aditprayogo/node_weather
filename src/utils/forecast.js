const axios = require('axios')
const chalk = require('chalk')

const forecast = (latitude, longitude, callback) => {

    const url =
        'https://api.darksky.net/forecast/7067693762e51eb685b7001b0540e361/' + latitude + ',' + longitude + '?units=si&lang=id';


    axios.get(url)
        .then((res) => {

            if (res.data.error) {

                callback('Unable to find the location', undefined)

            } else {

                const data = res.data.currently

                callback(
                    undefined,
                    res.data.daily.data[0].summary + ' It currently ' + data.temperature + ' degrees out.' + res.daily.data[0].temperatureHigh + ' With a low of ' + res.daily.data[0].temperatureLow + 'There is a ' + data.precipProbability + '% to rain'
                )
            }

        })
        .catch((err) => {

            callback('unable to connect to location', undefined)
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)

        })
}

module.exports = forecast

