document.addEventListener("DOMContentLoaded", function(event) {

    var buttons = document.getElementsByClassName("button"),
        cells = document.getElementsByClassName('cell');

    //create Game object
    function Game () {
        this.won = false;
        this.mode = "";
        this.players = {
                        player1 : {
                            name: "Player 1",
                            mark : 'x'
                        },

                        player2 : {
                            name: "Player 2",
                            mark: 'o'
                        },

                        program: {
                            name: "Program",
                            mark: 'o'
                        } 
                    };
        this.currentPlayer = this.players.player1;
    }

    //insert player's mark into a cell on board
    Game.prototype.makeMark = function (pick) {
        if (pick.constructor === Number) {
            return cells[pick].innerText = this.currentPlayer.mark;
        } else {
            pick.target.innerText = this.currentPlayer.mark;
        }
    };

    //change turns
    Game.prototype.changePlayer = function () {
        var player1 = this.players.player1,
            player2 = this.players.player2,
            program = this.players.program;

        if (!this.won && this.mode === "Human") {
            this.currentPlayer === player1 ? this.currentPlayer = player2 : this.currentPlayer = player1;
            this.changeHeader('changePlayer');
        }

        if (!this.won && this.mode === "Program") {
            this.currentPlayer === player1 ? this.currentPlayer = program : this.currentPlayer = player1;
            this.changeHeader('changePlayer');
        }
    };

    Game.prototype.changeHeader = function changeHeader(event) {
        if (event === 'changePlayer') {
            document.getElementById('header').innerText = this.currentPlayer.name + "'s turn.";
        }

        if (event === 'gameOver') {
            document.getElementById('header').innerText = "Game over! "+ this.currentPlayer.name + " won.";
        }

        if (event === 'cat') {
            document.getElementById('header').innerText = "Cat's game! No winners.";
        }
    }
 
    //fetch board state and return it
    Game.prototype.getBoard = function () {
        var boardState = [];
        var cells = document.getElementsByClassName("cell");

        for (i = 0; i < cells.length; i++) {
            boardState.push(cells[i].innerText);
        }

        return boardState;
    };

    Game.prototype.programPick = function (board) {
        //get board state & return indexes of empty cells
        var emptyIndexes = board.map(function(cell, index) {
            if (cell === "") {
                return index;
            }
        }).filter(function(el) { 
            return el !== undefined;
        });

        //pick a random '' to enter mark
        var max = emptyIndexes[emptyIndexes.length-1];

        var pick = Math.floor(Math.random()*((emptyIndexes.length-1)-0 +1)) + 0;

        return this.makeMark(emptyIndexes[pick]); 
    }

    Game.prototype.checkForWinners = function (board) {
        function isWinner(el, index, array) {
            return el === game.currentPlayer.mark;
        }
        
        // check for horizontal winners
        var horizontalChecker = function () {
            for(var i=0; i <=6; i+=3) {
                var row = board.slice(i, i+3);

                if (row.every(isWinner)) {
                    return game.gameOver('won');
                }
            }
        };

        // check for vertical winners
        var verticalChecker = function () {
            var start = 0;

            for(var i = start; i < board.length; i++) {
                var col = board[i] + board[i+3] + board[i+6];
                col = col.split('');

                if (col.length === 3 && col.every(isWinner)) {
                    return game.gameOver();
                } 
            }
        };    
        
        //     check for diagonal winners
        var diagonalChecker = function () {
            // if any corners  && middle === win
                diagonals = [];

                diagonals.push(board[2] + board[4] + board[6]);
                diagonals.push(board[0] + board[4] + board[8]);

            for (var i = 0; i<diagonals.length; i++) {
                diagonals[i] = diagonals[i].split('');

                if (diagonals[i].length === 3 && diagonals[i].every(isWinner)) {
                    return game.gameOver('won');
                } 
            }    
        };

        var catsGameChecker = function () {
            if (!game.getBoard().includes("") && game.won === false) {
                return game.gameOver('cat');
            } 
        };

        horizontalChecker();
        verticalChecker();
        diagonalChecker();
        catsGameChecker();
    };

    
    Game.prototype.gameOver = function (isDraw) {
        this.won = true;

        if (isDraw === 'cat') {
            document.getElementById('header').innerText = "Cat's game! No winners.";
        } else {
            document.getElementById('header').innerText = "Game over! " + this.currentPlayer.name + " won.";
            this.currentPlayer.score++;
        }
    
        document.getElementById('reset').style.visibility = 'visible';
    };

//event listeners
    //add click on buttons
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (e) {
            var mode = e.target.innerHTML;
            document.getElementById('board').style.visibility = "visible";
            document.getElementById('button-container').style.visibility = "hidden";
        });
    }

    document.getElementById('reset').addEventListener("click", function(e) {
    })

    document.getElementById('board').addEventListener("click", function (e) {
        //add and still empty cells to conditional
        if (!game.won) {
           if (e.target.className === "cell" && e.target.innerText === "" ) {
                game.makeMark(e);
                game.checkForWinners(game.getBoard());
                game.changePlayer();
           }
       }
    });

    var game = new Game();
  });