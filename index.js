const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const game = {
    field: [
        [0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, ],
      ],
      currentPlayer: 2,
      winner: 0,

    columns: 7, // todo: how to auto-calc them
    columnHeight: 6, // todo: how to auto-calc them
};

app.get('/info', function(req, res) {
    res.send(game);
});

app.post('/move', function(req, res) {
    if (!req.body) {
        return;
    }

    if (!req.body.hasOwnProperty('column')) {
        return;
    }

    let columnId = req.body.column;

    if (game.winner !== 0) {
        return;
    }

    let column = game.field[columnId];
    if (column[5] !== 0) {
        return;
    }

    game.currentPlayer = game.currentPlayer === 1? 2 : 1;
    column[column.indexOf(0)] = game.currentPlayer;
    game.field[columnId] = column;

    calculateWinner();

    console.log('Move to columnId ' + columnId);

    function calculateWinner() {
        checkLines();
        checkDiagonals();

        function checkDiagonals() {
            // todo
        }

        function checkLines() {
            let flatField = flattenField();
            for (let i = 0; i < flatField.length - 3; i++) {
                let slice = flatField.slice(i, i + 4);
                if ((slice[0] === slice[1]) &&
                    (slice[1] === slice[2]) &&
                    (slice[2] === slice[3]) &&
                    (slice[0]) !== 3) {
                    game.winner = slice[0];
                    console.log('Found winner ' + game.winner);
                }
            }
        }

        function flattenField() {
            let flatField = [];
            game.field.forEach((v) => {
                flatField = flatField.concat(v, 3);
            });
            for (let i = 0; i < game.columnHeight; i++) {
                for (let j = 0; j < game.columns; j++) {
                    flatField = flatField.concat(game.field[j][i]);
                }
                flatField = flatField.concat(3);
            }
            flatField = flatField.filter((v) => v !== 0);

            return flatField;
        }
    }

    res.send(game);
});

app.listen(4000);
