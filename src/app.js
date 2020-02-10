const express = require('express')
const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = 3000

const path = require('path')
const hbs = require('hbs')

//define path for express config
const publicPathDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//config express static 
app.use(express.static(publicPathDir))


//setup config for handlebars
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aditiya Prayogo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        aboutPage: 'About Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Aditiya Prayogo'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search here'
        })
    }

    geocode(req.query.address, (err, { latitude, longitude, location }) => {
        if (err) {
            res.send({ err })
        }

        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                res.send({ err })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })

        })
    })

})


app.get('', (req, res) => {
    res.render('404-page')

})

// * means doesnt match anything
app.get('*', (req, res) => {
    res.render('404-page')
})



app.listen(port, () => { console.log(`The app listening in port ${port}`) }) 