// Global Variables 
const quizzesArea = document.querySelector('.quizzes-area-container');
let makequestion = document.querySelector(".question-screen-quizz");

// Get all Quizzes from the server and display them on the homepage
function getAllQuizzes() {
    const data = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    data.then(response => {
        response = response.data      


        // Create the template for the quizzes and adds them to the quizz area
        // If the title has more than 50 words then it cuts the title and concatenates with three dots
        for(i = 0; i < response.length; i++) {
        quizzesArea.innerHTML += `
                                <div class="quizz" style="background-image: url('${response[i].image}');">
                                    <div class="overlay">
                                        <h2>
                                            ${
                                                response[i].title.length > 50 ? response[i].title.substring(0, 50)+'...' : response[i].title
                                            }
                                        </h2>
                                    </div>
                                </div>
                                `
        }
    })
}

function hiddenquestion(quests){
    for(i = 2; i <= quests; i++){
        let esse = makequestion.querySelector(".pergunta"+i);
        esse.classList.add("hidden");

    }
}

function showquestion(e){
    let pai = e.parentNode;
    console.log(String(pai.classList[1]).substr(7));

}

function nextCreateQuest(){
    let create = document.querySelector(".screen-create-quizz");
    create.classList.add("hidden");
    makequestion.classList.remove("hidden");
    let quests = document.querySelector(".qtd-quest").value;
    for(i = 1; i <= quests; i++) {
        makequestion.innerHTML +=`
                                <div class="question-header header-pergunta${i}">
                                    <h1 class="question-h1">Pergunta ${i}</h1>
                                    <ion-icon onclick="showquestion(this)" name="create-outline"></ion-icon>
                                </div>
                                <div class="question pergunta${i}">
                                    <input type="text" class="title-question" placeholder="Título do seu quizz"/>
                                    <input type="text" class="url-img-quizz" placeholder="Cor de fundo da pergunta"/>
                                    <h1 class="question-h1">Pergunta correta</h1>
                                    <input type="text" class="qtd-quest" placeholder="Resposta correta">
                                    <input type="text" class="qtd-levels" placeholder="URL da imagem">
                                    <h1 class="question-h1">Pergunta incorretas</h1>
                                    <input type="text" class="qtd-quest" placeholder="Resposta incorreta 1">
                                    <input type="text" class="qtd-levels" placeholder="URL da imagem 1">
                                    <input type="text" class="qtd-quest" placeholder="Resposta incorreta 2">
                                    <input type="text" class="qtd-levels" placeholder="URL da imagem 2">
                                    <input type="text" class="qtd-quest" placeholder="Resposta incorreta 3">
                                    <input type="text" class="qtd-levels" placeholder="URL da imagem 3">
                                </div>    
                                `;
    }
    hiddenquestion(quests);
}

function createQuizz(){
    let firsthidden = document. querySelector(".first-screen-container");
    firsthidden.classList.add("hidden");
    let create = document.querySelector(".screen-create-quizz");
    create.classList.remove("hidden");
}
// Running Functions
getAllQuizzes()