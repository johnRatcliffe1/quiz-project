// Sets up the quiz and keeps track of the score, questions and where we are in the quiz
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.currentQuestionIndex = 0; // Fixed variable name
}
// Checks the users quess answer, if correct it will add a point to the score, then moves to next question
Quiz.prototype.guess = function (answer) {
  if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.currentQuestionIndex++; // Fixed variable name
};
// Used to get current question, based on current question index
Quiz.prototype.getCurrentQuestion = function () {
  return this.questions[this.currentQuestionIndex]; // Fixed variable name
};
// Checks to see if the quiz has ended, comparing the current question index to the total number of questions
Quiz.prototype.hasEnded = function () {
  return this.currentQuestionIndex >= this.questions.length; // Fixed variable name
};
// Sets up each question with the text, choices and correct answers
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}
// Checks to see if users choice is correct
Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};
// Displays what the user will see.
const QuizUI = {
  // Checks to see if the quiz is over, if it is, displays the score. If not goes to the next question.
  displayNext: function () {
    if (quiz.hasEnded()) {
      this.displayScore();
    } else {
      this.displayQuestion();
      this.displayChoices();
      this.displayProgress();
    }
  },
  // Grabs the text of the current question and displays it on screen
  displayQuestion: function () {
    this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
  },
  // Grabs the choices of the current question and displays them on screen
  displayChoices: function () {
    const choices = quiz.getCurrentQuestion().choices;

    for (let i = 0; i < choices.length; i++) {
      this.populateIdWithHTML("choice" + i, choices[i]);
      this.guessHandler("guess" + i, choices[i]);
    }
  },
  // Creates html string with the result and score then displays it on screen
  displayScore: function () {
    let gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2>"; // Fixed variable name
    this.populateIdWithHTML("quiz", gameOverHTML);
  },
  //takes element id and some text, then updates the element content with the text
  populateIdWithHTML: function (id, text) {
    const element = document.getElementById(id);
    element.innerHTML = text;
  },
  // Sets up the click event for each choice. Clicking a choice calles quiz.guess with user quess then moves on o the next question
  guessHandler: function (id, guess) {
    const button = document.getElementById(id);
    button.onclick = function () {
      quiz.guess(guess);
      QuizUI.displayNext();
    };
  },
  // Shows the user what question they are on out of the total number of questions
  displayProgress: function () {
    const currentQuestionNumber = quiz.currentQuestionIndex + 1; // Fixed variable name
    this.populateIdWithHTML(
      "progress",
      "Question " + currentQuestionNumber + " of " + quiz.questions.length
    );
  },
};
// Creates an array of questions using the questions const. Each question has its text, choices and correct answer
const questions = [
  new Question(
    "Which one is not classed as fruit?", // Text
    ["Apple", "Melon", "Potato", "Banana"], // Choices
    "Potato" // Correct answer
  ),
  new Question(
    "What is the official language used in Brazil?",
    ["French", "Portuguese", "English", "Spanish"],
    "Portuguese"
  ),
  new Question(
    "There are ____ years in a decade.",
    ["10", "7", "1", "5"],
    "10"
  ),
  new Question(
    "An ____ can fly.",
    ["Car", "Train", "Boat", "Airplane"],
    "Airplane"
  ),
  new Question(
    "What is capital of Japan?",
    ["Paris", "Ottawa", "London", "Tokyo"],
    "Tokyo"
  ),
];
// Finally we create a quiz object using the quiz const and pass in the array of questions
const quiz = new Quiz(questions);

QuizUI.displayNext();
