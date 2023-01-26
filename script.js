// Global Variables 
const quizzesArea = document.querySelector('.quizzes-area-container')

// Get all Quizzes from the server and display them on the homepage
function getAllQuizzes() {
    const data = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
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

function hiddenAll(){
    let all = document.querySelector(".all-quizzes-container");
    all.classList.add("hidden");
    let create = document.querySelector(".screen-create-quizz");
    create.classList.add("hidden");
}

function createQuizz(){
    let firsthidden = document. querySelector(".first-screen-container");
    firsthidden.classList.add("hidden");
    let create = document.querySelector(".screen-create-quizz");
    create.classList.remove("hidden");
}
// Running Functions
getAllQuizzes()