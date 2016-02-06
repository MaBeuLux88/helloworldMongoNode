var express = require('express');
var bodyParser = require('body-parser');
var forecast = require('./routes/forecast');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/forecast', forecast.findAll);
app.get('/forecast/:id', forecast.findById);
app.post('/forecast', forecast.addForecast);
app.put('/forecast/:id', forecast.updateForecast);
app.delete('/forecast/:id', forecast.deleteForecast);

app.listen(3000);
console.log('Listening on port 3000...');
