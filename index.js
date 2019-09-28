const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const game = {
    field: [
        [0, 0, 0, 0, 0, 0, ],
        [1, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, ],
        [1, 0, 0, 0, 0, 0, ],
        [2, 1, 0, 0, 0, 0, ],
        [2, 2, 1, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, ],
      ],
      currentPlayer: 2,
      winner: 0
};

app.get('/info', function(req, res) {
    res.send(game);
});

app.post('/move', function(req, res) {
    res.send("I've moved");
});

app.listen(4000);
