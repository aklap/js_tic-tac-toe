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
                            score : 0, 
                            mark : 'x'
                        },

                        player2 : {
                            name: "Player 2",
                            score: 0, 
                            mark: 'o'
                        }, 
                    };

        this.currentPlayer = this.players['player1'];
    }

    Game.prototype.makeMark = function (cell) {
        cell.target.innerText = this.currentPlayer['mark'];
    };

    //change turns
    Game.prototype.changePlayer = function () {
        var player1 = this.players.player1,
            player2 = this.players.player2;
        if (!this.won) {
            this.currentPlayer === player1 ? this.currentPlayer = player2 : this.currentPlayer = player1;
            //TODO in a separate display function
            document.getElementById('header').innerText = game.currentPlayer.name + "'s turn.";
        }
    };
    

    //fetch board state and return it
    Game.prototype.getBoard = function () {
        var boardState = [];
        var cells = document.getElementsByClassName("cell");

        for (i = 0; i < cells.length; i++) {
            boardState.push(cells[i].innerText);
        }

        return boardState;
    };

    Game.prototype.checkForWinners = function (board) {
        function isWinner(el, index, array) {
            return el === game.currentPlayer.mark;
        }
        
        // check for horizontal winners
        var horizontalChecker = function () {
            for(var i=0; i <=6; i+=3) {
                var row = board.slice(i, i+3);

                if (row.every(isWinner)) {
                    return game.gameOver();
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
                    return game.gameOver();
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