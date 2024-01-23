// script.js

let questions;

// Замените путь на корректный, если ваш файл questions.json находится в другом месте
const questionsUrl = 'json/questions.json';

fetch(questionsUrl)
  .then(response => response.json())
  .then(data => {
    questions = data;
    createQuiz();
  })
  .catch(error => console.error('Error fetching questions:', error));

let randomQuestions;

function createQuiz() {
  const quizContainer = document.getElementById("quiz-container");
  randomQuestions = shuffle([...questions]).slice(0, 5);

  randomQuestions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${index + 1}. ${question.text}</p>`;
    question.options.forEach((option, optionIndex) => {
      questionDiv.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${optionIndex}">
          ${option}
        </label><br>
      `;
    });
    quizContainer.appendChild(questionDiv);
  });
}

function checkAnswers() {
  const resultContainer = document.getElementById("result-container");
  let score = 0;

  document.querySelectorAll('input:checked').forEach((selectedOption, index) => {
    const userAnswer = parseInt(selectedOption.value, 10);
    const correctAnswer = randomQuestions[index].correctAnswer;

    const label = selectedOption.closest('label');
    label.classList.remove('correct', 'incorrect');

    if (userAnswer === correctAnswer) {
      label.classList.add('correct');
      score++;
    } else {
      label.classList.add('incorrect');
      // Если выбран неправильный ответ, подсветим правильный
      const correctLabel = label.parentNode.querySelector(`input[value="${correctAnswer}"]`).closest('label');
      correctLabel.classList.add('correct');
    }
  });

  resultContainer.innerHTML = `<p>Sie haben ${score} von 5 Fragen richtig beantwortet.</p>`;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

