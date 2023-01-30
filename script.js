// Global Variables
const quizzesArea = document.querySelector(".quizzes-area-container");
const homeScreen = document.querySelector(".first-screen-container");
const secondScreen = document.querySelector(".second-screen-container");
const teste = secondScreen.parentElement;

let makequestion = document.querySelector(".question-screen-quizz");
let makelevels = document.querySelector(".levels-screen-quizz");
let makefinish = document.querySelector(".finish-screen-quizz");

// Get all Quizzes from the server and display them on the homepage
function getAllQuizzes() {
  const data = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  data.then((response) => {
    response = response.data;

    // Create the template for the quizzes and adds them to the quizz area
    // If the title has more than 50 words then it cuts the title and concatenates with three dots
    for (i = 0; i < response.length; i++) {
      quizzesArea.innerHTML += `
                                <div class="quizz" style="background-image: url('${
                                  response[i].image
                                }');" onclick="startQuizz(${response[i].id})">
                                    <div class="overlay-gradient">
                                        <h2>
                                            ${
                                              response[i].title.length > 50
                                                ? response[i].title.substring(
                                                    0,
                                                    50
                                                  ) + "..."
                                                : response[i].title
                                            }
                                        </h2>
                                    </div>
                                </div>
                                `;
    }
  });
}

// Put the class Hidden on the first screen and remove from the second
function toggleScreen(screenFrom, screenTo, isBackHome = false) {
  clearVariables();

  if (screenTo.classList.contains("hidden")) {
    screenFrom.classList.add("hidden");
    screenTo.classList.remove("hidden");
  }

  if (isBackHome == true) {
    screenFrom.innerHTML = "";
  }
}

function hiddenquestion(quests) {
  for (i = 1; i <= quests; i++) {
    let esse = makequestion.querySelector(".pergunta" + i);
    esse.classList.add("hidden");
  }
}

function showquestion(e) {
  let quests = document.querySelector(".qtd-quest").value;
  hiddenquestion(quests);
  let pai = e.parentNode;
  let div = document.querySelector("." + String(pai.classList[1]).substr(7));
  div.classList.remove("hidden");
}

function CreateQuestion() {
  let quests = document.querySelector(".qtd-quest").value;
  let create = document.querySelector(".screen-create-quizz");
  create.classList.add("hidden");
  makequestion.classList.remove("hidden");

  for (i = 1; i <= quests; i++) {
    makequestion.innerHTML += `
                                <div class="question-header header-pergunta${i}">
                                    <h1 class="question-h1">Pergunta ${i}</h1>
                                    <ion-icon onclick="showquestion(this)" name="create-outline"></ion-icon>
                                </div>
                                <div class="question pergunta${i}">
                                    <input type="text" class="title-question" placeholder="Título do seu quizz"/>
                                    <input type="text" class="corBackground" placeholder="Cor de fundo da pergunta"/>
                                    <h1 class="question-h1">Resposta Correta</h1>
                                    <input type="text" class="correct-answer" placeholder="Resposta correta">
                                    <input type="text" class="correct-url" placeholder="URL da imagem">
                                    <h1 class="question-h1">Respostas Incorreta</h1>
                                    <input type="text" class="incorrect-answer1" placeholder="Resposta incorreta 1">
                                    <input type="text" class="incorrect-url1" placeholder="URL da imagem 1">
                                    <input type="text" class="incorrect-annswer2" placeholder="Resposta incorreta 2">
                                    <input type="text" class="incorrect-url2" placeholder="URL da imagem 2">
                                    <input type="text" class="incorrect-answer3" placeholder="Resposta incorreta 3">
                                    <input type="text" class="incorrect-url3" placeholder="URL da imagem 3">
                                </div>    
                                `;
  }
  makequestion.innerHTML += `<button onclick="nextCreateLevels()" class=""> Prosseguir para criar níveis</button>`;

  hiddenquestion(quests);
  let esse = makequestion.querySelector(".pergunta1");
  esse.classList.remove("hidden");
}

function createQuizz() {
  let firsthidden = document.querySelector(".first-screen-container");
  firsthidden.classList.add("hidden");
  let create = document.querySelector(".screen-create-quizz");
  create.classList.remove("hidden");
}

function nextCreateQuest() {
  if (
    (validacaotitulo() &&
      validacaourl() &&
      validacaoquest() &&
      validacaolevels()) === true
  ) {
    CreateQuestion();
  }
}

function CreateLevels() {
  let levels = document.querySelector(".qtd-levels").value;
  let create = document.querySelector(".question-screen-quizz");
  create.classList.add("hidden");
  makelevels.classList.remove("hidden");

  for (i = 1; i <= levels; i++) {
    makelevels.innerHTML += `
                                <div class="levels-header header-level${i}">
                                    <h1 class="levels-h1">Nível ${i}</h1>
                                    <ion-icon onclick="showlevels(this)" name="create-outline"></ion-icon>
                                </div>
                                <div class="level level${i}">
                                    <input type="text" class="title-levels" placeholder="Título do nível"/>
                                    <input type="text" class="porcentagem" placeholder="% de acerto mínimo"/>
                                    <input type="text" class="url-img-levels" placeholder="URL da imagem do nível">
                                    <input type="text" class="descricao-levels" placeholder="Descrição do nivel">
                                </div> 
                                `;
  }
  makelevels.innerHTML += `<button onclick="nextCreateFinish()" class="">Finalizar Quizz</button>`;

  hiddenlevels(levels);
  let esse = makelevels.querySelector(".level1");
  esse.classList.remove("hidden");
}

function showlevels(e) {
  let levels = document.querySelector(".qtd-levels").value;
  hiddenlevels(levels);
  let pai = e.parentNode;
  let div = document.querySelector("." + String(pai.classList[1]).substr(7));
  div.classList.remove("hidden");
}

function hiddenlevels(levels) {
  for (i = 1; i <= levels; i++) {
    let esse = makelevels.querySelector(".level" + i);
    esse.classList.add("hidden");
  }
}

function createLevels() {
  let firsthidden = document.querySelector(".question-screen-quizz");
  firsthidden.classList.add("hidden");
  let secondhidden = document.querySelector(".levels-screen-quizz");
  secondhidden.classList.add("hidden");
}

function nextCreateLevels() {
  if (
    (validacaoTituloPergunta() &&
      validarCorFundo() &&
      validarCorrectAnswer()) === true
  ) {
    CreateLevels();
  }
}

function CreateFinish() {
  let create = document.querySelector(".levels-screen-quizz");
  create.classList.add("hidden");
  makefinish.classList.remove("hidden");

  let titulo = document.querySelector(".title-quizz").value;
  let urlImg = document.querySelector(".url-img-quizz").value;

  makefinish.innerHTML += `
                            <div class="quizz" style="background-image: url('${
                              urlImg
                            }');">
                                <div class="overlay">
                                    <h2>
                                    ${
                                      titulo.length > 50
                                        ? titulo.substring(0, 50) + "..."
                                        : titulo
                                    }
                                    </h2>
                                </div>
                            </div>
                            <button onclick="Finalizar()">Finalizar Quizz</button>
                            <home onclick="home()">Voltar pra home</home>
                            `;
}

function nextCreateFinish() {
  if (
    (validaTituloLevel() && validaPorcentagem() && descricaoNivel()) === true
  ) {
    CreateFinish();
  }
}

function Finalizar(){
  home();
  alert("Não está finzando de fato")
}

function home() {
  makefinish.classList.add("hidden");
  let home = document.querySelector(".first-screen-container");
  home.classList.remove("hidden");
}

// Running Functions
getAllQuizzes();
