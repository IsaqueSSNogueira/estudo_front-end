
//DOM
const canvas = document.querySelector("canvas");
const body = document.querySelector("body");
const canvasX = 600;
const canvasY = 600;

const botaoJogar = document.querySelector("#botao-jogar")
const botaoReiniciar = document.querySelector("#botao-reiniciar")
const botaoDespausar = document.querySelector("#botao-despausar")


const telaInicio = document.querySelector("#tela-inicio")
const telaPerdeu = document.querySelector("#tela-perdeu")
const telaPausa = document.querySelector("#tela-pausa")

const radio = document.querySelectorAll("#nivel-dificuldade input")
const label = document.querySelectorAll("#nivel-dificuldade label")

const pontuacaoSpan = document.querySelector("#pontuacao-span");
const containerPontuacao = document.querySelector("#container-pontuacao");

const spanMaxMedium = document.querySelector("#max-medium");
const spanMaxHard = document.querySelector("#max-hard");



// ctx cobrinha
const ctx = canvas.getContext("2d")
let tamanho = 30;
let direcao = "baixo";
let intervaloMovimento;
let repeticao = 200;
let fruta;
let snake = [
    {x:120, y:240},
    {x:150, y:240},
]

// ctx fruta
const ctxFruta = canvas.getContext("2d");
const cor = ["#FF073A", "#FF5F1F", "#FFFF33", "gold", "#00FA9A", "#39FF14", "#0FF0FC", "#00FFFF", "#9400D3", "#FF6EC7", "#00FFFF", "#8F00FF", "#FF00FF", "#AFFF00"]
let corIndice = 1;
let frutaAtual; // evitar que se repita
let comeu = false;


// pontuacao
let pontuacao = 0;
let nivelDificulade = "medium";
let pontuacaoMaxHard = 0;
let pontuacaoMaxMedium = 0;

// audio
const som = new Audio();
som.src = "assets/audio.mp3";



// renderizar a snake e fruta
const desenharSnake = () => {

    snake.forEach((posicao, index) => {
    ctx.fillStyle = "rgb(200, 200, 200)"; // cor padrão
    
    if(index === snake.length - 1){
        ctx.fillStyle = "white";
    } // cor da cabeça, ultimo length

    ctx.fillRect(posicao.x, posicao.y, tamanho, tamanho) // renderizar todos intens com base na posição 
    })

    if(fruta){
        ctxFruta.fillStyle = cor[corIndice];
        ctxFruta.fillRect(fruta.x, fruta.y, tamanho, tamanho)
    }

    moverSnake()
}


// movimento da snake
const moverSnake = () => {

    let head = snake.at(-1);
    if(direcao === "direita"){
        snake.push({x:head.x + tamanho, y:head.y})
    }
    else if(direcao === "esquerda"){
        snake.push({x:head.x - tamanho, y:head.y});
    }
    else if(direcao === "cima"){
        snake.push({x:head.x, y:head.y - tamanho})
    }
    else if(direcao === "baixo"){
        snake.push({x:head.x, y:head.y + tamanho})
    }

    // definir movimento e crescimento da snake 
    if(!comeu){
        snake.shift();
    }
    else{
        comeu = !comeu;
        criarFrutas();
        som.play();
    }
}

// Função para determinar a direção com base no movimento de toque
let startX, startY;
document.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

document.addEventListener("touchmove", (event) => {
    if (!startX || !startY) return;

    let endX = event.touches[0].clientX;
    let endY = event.touches[0].clientY;

    let diffX = endX - startX;
    let diffY = endY - startY;

    // Determina se o deslize foi mais horizontal ou vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Movimento horizontal
        if (diffX > 0 && direcao !== "esquerda") {
            direcao = "direita";
        } else if (diffX < 0 && direcao !== "direita") {
            direcao = "esquerda";
        }
    } else {
        // Movimento vertical
        if (diffY > 0 && direcao !== "cima") {
            direcao = "baixo";
        } else if (diffY < 0 && direcao !== "baixo") {
            direcao = "cima";
        }
    }

    // Reseta as coordenadas para o próximo movimento
    startX = null;
    startY = null;
});


