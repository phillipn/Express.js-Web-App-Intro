var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var fs = require('fs');

app.set('view engine', 'jade');
app.set("views", __dirname + "/views");
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({extended: false}));

app.get('/home', function(req, res){
    res.render('index', {date: new Date().toDateString()});
});

app.post('/form', function(req, res){
    res.end(req.body.str.split('').reverse().join(''));
});

app.put('/message/:id', function(req, res){
    var id = req.params.id;
    var str = require('crypto')
        .createHash('sha1')
        .update(new Date().toDateString() + id)
        .digest('hex');
    res.send(str);
});

app.get('/search', function(req, res){
    res.send(req.query);
});

app.get('/books', function(req, res){
    fs.readFile(process.argv[3], function (err, data) {
        if (err) return res.send(500);
        try {
            var books = JSON.parse(data);
        } catch (err) {
            res.send(500);
        }
        res.json(books);
    })
});

app.listen(process.argv[2]);
