//// Notes: To run nodemon when you do changes and saves in other than .js files, you have to run this command <nodemon filename.js -e js,other_file_extention>

const express = require('express')
const path = require('path')
const hbs = require('hbs');
const { registerHelper } = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');
const app1 = express()   

// Define paths for Express config
const publicDir1 = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app1.set('view engine', 'hbs');
app1.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app1.use(express.static(publicDir1));

// res.render we use to return result to a specific html page
app1.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sachin Saini'
    });
});
app1.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Sachin Saini' 
    });
});
app1.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sachin Saini',
        msg: 'We are here to help you'
    });
}); 

app1.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }
    geoCode(req.query.address.toString(), (error, {longitude, latitude, location} = {}) => {
        if(error){
            console.log("Error:"+error);
            return res.send({
                error
            }) 
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                location,
                forecast:forecastData
            })
        })
    })
});

app1.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        });
    }
    console.log(req.query.search);
    res.send({
        product:[]
    });
});

app1.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name: 'Sachi Saini',
        errormsg: 'Help article not found'       
    })
});

app1.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name: 'Sachi Saini',
        errormsg: 'Page not found'
    });
});

app1.listen(3000, () => {
    console.log('Server is up on port 3000.');
})