// movimento cobrinha
function definirIntervalo(){

    intervaloMovimento = setInterval(
        () => {
        ctx.clearRect(0, 0, 600, 600)
        desenharSnake()
        colisoes()
        }, repeticao)
}

// mover direção
document.addEventListener("keydown", (event) => {

    if(event.key === "ArrowRight" && direcao !== "esquerda"){
        direcao = "direita";
    }
    else if(event.key === "ArrowLeft" && direcao !== "direita"){
        direcao = "esquerda";
    }
    else if(event.key === "ArrowUp" && direcao !== "baixo"){
        direcao = "cima"
    }
    else if(event.key === "ArrowDown" && direcao !== "cima"){
        direcao = "baixo";
    }
})



// definir pontuacao
const definirPontuacao = () => {

    switch (nivelDificulade){
        case "medium": 
            if(pontuacaoMaxMedium < pontuacao){
                pontuacaoMaxMedium = pontuacao;
            }
            break;
        case "hard":
            if(pontuacaoMaxHard < pontuacao){
                pontuacaoMaxHard = pontuacao;
            }
            break;
        }

    spanMaxMedium.textContent = pontuacaoMaxMedium
    spanMaxHard.textContent = pontuacaoMaxHard;

    reiniciar();
}



// reiniciar jogo (redefinir podicao da cobrinha e direcao)
const reiniciar = () => {
        
    console.log("colidiu")
    snake = [
        {x:120, y:240},
        {x:150, y:240},
    ]
    direcao = "direita";
    pontuacao = 0;
    pontuacaoSpan.textContent = pontuacao;
    criarFrutas();
}


// criar frutas
function criarFrutas(){

    let frutaValida = false;

    while (!frutaValida) {
        posicaoFrutaX = (Math.round(Math.round(Math.random() * 510) / 30) * 30) + 30;
        posicaoFrutaY = (Math.round(Math.round(Math.random() * 510) / 30) * 30) + 30;

        frutaValida = !snake.some(posicao => posicao.x === posicaoFrutaX && posicao.y === posicaoFrutaY);
    }

    fruta = { x: posicaoFrutaX, y: posicaoFrutaY };
    corIndice = Math.floor(Math.random() * cor.length);


    /* guardar para fins de estudo
    // (1) cria o número aleatório entre 0 e 1, multiplica por x, arrendoda pro mais proximo (entre 0 a 600). 
    // (2) Depois (dentro de um Math round externo) divide por 30 e multiplica por 30, pra assim se tornar divisivel por 30;
   
    let posicaoFrutaX = (Math.round(Math.round(Math.random() * 510) / 30) * 30) + 30; 
    let posicaoFrutaY = (Math.round(Math.round(Math.random() * 510) / 30) * 30) + 30;
    
    // verifica se não está dentro da snake
    let xFruta = snake.some(posicao => posicao.x === posicaoFrutaX);
    let yFruta = snake.some(posicao => posicao.y === posicaoFrutaY);

    // definir posicao e cor (desde que passe pelo teste do 'some')
    if(!xFruta && !yFruta){
        fruta = {x:posicaoFrutaX, y:posicaoFrutaY}
        corIndice = Math.floor(Math.random() * cor.length);
    }
    else{
        criarFrutas()
    }
    */
}


// se a snake comeu
const comeuFruta = () => {
    pontuacao = pontuacao + 10;
    comeu = true;
    pontuacaoSpan.textContent = pontuacao;
}


// verificar colisoes
function colisoes(){
    let posicoes = snake.slice(0, -1);
    let head = snake.at(-1);

    // com seu próprio corpo
    posicoes.forEach((posicao) => {    
        if(posicao.x === head.x && posicao.y === head.y ){
            setTimeout(() => {perdeu()}, repeticao)
        }
    })

    // com a tela
    if(head.x < 0 - tamanho || head.x > 600 || head.y < 0 - tamanho || head.y > 600){
        perdeu()
    }
    if(head.x === fruta.x && head.y === fruta.y){
        comeuFruta()
    }
}


