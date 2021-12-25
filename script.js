const fireButton = document.getElementById('fireButton');
const guessInput = document.getElementById('guessInput');


var view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    var cell = document.getElementById(location)
    cell.setAttribute('class', 'hit');

  },
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute('class', 'miss');
  }
}

var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipSunk: 0,

  ships: [  { locations: ['06', '16', '26'], hits: ['', '', ''] },
            { locations: ['24', '34', '44'], hits: ['', '', ''] },
            { locations: ['10', '11', '12'], hits: ['', '', ''] } ],
  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = 'hit';
        view.displayHit(guess);
        view.displayMessage('HIT!');
        if (this.isSunk(ship)) {
          view.displayMessage('You sank my battleship!');
          this.shipSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage('You missed.');
    return false;
  },
  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== 'hit') {
        return false;
      }
    }
    return true;
  }             
} 

var contoller = {
  guesses: 0,

  processGuess: function(guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipSunk === model.numShips) {
        view.displayMessage('You sank all my battleships, in ' +
                                          this.guesses + ' guesses');
      }
    }
  }

}

function parseGuess(guess) {
  var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  if (guess === null || guess.length !== 2) {
    alert('Oops, please enter a letter and a number on the board.');
  } else {
    firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar.toUpperCase());
    var column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      alert('Oops, that isn\'t on the board. ');
    } else if (row < 0 || row >= model.boardSize ||
               column < 0 || column >= model.boardSize) {
        alert('Oops, that\'s off the board!');
    } else {
      return row + column;
    }
  }
  return null;
}

function init() {
  fireButton.onclick = handleFireButton;
  guessInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault()
      fireButton.click();
      // return false;
    }
  });  
}


function handleFireButton() {
  var guess = guessInput.value;
  contoller.processGuess(guess);

  guessInput.value = '';
}

window.onload = init;
// contoller.processGuess('A6')
// contoller.processGuess('B6')
// contoller.processGuess('B5')
// contoller.processGuess('C6')