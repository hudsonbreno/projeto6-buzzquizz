function validacaotitulo(){
    let titulo = document.querySelector(".title-quizz").value;
    if(titulo.length>20&&titulo.length<65){
        return true
    } else{
        return false
    }
}

function validacaourl(){
    let url = document.querySelector(".url-img-quizz").value;
    if(url){
        return true
    } else {
        return false
    }
}

function validacaoquest(){
    let quests = document.querySelector(".qtd-quest").value;
    if(quests>2){
        return true
    } else{
        return false
    }
} 

function validacaolevels(){
    let levels = document.querySelector(".qtd-levels").value;
    if(levels>1){
        return true
    } else{
        return false
    }
}

function validacaoTituloPergunta(){
    let titulo = document.querySelector(".title-question").value;
    if(titulo.length>20){
        return true
    } else {
        return false
    }
}

function validarCorFundo(){
    let cor = document.querySelector(".corBackground").value;
    if(cor.length==7){
        return true
    } else{
        return false
    }
}

function validarCorrectAnswer(){
    let correct = document.querySelector(".correct-answer").value;
    if(correct.length>0){
        return true
    } else{
        return false
    }
}

function correctUrl(){
    let correcturl = document.querySelector("correct-url").value;
    if(correxturl){
        return true
    } else{
        return false
    }
}

//É obrigatória a inserção da resposta correta e de pelo menos 1 resposta errada. Portanto, é permitido existirem perguntas com só 2 ou 3 respostas em vez de 4.