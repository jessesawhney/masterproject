let screen = 'home';  // Current screen: 'home', 'game', or 'level'
let currentGame = 0;  // Current selected game number
let currentLevel = 0;  // Current selected level (0 for Game 1 Level 1, 1 for Game 1 Level 2)
let buttonColor = '#50e0ff';  // Button color
let textColor = '#000000';  // Text color
let gameActive = false;  // Flag to track if the game is active

// Define the total time for each level
let levelTimes = [30, 20]; // Game 1 Level 1, Game 1 Level 2

function setup() {
  createCanvas(600, 400);  // Create a canvas for rendering the interface
  textAlign(CENTER, CENTER);  // Set text alignment
  textSize(24);  // Set the text size
}

function draw() {
  background(220);  // Set the background color

  if (gameActive) {
    // Run the game code
    runGame();
  } else {
    if (screen === 'home') {
      drawHomeScreen();  // Display the home screen
    } else if (screen === 'game') {
      drawGameScreen();  // Display the game selection screen
    } else if (screen === 'level') {
      drawLevelScreen();  // Display the level selection screen
    }
  }
}

function drawHomeScreen() {
  background('#ffffff');  // Set the background color for the home screen

  fill(textColor);  // Set text color
  text('Games Galore', width / 2, 100);  // Display the title

  drawGameButton(1);  // Display game buttons
  drawGameButton(2);
  drawGameButton(3);
}

function drawGameButton(gameNumber) {
  let x = width / 4 * gameNumber;
  let y = 250;

  fill(buttonColor);  // Set button color
  rect(x - 75, y - 30, 150, 60, 10);  // Draw a button

  fill(textColor);  // Set text color
  text('Game ' + gameNumber, x, y);  // Display the game number on the button
}

function drawGameScreen() {
  background(200);  // Set the background color for the game selection screen

  fill(textColor);  // Set text color
  text('Choose a Level', width / 2, 100);  // Display the level selection title

  for (let i = 1; i <= 3; i++) {
    drawLevelButton(i);  // Display level selection buttons
  }

  drawBackToHomeButton();  // Display a button to go back to the home screen
}

function drawLevelButton(levelNumber) {
  let x = width / 4 * levelNumber;
  let y = 250;

  fill(buttonColor);  // Set button color
  rect(x - 75, y - 30, 150, 60, 10);  // Draw a button

  fill(textColor);  // Set text color
  text('Level ' + levelNumber, x, y);  // Display the level number on the button
}

function drawLevelScreen() {
  background(220);  // Set the background color for the level selection screen

  fill(textColor);  // Set text color
  text('Game ' + currentGame + ', Level ' + (currentLevel + 1), width / 2, 100);  // Display the selected game and level

  drawBackToHomeButton();  // Display a button to go back to the home screen
}

function drawBackToHomeButton() {
  fill(buttonColor);  // Set button color
  rect(width / 2 - 75, 350, 150, 60, 10);  // Draw a button

  fill(textColor);  // Set text color
  text('Back to Home', width / 2, 380);  // Display "Back to Home" on the button
}

function mouseClicked() {
  if (gameActive) {
    // Handle clicks during the game (if needed)
  } else if (screen === 'home') {
    for (let i = 1; i <= 3; i++) {
      let x = width / 4 * i;
      let y = 250;
      let buttonX1 = x - 75;
      let buttonX2 = x + 75;
      let buttonY1 = y - 30;
      let buttonY2 = y + 30;

      if (mouseX > buttonX1 && mouseX < buttonX2 && mouseY > buttonY1 && mouseY < buttonY2) {
        screen = 'game';  // Transition to the game screen
        currentGame = i;  // Set the selected game number
        break;
      }
    }
  } else if (screen === 'game') {
    for (let i = 1; i <= 3; i++) {
      let x = width / 4 * i;
      let y = 250;
      let buttonX1 = x - 75;
      let buttonX2 = x + 75;
      let buttonY1 = y - 30;
      let buttonY2 = y + 30;

      if (mouseX > buttonX1 && mouseX < buttonX2 && mouseY > buttonY1 && mouseY < buttonY2) {
        screen = 'level';  // Transition to the level selection screen
        currentLevel = i - 1;  // Set the selected level (0 for Level 1, 1 for Level 2)
        initializeGame(); // Initialize the game for the selected level
        break;
      }
    }

    let backToHomeButtonX1 = width / 2 - 75;
    let backToHomeButtonX2 = width / 2 + 75;
    let backToHomeButtonY1 = 350 - 30;
    let backToHomeButtonY2 = 350 + 30;

    if (mouseX > backToHomeButtonX1 && mouseX < backToHomeButtonX2 && mouseY > backToHomeButtonY1 && mouseY < backToHomeButtonY2) {
      screen = 'home';  // Transition back to the home screen
    }
  } else if (screen === 'level') {
    let backToHomeButtonX1 = width / 2 - 75;
    let backToHomeButtonX2 = width / 2 + 75;
    let backToHomeButtonY1 = 350 - 30;
    let backToHomeButtonY2 = 350 + 30;

    if (mouseX > backToHomeButtonX1 && mouseX < backToHomeButtonX2 && mouseY > backToHomeButtonY1 && mouseY < backToHomeButtonY2) {
      screen = 'home';  // Transition back to the home screen
    }
  }
}

function initializeGame() {
  sentences = [...sentenceList];  // Create a copy of the sentenceList
  score = 0;
  sentenceIndex = 0;
  generateRandomSentence();
  startTime = millis();
  timeLeft = levelTimes[currentLevel]; // Set totalTime based on the current level
  timer = setInterval(countdown, 1000);
  userInput = "";
  gameOver = false;
}

function runGame() {
  background(220);

  if (!gameOver) {
    textSize(32);
    text("Time: " + timeLeft + "s", width / 2, 30);
    text("Score: " + score, width / 2, 70);

    // Display the current sentence
    textSize(24);
    text(currentSentence, width / 2, height / 2 - 30);

    // Display the user input below the text
    text("You are typing:", width / 2, height / 2 + 30);
    text(userInput, width / 2, height / 2 + 70);

    if (timeLeft <= 0) {
      gameOver = true;
      clearInterval(timer);
    }
  
    if (userInput === currentSentence) {
      // Proceed to the next sentence, update the score, and reset the timer
      sentenceIndex++;
      if (sentenceIndex < sentences.length) {
        generateRandomSentence();
        userInput = "";
        score += 1;
      } else {
        // All sentences are completed
        gameOver = true;
      }
    }
  } else {
    textSize(32);
    if (sentenceIndex < sentences.length) {
      text("Game Over", width / 2, height / 2 - 20);
      text("Final Score: " + score, width / 2, height / 2 + 20);
    } else {
      text("The end", width / 2, height / 2 - 20);
      text("Total Score: " + score, width / 2, height / 2 + 20);
    }
  }
}

function countdown() {
  timeLeft--;
}

function keyTyped() {
  if (!gameOver && userInput.length < currentSentence.length) {
    userInput += key;
  }
}

function generateRandomSentence() {
  let index = floor(random(sentences.length));
  currentSentence = sentences[index];
  sentences.splice(index, 1);
}

function keyPressed() {
  if (keyCode === BACKSPACE && !gameOver && userInput.length > 0) {
    userInput = userInput.slice(0, userInput.length - 1);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Define the list of sentences
let sentenceList = [
  "The quick brown fox jumps over the lazy dog.",
  "A watched pot never boils.",
  "All that glitters is not gold.",
  "Actions speak louder than words.",
  "Life is a beautiful journey.",
  "Never give up on your dreams."
];
