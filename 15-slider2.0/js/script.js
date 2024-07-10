
// DOM
const containerSlides = document.querySelector("#container-slides")
const leftB = document.querySelector("#leftB")
const rightB = document.querySelector("#rightB")

// variáveis base
const slidesCor = ["red", "orange", "gold", "mediumseagreen", "lightblue", "purple", "black"]
let tamanho = 0; // base para o translateX
let tamanhoSlide; // .clientWidth
let tamanhoSlide2; // para o botao left
let posicao = 0; // base para a repetição e controle das funções
let mudarSlide; // setTimeout


// criar slides, função inicial
function criarSlide(){

    slidesCor.forEach((intem) => {
        let slide = document.createElement("div")
        slide.classList.add("slide")
        slide.style.backgroundColor = intem;
        containerSlides.appendChild(slide)
    })
    verificarPosicao()
}

// controle das funções
function verificarPosicao(){

    leftB.disabled = posicao === 0;
    rightB.disabled = posicao === slidesCor.length - 1;


    if(posicao < slidesCor.length){
        mudarSlide = setTimeout(moverSlide, 2500);
    }
    else{
        reiniciarLoop()
    }
}

// mover da direita pra esquerda, função principal
function moverSlide(){
    let slide = document.querySelector(".slide")
    tamanhoSlide = slide.clientWidth;
    tamanho = tamanho + tamanhoSlide;
    containerSlides.style.transform = `translateX(-${tamanho}px)`
    posicao = posicao + 1;
    verificarPosicao()
}


// reiniciar loop
function reiniciarLoop(){
    tamanho = 0;
    posicao = 0;
    containerSlides.style.transform = "translateX(0px)"
    verificarPosicao()
}


// botoes
leftB.addEventListener("click", () => {clicarBotao("left")})
rightB.addEventListener("click", () => {clicarBotao("right")})


function clicarBotao(lado){

    tamanhoSlide2 = tamanhoSlide * 2; // de qualquer jeito, o botao só é liberado após a primeira passagem

    switch(lado) {
    case "left":
        tamanho = tamanho - tamanhoSlide2;
        posicao = posicao - 2;
        clearTimeout(mudarSlide)
        moverSlide();
        break;
    case "right":
        clearTimeout(mudarSlide)
        moverSlide()
        break;
    default:
        console.log("Erro na aplicação");
    }
}



criarSlide()
