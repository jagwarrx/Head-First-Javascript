var view = {

    displayMessage: function(msg) {

        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },

    displayHit: function(location) {

        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit")
    },

    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss")

    }

}


// model holds logic and state

var model = {

    boardsize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [{
            locations: ["0", "0", "0"],
            hits: ["", "", ""]
        },
        {
            locations: ["0", "0", "0"],
            hits: ["", "", ""]
        },
        {
            locations: ["0", "0", "0"],
            hits: ["", "", ""]
        }
    ],

    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            //console.log(ship)
            var index = ship.locations.indexOf(guess);
            //console.log(index);
            if (index >= 0) {
                // We have a hit
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    view.displayMessage("Battleship Sunk!");
                    this.shipsSunk++;
                }
                return true;
            }

        }
        view.displayMiss(guess);
        view.displayMessage("MISS!");
        return false;

    },

    isSunk: function(ship) {

        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },

    generateShipLocations: function() {
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collison(locations));
            this.ships[i].locations = locations;
        }
    },

    generateShip: function() {
        var direction = Math.floor(Math.random() * 2);
        var row, col;

        if (direction === 1) {
            row = Math.floor(Math.abs(Math.random()) * this.boardsize);
            col = Math.floor(Math.abs(Math.random()) * (this.boardsize - this.shipLength));
        } else {
            row = Math.floor(Math.abs(Math.random()) * this.boardsize - this.shipLength);
            col = Math.floor(Math.abs(Math.random()) * (this.boardsize));
        }

        var newShipLocations = []
        for (var i = 0; i < this.shipLength; i++) {

            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));

            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        console.log(newShipLocations);
        return newShipLocations;
    },

    collison: function(locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = model.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }

    }
}


var controller = {

    guesses: 0,

    processGuess: function(guess) {

        var location = parseGuess(guess);
        // console.log(location);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            // console.log(hit);
            if (hit && model.shipsSunk == model.numShips) {
                view.displayMessage("You sank all the ships! Guesses: " + this.guesses)
            }
        }
    }

}



function parseGuess(guess) {

    var alphabet = ["A", "B", "C", "D", "E", "F", "G"]

    if (guess === null || guess.length !== 2) {
        alert("Oops. Enter letter followed by number.")
    } else {
        firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1); // Second character in guess

        if (row == NaN || column == NaN) {
            alert("Oops. That's not on the board.");
        } else if (row < 0 || row >= model.boardsize || column < 0 || column >= model.boardsize) {
            alert("Oops. That's not on the board.");
        } else {
            return row + column;
        }
    }

    return null;
}


function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocations();
}


function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);

    guessInput.value = "";
}


window.onload = init;