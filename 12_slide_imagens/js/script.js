
// const = document.querySelector("")

// DOM
const slides = document.querySelector("#slides")
const rightB = document.querySelector("#rightB")
const leftB = document.querySelector("#leftB")

// variáveis de funções
let posicao = 0;
let transform = 0; 
let tamanho;
let chamarSlider; // setTimeout
let slide;

// variaveis base
const imagens = ["red", "blue", "mediumseagreen", "gold", "purple", "goldenrod"];
const titulos = []
const paragrafos = []


function criarSlides(){

    imagens.forEach( (intem, index) => {
        const slide = document.createElement("div");
        const pagina = document.createElement("span");

        slide.classList.add("slide");


        slide.style.background = intem;
        pagina.textContent = index + 1;

        slide.appendChild(pagina)
        slides.appendChild(slide);
    })
    slide = document.querySelector(".slide")
    trocarImagem();
}

function slider(){
    tamanho = parseInt(slide.clientWidth);
    transform = transform + tamanho;
    slides.style.transform = `translateX(-${transform}px)`
    posicao = posicao + 1;

    trocarImagem()
}

function trocarImagem(){

    leftB.disabled = posicao === 0;
    rightB.disabled = posicao === imagens.length - 1;

    if(posicao < imagens.length){

        chamarSlider = setTimeout(slider, 5000);
    }
    else{
        posicao = 0;
        transform = 0;
        slides.style.transform = "translateX(0)"
        trocarImagem()
    }
}

leftB.addEventListener("click", () => {botao("left")})
rightB.addEventListener("click", () => {botao("right")})

function botao(lado){

    clearTimeout(chamarSlider);

    if(lado === "left"){ // lógica de voltar o dobro, pra assim que for chamar slider, ele compesar apenas 1 perdido, voltando de fato 1 atrás
        posicao -= 2; 
        tamanho = parseInt(slide.clientWidth);
        transform = transform - (tamanho + tamanho);
        slider();
    }
    if(lado === "right"){
        slider()
    }
}

criarSlides()
