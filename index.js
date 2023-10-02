let currentQuestion = 0;
let questions = [];

async function fetchData() {
  try {
    const response = await fetch("questions.json");

    if (!response.ok) throw new Error("ERROR: Network response was not ok.");

    questions = await response.json();

    loadQuestions();
  } catch (error) {
    console.error(error);
  }
}

function loadQuestions() {
  const question = document.getElementById("question");
  question.innerHTML = questions[currentQuestion].question;

  for(let i = 1; i <= 4; i++) {
    const btn = document.getElementById("answer" + i);
    btn.innerHTML = questions[currentQuestion].options[i - 1];
  }
}

function checkAnswer(id) {
  const input = document.getElementById(id).innerHTML;
  const button = document.getElementById(id);
  const answer = questions[currentQuestion].options[questions[currentQuestion].correctAnswer];
  const result = document.getElementById("result");

  if (input !== answer) {
    // Display incorrect
    button.style.backgroundColor = "#F44336"
    result.style.visibility = "visible"
    result.innerHTML = `${input} is incorrect!`;

    // Enable retry button
    const retryBtn = document.getElementById("retry");
    retryBtn.style.visibility = "visible"
  } else {
    button.style.backgroundColor = "#4CAF50"
    result.style.visibility = "visible"
    result.innerHTML = `${input} is correct!`;

    // Enable next button
    const nextBtn = document.getElementById("next");
    nextBtn.style.visibility = "visible";
  }

  // Disable the answer buttons
  disableButtons();
}

function disableButtons() {
  for(let i = 1; i <= 4; i++) {
    const btn = document.getElementById("answer" + i);
    btn.disabled = true;
  }
}

function nextQuestion() {
  // Randomize the currentQuestion index
  currentQuestion = Math.floor(Math.random() * trivia.length);

  // Check if there are more questions
  if (currentQuestion < trivia.length) {
    // Reset button styles and re-enable them
    for(let i = 1; i <= 4; i++) {
      const btn = document.getElementById("answer" + i);
      btn.disabled = false;
      btn.style = ""; // Reset any applied styles
    }

    // Hide the retry button
    const nextBtn = document.getElementById("next");
    nextBtn.style.visibility = "hidden";

    // Clear the result message
    const result = document.getElementById("result");
    result.style.visibility = "hidden";
    result.innerHTML = "";

    loadQuestions();
  } else {
    // If no more questions, display a completion message and hide the "Next Question" button
    const result = document.getElementById("result");
    result.innerHTML = "Quiz completed! Thank you for playing!";
    const nextBtn = document.getElementById("next");
    nextBtn.style.visibility = "hidden";
  }
}

function retryQuiz() {
  // Reset button styles and re-enable them
  for(let i = 1; i <= 4; i++) {
    const btn = document.getElementById("answer" + i);
    btn.disabled = false;
    btn.style = ""; // Reset any applied styles
  }

  // Hide the retry button
  const retryBtn = document.getElementById("retry");
  retryBtn.style.visibility = "hidden";

  // Clear the result message
  const result = document.getElementById("result");
  result.style.visibility = "hidden";
  result.innerHTML = "";
}

fetchData();