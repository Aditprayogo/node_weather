
const axios = require('axios')
const chalk = require('chalk')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWRpdHByYXlvZ28iLCJhIjoiY2s2YmMzbGNzMHpwNDNtb2R1bnQ3dTZvcyJ9.UQGhmj_qtpn8cnn0QE7Zrg&limit=1';

    axios.get(url)
        .then(({ data }) => {
            // data not found
            if (data.features.length === 0) {
                callback('unable to find the location, try another search', undefined)
            } else {
                callback(undefined,
                    {
                        latitude: data.features[0].center[1],
                        longitude: data.features[0].center[0],
                        location: data.features[0].place_name
                    }
                )
            }
        })
        .catch((err) => {
            callback('unable to connect to location', undefined)
            console.log(chalk.bgRed(err.response.data))
            console.log(chalk.bgRed(err.response.status))
            console.log(chalk.bgRed(err.response.headers))
        })

}

module.exports = geocode