const express = require('express');

const app = express();

let counter = 0;

app.get('/info', function(req, res) {
    res.send('Hello my friend ' + counter);
    counter++;
});

app.post('move', function(req, res) {
    res.send("I've moved");
});

app.listen(4000);
