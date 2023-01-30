// Global Variables
let win = 0;
let clicks = 0;
let currentId = null;
let infos;

// Start the quizz the user just clicked
function startQuizz(id) {
  const selectedQuizz = axios.get(
    `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`
  );
  selectedQuizz.then((response) => {
    response = response.data;
    infos = response;
    currentId = id;

    let questions = ``;
    let answers = ``;
    let result;

    // Create the answers dinamically and append them on the HTML
    for (i = 0; i < response.questions.length; i++) {
      for (j = 0; j < response.questions[i].answers.length; j++) {
        answers += `
          <div class="option" onClick="isCorrect(this)" data-answer="${response.questions[i].answers[j].isCorrectAnswer}">
            <img src="${response.questions[i].answers[j].image}">
            <h3>${response.questions[i].answers[j].text}</h3>
          </div>
          `;
      }
    }

    // Create the questions dinamically and append them on the HTML
    for (i = 0; i < response.questions.length; i++) {
      questions += `
        <!-- Question Container -->
      <div class="question-container">
        <!-- Question Header Container -->
        <div class="question-header-container" style="background-color: ${response.questions[i].color};">
          <h2>${response.questions[i].title}</h2>
        </div>
        <!-- Question Header Container End -->
        <!-- Question Options Container -->
        <div class="question-options-container">
          
          ${answers}
          
        </div>
        <!-- Question Options Container End -->
      </div>
      <!-- Question Container End -->
        `;
    }

    toggleScreen(homeScreen, secondScreen);

    // Create the whole page
    secondScreen.innerHTML += `
      <!-- Banner Container -->
    <div class="banner-container" style="background-image: url('${response.image}');">
      <div class="overlay">
        <h1>${response.title}</h1>
      </div>
    </div>
    <!-- Banner Container End-->
    <!-- Content Container Second Screen -->
    <div class="content-container-second-screen">
      ${questions}
    </div>
    <!-- Content Container Second Screen End -->
      `;
  });
}

// Verify if the clicked element is the correct
function isCorrect(element) {
  const questionsContainer = element.parentElement;
  const content_container = document.querySelector(
    ".content-container-second-screen"
  );

  for (i = 0; i < questionsContainer.children.length; i++) {
    if (questionsContainer.children[i].getAttribute("data-answer") == "true") {
      questionsContainer.children[i].classList.add("right");
      questionsContainer.children[i].classList.add("not-choosed");
      questionsContainer.children[i].removeAttribute("onclick");
    } else {
      questionsContainer.children[i].classList.add("wrong");
      questionsContainer.children[i].classList.add("not-choosed");
      questionsContainer.children[i].removeAttribute("onclick");
    }
  }

  if (element.getAttribute("data-answer") == "true") {
    element.classList.add("right");
    element.classList.remove("not-choosed");
    element.removeAttribute("onclick");
    win++;
  } else {
    element.classList.add("wrong");
    element.classList.remove("not-choosed");
    element.removeAttribute("onclick");
  }

  clicks++;

  if (clicks == infos.questions.length) {
    result = createResultContainer(infos);

    content_container.innerHTML += `
      ${result}
      <!-- Finish Quizz Container -->
      <div class="finish-quizz-container">
        <!-- Restart Quizz Button Container -->
        <div class="restart-quizz-button-container">
          <button onclick="restartQuizz()">Reiniciar Quizz</button>
        </div>
        <!-- Restart Quizz Button Container End -->
        <!-- Go back Home Button Container -->
        <div class="go-back-home-button">
          <button onclick="toggleScreen(secondScreen, homeScreen, isBackHome=true)">Voltar pra home</button>
        </div>
        <!-- Go back Home Button Container End -->
      </div>
      <!-- Finish Quizz Container End -->
      `;
  }
}

// Calculate the result of the user
function calculateResult(response) {
  const questions = response.questions.length;
  const right = Math.round((win / questions) * 100);
  let level = 0;

  for (i = 0; i < response.levels.length; i++) {
    if (right >= response.levels[i].minValue) {
      level = i;
    }
  }

  const result = { win_rate: right, nivelIndex: level };
  return result;
}

// Creates the result Container
function createResultContainer(response) {
  // Create the Result Dinamically
  const resultQuizz = calculateResult(response);
  const levelResult = response.levels[resultQuizz.nivelIndex];

  result = `
  <!-- Result Container -->
  <div class="result-container">
    <!-- Result Header -->
    <div class="result-header">
      <h2>${resultQuizz.win_rate}% de acerto: ${levelResult.title}</h2>
    </div>
    <!-- Result Header End -->
    <!-- Result Body -->
    <div class="result-body">
      <!-- Image Container -->
      <div class="image-container">
        <img src="${levelResult.image}">
      </div>
      <!-- Image Container End -->
      <div class="text-container">
        <span>
          ${levelResult.text}
        </span>
      </div>
    </div>
    <!-- Result Body End -->
  </div>
  <!-- Result Container End -->
  `;

  return result;
}

// Clears all variables
function clearVariables() {
  win = 0;
  clicks = 0;
  infos = infos;
}

// Restarts the quizz
function restartQuizz() {
  secondScreen.innerHTML = "";
  startQuizz(currentId);
  clearVariables();
}
