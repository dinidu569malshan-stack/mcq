const questions = [
  {
    question: "What does CPU stand for?",
    answers: [
      { text: "Central Processing Unit", correct: true },
      { text: "Computer Personal Unit", correct: false },
      { text: "Central Program Utility", correct: false },
      { text: "Control Processing User", correct: false }
    ]
  },
  {
    question: "Which language is mainly used to style web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "Python", correct: false },
      { text: "CSS", correct: true },
      { text: "SQL", correct: false }
    ]
  },
  {
    question: "Which symbol is used for a single-line comment in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "##", correct: false },
      { text: "<!-- -->", correct: false },
      { text: "**", correct: false }
    ]
  },
  {
    question: "Which one is a database management system?",
    answers: [
      { text: "MySQL", correct: true },
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
      { text: "Photoshop", correct: false }
    ]
  },
  {
    question: "What does RAM stand for?",
    answers: [
      { text: "Read Access Memory", correct: false },
      { text: "Random Access Memory", correct: true },
      { text: "Rapid Action Memory", correct: false },
      { text: "Run Access Module", correct: false }
    ]
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    answers: [
      { text: "<h6>", correct: false },
      { text: "<head>", correct: false },
      { text: "<h1>", correct: true },
      { text: "<title>", correct: false }
    ]
  },
  {
    question: "Which protocol is commonly used to browse websites?",
    answers: [
      { text: "HTTP", correct: true },
      { text: "FTP only", correct: false },
      { text: "SMTP", correct: false },
      { text: "Bluetooth", correct: false }
    ]
  },
  {
    question: "Which keyword is used to create a constant in JavaScript?",
    answers: [
      { text: "let", correct: false },
      { text: "const", correct: true },
      { text: "var", correct: false },
      { text: "static", correct: false }
    ]
  },
  {
    question: "Which device stores data permanently?",
    answers: [
      { text: "RAM", correct: false },
      { text: "Cache", correct: false },
      { text: "SSD", correct: true },
      { text: "Register", correct: false }
    ]
  },
  {
    question: "Which of these is an object-oriented programming language?",
    answers: [
      { text: "Java", correct: true },
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
      { text: "JSON", correct: false }
    ]
  }
];

const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");
const timerEl = document.getElementById("timer");
const liveScore = document.getElementById("liveScore");
const quizArea = document.getElementById("quizArea");
const resultArea = document.getElementById("resultArea");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  liveScore.textContent = score;
  quizArea.classList.remove("hidden");
  resultArea.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();

  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  questionNumber.textContent =
    `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  progressBar.style.width =
    `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = answer.text;
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });

  startTimer();
}

function resetState() {
  clearInterval(timer);
  nextBtn.style.display = "none";
  answerButtons.innerHTML = "";
}

function startTimer() {
  timeLeft = 15;
  timerEl.textContent = `${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      lockAnswers();
      nextBtn.style.display = "block";
    }
  }, 1000);
}

function selectAnswer(event) {
  clearInterval(timer);

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
    liveScore.textContent = score;
  } else {
    selectedButton.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextBtn.style.display = "block";
}

function lockAnswers() {
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  clearInterval(timer);
  quizArea.classList.add("hidden");
  resultArea.classList.remove("hidden");
  finalScore.textContent = score;

  const percentage = (score / questions.length) * 100;

  if (percentage >= 80) {
    resultMessage.textContent = "Excellent work! You know your ICT basics very well.";
  } else if (percentage >= 50) {
    resultMessage.textContent = "Good job! Keep practicing to improve your score.";
  } else {
    resultMessage.textContent = "Keep learning and try again. You can improve!";
  }
}

restartBtn.addEventListener("click", startQuiz);

startQuiz();
