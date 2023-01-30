// Global Variables 
const quizzesArea = document.querySelector('.quizzes-area-container');
const homeScreen = document.querySelector('.first-screen-container');
const secondScreen = document.querySelector('.second-screen-container');
const teste = secondScreen.parentElement
console.log(teste)

// Get all Quizzes from the server and display them on the homepage
function getAllQuizzes() {
    const data = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    data.then(response => {
        response = response.data      
        
        // Create the template for the quizzes and adds them to the quizz area
        // If the title has more than 50 words then it cuts the title and concatenates with three dots
        for(i = 0; i < response.length; i++) {
        quizzesArea.innerHTML += `
                                <div class="quizz" style="background-image: url('${response[i].image}');" onclick="startQuizz(${response[i].id})">
                                    <div class="overlay-gradient">
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

// Put the class Hidden on the first screen and remove from the second 
function toggleScreen(screenFrom, screenTo, isBackHome=false) {
    clearVariables()

    if(screenTo.classList.contains('hidden')) {
        screenFrom.classList.add('hidden')
        screenTo.classList.remove('hidden')
    }
    
    if(isBackHome == true) {
        screenFrom.innerHTML = ''
    }
}

// Running Functions
getAllQuizzes()