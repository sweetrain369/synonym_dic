var http = require('http');
var querystring = require('querystring');
var express = require('express');
var bodyParser = require('body-parser');
var mod = require('korean-text-analytics');
var task = new mod.TaskQueue();


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// app.use(express.static('폴더'))를 지정해 주면 정적파일에 대한 위치가 등록됨

app.use(express.static('public'))

app.post('/send', function(req, res) {
    console.log('문장 : ', req.body.sentence);
    
    var sentence = req.body.sentence;
    mod.ExecuteMorphModule(sentence, function(err, rep) {
    console.log(err, rep);
})
    res.send("<h1> Welcome </h1>")
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(8080, function() {
    console.log('Server is running...');
})
