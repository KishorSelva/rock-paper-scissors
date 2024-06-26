let scoreElement = document.querySelector('.js-score-display');
let resultElement = document.querySelector('.js-result-display');
let movesElement = document.querySelector('.js-moves-display');
let randomNum = 0;
let playerMove = '';
let computerMove = '';
let playerImage = '';
let computerImage = '';

let rockButtonElement = document.querySelector('.js-rock-button');
let paperButtonElement = document.querySelector('.js-paper-button');
let scissorsButtonElement = document.querySelector('.js-scissors-button');

document.querySelector('.js-auto-play-button').addEventListener('click', autoPlay);

document.querySelector('.js-reset-button').addEventListener('click', getConfirmation);

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    getConfirmation();
  }
})


document.body.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    autoPlay();
    
  }
})

function getConfirmation() {
  document.querySelector('.confirmation-text').innerHTML = `
    Are you sure you want to reset the score?
    <button class="reset-score-button js-yes-button">Yes</button>
    <button class="reset-score-button js-no-button">No</button>
  `

  document.querySelector('.js-yes-button').addEventListener('click', () => {
    resetScore();
    document.querySelector('.confirmation-text').innerHTML = '';
  })
  
  document.querySelector('.js-no-button').addEventListener('click', () => {
    document.querySelector('.confirmation-text').innerHTML = '';
  })
}




let scoreString = localStorage.getItem('score');

let score =  JSON.parse(scoreString) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};

let hintElement = document.querySelector('.js-hint-display');

let hintGiven = false;

function giveHint() {
  if(!hintGiven) {
    hintElement.innerHTML = 'Hint: You can use a, r, p, s, and backspace keys for controls';
    setTimeout(() => {
      hintElement.innerHTML ='';
    }, 6000)
  }
  hintGiven = true;
}

rockButtonElement.addEventListener('click', () => {
  playerImage = 'images/rock-emoji.png';
  getResult('Rock');
  giveHint();
});

paperButtonElement.addEventListener('click', () => {
  playerImage = 'images/paper-emoji.png';
  getResult('Paper');
  giveHint();
});

scissorsButtonElement.addEventListener('click', () => {
  playerImage = 'images/scissors-emoji.png';
  getResult('Scissors');
  
});

function updateScoreElement () {
  scoreElement.innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
}

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r' || event.key === 'R') {
    playerImage = 'images/rock-emoji.png';
    getResult('Rock');
  }  else if (event.key === 'p' || event.key === 'P') {
    playerImage = 'images/paper-emoji.png';
    getResult('Paper');
  } else if (event.key === 's' || event.key === 'S') {
    playerImage = 'images/scissors-emoji.png';
    getResult('Scissors');
  }
});

updateScoreElement();


function resetScore() {
  score.Wins = 0;
  score.Losses = 0;
  score.Ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  resultElement.innerHTML = '';
  movesElement.innerHTML = '';
}

function selectCompMove() {

  randomNum = Math.random();
  
  if(randomNum < 0.33) {
    computerMove = 'Rock';
    computerImage = 'images/rock-emoji.png'
  } else if (randomNum < 0.66) {
    computerMove = 'Paper';
    computerImage = 'images/paper-emoji.png'
  } else {
    computerMove = 'Scissors';
    computerImage = 'images/scissors-emoji.png'
  }

  return computerMove;
}


function getResult(playerMove) {
  let result = '';
  computerMove = selectCompMove();

  if (computerMove === playerMove) {
    result = "Tie.";
  } else if (computerMove === 'Rock') {
    if (playerMove ==="Paper") {
      result = 'You win.';
    } else {
      result = 'You lose.';
    }
  } else if (computerMove === 'Paper') {
    if (playerMove === "Scissors") {
      result = 'You win.';
    } else {
      result = 'You lose.'
    }
  } else {
    if (playerMove === 'Rock') {
      result = 'You win.';
    } else {
      result = 'You lose';
    }
  }

  

  if (result === 'Tie.') {
    score.Ties++;

    
  } else if (result === 'You win.') {
    score.Wins++;
  } else {
    score.Losses++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  resultElement.innerHTML = `${result}`
  movesElement.innerHTML = `You <img src=${playerImage} class="move-image">  <img src=${computerImage} class="move-image">Computer `

  updateScoreElement();

}

let myInterval = '';

function autoPlay() {
  giveHint()
  let buttonElement = document.querySelector('.js-auto-play-button');

  if (buttonElement.classList.contains('is-toggled')) {
    buttonElement.classList.remove('is-toggled')
    clearInterval(myInterval);
    buttonElement.innerHTML = 'Auto Play';
  } else {
    let play = function() {
      let playerMove = selectCompMove();
      if (playerMove === 'Rock') {
        playerImage ='images/rock-emoji.png';
      } else if (playerMove === 'Paper') {
        playerImage = 'images/paper-emoji.png';
      } else {
        playerImage = 'images/scissors-emoji.png';
      }
      getResult(playerMove);
    }
    myInterval = setInterval(play, 1000);
    buttonElement.classList.add('is-toggled');
    buttonElement.innerHTML = 'Stop';
  }



}