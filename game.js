document.addEventListener("DOMContentLoaded", function() { 
    var won = false;
    var allMarks = [];
    var players = {
                    player1 : {
                        name: "Player 1",
                        score : 0, 
                        mark : 'x'
                    },

                    player2 : {
                        name: "Player 2",
                        score: 0, 
                        mark: 'o'
                    }
                };

    var currentPlayer = players.player1;

    //on click of a position, fill with a mark if marks isn't already there
    document.getElementById('board').addEventListener("click", function(event) {
       if (event.target.className === "cell" && (event.target.innerText === "" && won == false)) {
            event.target.innerText = currentPlayer.mark;
       }
       init();
    });

    //run loop
    var init = function () {
        getAllMarks();
        checkForWinners();
        if (catsGameChecker() == true) {
            return
        };
        allMarks = [];
        if (won == false) {
            changePlayer();
        };
    };


    //change turns
    var changePlayer = function () {
        currentPlayer == players.player1 ? currentPlayer = players.player2 : currentPlayer = players.player1;
        header.innerText = currentPlayer.name + "'s turn.";
    }

    //function to store marks and their positions
    var getAllMarks = function () {
        var cells = document.getElementsByClassName("cell");

        for (i = 0; i < cells.length; i++) {
            allMarks.push(cells[i].innerText);
        }
    };

    var checkForWinners = function () {
        horizontalChecker();
        verticalChecker();
        diagonalChecker();
    };

    function isWinner(el, index, array) {
        //TODO: change this to player.mark
        return el == currentPlayer.mark;
    }

        // check for horizontal winners
    var horizontalChecker = function () {
        var start = 0,
            end = 3;

        while (start <= 6) {
            var row = allMarks.slice(start, end);
            return row.every(isWinner) ? gameOver() : (start +=3, end +=3);
        }
    };

        // check for vertical winners
    var verticalChecker = function () {
        // TODO: filter
        var col = [];
    
        for (i = 0; i <= 2; i++) {
            col.push(allMarks[i], allMarks[i+3], allMarks[i+6]);

            if (col.every(isWinner)) {
                return gameOver();
            }

            col = [];
        }
    };    

        //     check for diagonal winners
        var diagonalChecker = function () {
            // // if any corners  && middle == win
            var offset = 4;
            var diagonal = [];

            for (i = 0; i <= 2; i+=2 ) {
                diagonal.push(allMarks[i], allMarks[i+offset], allMarks[((i+offset)+offset)]);

                if (diagonal.every(isWinner)) { gameOver(); }
                diagonal = [];
                offset -=2;
            };
        };

    var catsGameChecker = function () {
        if (allMarks.includes("") == false && won == false) {
            header.innerText = "Cat's game! No winners.";
            return true
        } 
    }
    
    var gameOver = function () {
        var header = document.getElementById("header");

        won = true;
        header.innerText = "Game Over!";
        confirm(currentPlayer.name + " won!");
        currentPlayer.score +=1;
    };
});
