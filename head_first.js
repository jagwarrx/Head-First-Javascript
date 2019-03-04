var loc1 = Math.floor(Math.random() * 5);
var loc2 = loc1 + 1;
var loc3 = loc2 + 1;
var curr_guess;
var hits = 0;
var no_of_guesses = 0;
var isSunk = false;

console.log(loc1, loc2, loc3);

while (!isSunk) {
    curr_guess = get_guess();
    no_of_guesses = no_of_guesses + 1;
    if (check_guess(curr_guess) == true) {
        hits = hits + 1;
        alert('HIT!');
        console.log('reached here');
    } else {
        alert("MISS!");
    }

    console.log(hits);

    if (hits == 3) {
        isSunk = true;
        alert('Congrats! You sunk the ship!');
    }

}

var stats = "You took" + no_of_guesses + "guesses to sink the ship; Your accuracy:" + (3 / no_of_guesses);
alert(stats)


function get_guess() {
    var guess = prompt("Which tile do you choose?");
    if (guess < 0 || guess > 6) {
        alert("Enter a valid number");
        get_guess();
    } // not a number
    return guess;
}


function check_guess(guess) {
    if (guess == loc1 || guess == loc2 || guess == loc3) {
        return true;
    } else {
        return false;
    }
}