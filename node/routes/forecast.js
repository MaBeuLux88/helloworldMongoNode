var mongo = require('mongodb');
var BSON = require('bson').BSONPure;

var Server = mongo.Server,
    Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('europronos', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'europronos' database");
        db.collection('forecast', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'forecast' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving forecast: ' + id);
    var collection = db.collection('forecast');
    collection.findOne({'_id':new BSON.ObjectID(id)},{}, function(err, item) {
      res.send(item);
    });
};

exports.findAll = function(req, res) {
    var collection = db.collection('forecast');
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
};

exports.addForecast = function(req, res) {
    var forecast = req.body;
    console.log('Adding forecast: ' + JSON.stringify(forecast));
    var collection = db.collection('forecast');
    collection.insert(forecast, {safe:true}, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            console.log('Success: ' + JSON.stringify(result[0]));
            res.send(result[0]);
        }
    });
}

exports.updateForecast = function(req, res) {
    var id = req.params.id;
    var update = req.body;
    console.log('Updating forecast: ' + id);
    console.log(JSON.stringify(update));
    var collection = db.collection('forecast');
    collection.update({'_id':new BSON.ObjectID(id)}, update, {safe:true}, function(err, result) {
        if (err) {
            console.log('Error updating forecast: ' + err);
            res.send({'error':'An error has occurred'});
        } else {
            console.log('' + result + ' document(s) updated');
            res.send(update);
        }
    });
}

exports.deleteForecast = function(req, res) {
    var id = req.params.id;
    console.log('Deleting forecast: ' + id);
    var collection = db.collection('forecast');
    collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            console.log('' + result + ' document(s) deleted');
            res.send(req.body);
        }
    });
}
