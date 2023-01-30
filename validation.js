function validacaotitulo(){
    document.querySelector(".title-quizz").value = "Um quizz sobre todo mundo odeia o Cris";
    let titulo = document.querySelector(".title-quizz").value;
    if(titulo.length>20&&titulo.length<65){
        return true
    } else{
        alert("Título do Quizz deve ser maior que 20 caracteres e menor que 65 caracteres")
        return false
    }
}

function validacaourl(){
    document.querySelector(".url-img-quizz").value = "https://jpimg.com.br/uploads/2020/09/todo-mundo-odeia-chris.jpg"
    let string = document.querySelector(".url-img-quizz").value;
    if((string.indexOf('https://')>=0||string.indexOf('http://')>=0 || string.indexOf('www.')>=0) &&string.indexOf('.com')>=0){
        return true
    } else  {
        alert("URL invalido")
        return false
    }
}

function validacaoquest(){
    document.querySelector(".qtd-quest").value = 3;
    let quests = document.querySelector(".qtd-quest").value;
    if(quests>2){
        return true
    } else{
        alert("Deve ter no mínimo 3 perguntas")
        return false
    }
} 

function validacaolevels(){
    document.querySelector(".qtd-levels").value =2;
    let levels = document.querySelector(".qtd-levels").value;
    if(levels>1){
        return true
    } else{
        alert("Deve ter no míninmo 2 níveis")
        return false
    }
}




function validacaoTituloPergunta(){
    document.querySelector(".title-question").value = "Uma das frases que o Greg dizia muito ao Chris é..."
    let titulo = document.querySelector(".title-question").value;
    if(titulo.length>20){
        return true
    } else {
        alert("Título deve ter no minimo 20 caracteres")
        return false
    }
}

function validarCorFundo(){
    document.querySelector(".corBackground").value = "#ACACAC"
    let cor = document.querySelector(".corBackground").value;
    if(cor.length==7 && cor.indexOf("#")>-1){ //G-Z não pode entrar
        return true
    } else{
        return false
    }
}

function validarCorrectAnswer(){
    document.querySelector(".correct-answer").value = "Cara, ela ta tão na sua";
    let correct = document.querySelector(".correct-answer").value;
    if(correct.length>0){
        return true
    } else{
        alert("Resposta deve ter alguma resposta");
        return false
    }
}

//É obrigatória a inserção da resposta correta e de pelo menos 1 resposta errada. Portanto, é permitido existirem perguntas com só 2 ou 3 respostas em vez de 4.

function validaTituloLevel(){
    document.querySelector(".title-levels").value = "jkjkbvuvgukjgbiuvugviufiuljlvvymhchvjmjvklivuy"
    let titulo = document.querySelector(".title-levels").value;
    if(titulo.length>10){
        return true
    } else {
        alert("Título deve ter no minimo 10 caracteres");
        return false
    }
}

function validaPorcentagem(){
    let porcentagem = document.querySelector(".porcentagem").value;
    if(porcentagem>=0 && porcentagem<=0){
        return true
    } else {
        return false
    }
}

function descricaoNivel(){
    document.querySelector(".descricao-levels").value = "jkjkbvuvgukjgbiuvugviufiuljlvvymhchvjmjvklivuy"
    let titulo = document.querySelector(".descricao-levels").value;
    if(titulo.length>30){
        return true
    } else {
        alert("Descrição deve ter no minimo 30 caracteres");
        return false
    }
}