// caso colida
function perdeu(){
    clearInterval(intervaloMovimento);
    canvas.classList.remove("tirar-opacity")
    telaPerdeu.classList.add("mostrar")
}



/* outros */


// botoes das telas
function definirBotoes(){

    botaoJogar.addEventListener("click", () => {
    
        canvas.classList.add("tirar-opacity")
        telaInicio.classList.remove("mostrar")
        containerPontuacao.classList.add("tirar-opacity")
        definirIntervalo()
    })

    botaoReiniciar.addEventListener("click", () => {
        telaPerdeu.classList.remove("mostrar")
        canvas.classList.add("tirar-opacity")
        definirPontuacao()
        definirIntervalo()
    })

    botaoDespausar.addEventListener("click", () => {
        telaPausa.classList.remove("mostrar")
        canvas.classList.add("tirar-opacity")
        definirIntervalo()
    })
}


// pausar o jogo se cicar fora
document.addEventListener("click", (event) => {

    if(
        !telaPerdeu.classList.contains("mostrar") &&
        !telaInicio.classList.contains("mostrar") &&
        !telaPausa.classList.contains("mostrar") &&
        event.target !== canvas &&
        event.target !== telaInicio && 
        event.target !== botaoJogar && 
        event.target !== telaPerdeu && 
        event.target !== botaoReiniciar && 
        event.target !== botaoDespausar && 
        event.target !== label[0] && 
        event.target !== label[1] && 
        event.target !== radio[0] && 
        event.target !== radio[1])
        {
        telaPausa.classList.add("mostrar")
        canvas.classList.remove("tirar-opacity")
        clearInterval(intervaloMovimento)
        }
})


// resetar quando muda a dificuldade
const resetar = () => {
    clearInterval(intervaloMovimento);
    canvas.classList.remove("tirar-opacity")
    telaPerdeu.classList.remove("mostrar")
    telaInicio.classList.add("mostrar");
    containerPontuacao.classList.remove("tirar-opacity");
    reiniciar();
}

// mudar dificuldade 
const alterardificuldade = () => {

    radio.forEach((intem, index) => {

        if(intem.checked === true){
            label[index].classList.add("dificul-marcada")
            repeticao = parseInt(intem.dataset.rep)
        }
        else{
            label[index].classList.remove("dificul-marcada")
            telaPausa.classList.remove("mostrar")
        }
    })
    definirPontuacao();
    nivelDificulade = repeticao === 80 ? "hard" : "medium"; // como só há duas dificuldades, isso irá funcionar
}

radio.forEach((intem) => {intem.addEventListener("change", () => {
    alterardificuldade()
    resetar()
})})



// full screen
const larguraJanela = window.innerWidth;
const alturaJanela = window.innerHeight;
const larguraResponsiva = 500;
const alturaResponsiva = 600;

function openFullscreen() {
    if (document.documentElement.requestFullscreen && larguraJanela <= larguraResponsiva && alturaJanela >= alturaResponsiva) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen && larguraJanela <= larguraResponsiva && alturaJanela >= alturaResponsiva) { // Safari
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen && larguraJanela <= larguraResponsiva && alturaJanela >= alturaResponsiva) { // IE11
      document.documentElement.msRequestFullscreen();
    }
}

// Adicione o evento ao botão
document.querySelector("#botao-jogar").addEventListener("click", openFullscreen);
document.querySelector("#botao-despausar").addEventListener("click", openFullscreen);
document.querySelector("#botao-reiniciar").addEventListener("click", openFullscreen);

// chamar funções base
desenharSnake();
criarFrutas();
definirBotoes()
alterardificuldade() // iniciar com dificuldade definida

