const questions = [
    {
      text: "Frage №381: Welches Wappen gehört zum Bundesland Niedersachsen?<br><img src='https://www.lebenindeutschland.eu/img/questions/381.png' alt='DE'>",
      options: [
        "--1",
        "--2",
        "--3", //R
        "--4"
      ],
      correctAnswer: 2
    },
    {
      text: "Frage №382: Welches ist ein Landkreis in Niedersachsen?",
      options: [
        "— Ammerland", //R
        "— Rhein-Sieg-Kreis",
        "— Nordfriesland",
        "— Vogtlandkreis"
      ],
      correctAnswer: 0
    },
    {
      text: "Frage №383: Für wie viele Jahre wird der Landtag in Niedersachsen gewählt?",
      options: [
        "— 3",
        "— 4",
        "— 5", //R
        "— 6"
      ],
      correctAnswer: 2
    },
    {
      text: "Frage №384: Ab welchem Alter darf man in Niedersachsen bei Kommunalwahlen wählen?",
      options: [
        "— 14",
        "— 16", //R
        "— 18",
        "— 20"
      ],
      correctAnswer: 1
    },
    {
      text: "Frage №385: Welche Farben hat die Landesflagge von Niedersachsen?",
      options: [
        "— weiß-blau",
        "— schwarz-rot-gold", //R
        "— schwarz-gelb",
        "— blau-weiß-rot"
      ],
      correctAnswer: 1
    },
    {
      text: "Frage №386: Wo können Sie sich in Niedersachsen über politische Themen informieren?",
      options: [
        "— bei der Landeszentrale für politische Bildung", //R
        "— beim Ordnungsamt der Gemeinde",
        "— bei der Verbraucherzentrale",
        "— bei den Kirchen"
      ],
      correctAnswer: 0
    },
    {
      text: "Frage №387: Die Landeshauptstadt von Niedersachsen heißt …    ",
      options: [
        "— Hannover", //R
        "— Braunschweig.",
        "— Wolfsburg.",
        "— Osnabrück."
      ],
      correctAnswer: 0
    },
    {
      text: "Frage №388: Welches Bundesland ist Niedersachsen? <br><img src='https://www.lebenindeutschland.eu/img/questions/388.png' alt='DE'>",
      options: [
        "— 1", //R
        "— 2",
        "— 3",
        "— 4"
      ],
      correctAnswer: 0
    },
    {
      text: "Frage №389: Wie nennt man den Regierungschef / die Regierungschefin in Niedersachsen?",
      options: [
        "— Erster Minister / Erste Ministerin",
        "— Premierminister / Premierministerin",
        "— Bürgermeister / Bürgermeisterin",
        "— Ministerpräsident / Ministerpräsidentin" //R
      ],
      correctAnswer: 3
    },
    {
      text: "Frage №390: Welchen Minister / welche Ministerin hat Niedersachsen nicht?",
      options: [
        "— Justizminister / Justizministerin",
        "— Außenminister / Außenministerin", //R
        "— Finanzminister / Finanzministerin",
        "— Innenminister / Innenministerin"
      ],
      correctAnswer: 1
    }
  ];

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

    resultContainer.innerHTML = `<p>Sie haben ${score} von 5 Fragen richtig beantwortet.</p>;
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  createQuiz();