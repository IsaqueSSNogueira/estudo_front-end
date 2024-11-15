
// DOM
const botoes = document.querySelectorAll(".botao")
const jogadorSpan = document.querySelector("#span-jogadorAtual")
const jogadorX = document.querySelector("#vitoriasX")
const jogadorO = document.querySelector("#vitoriasO")
const botaoReiniciar = document.querySelector("#reiniciar-partida")
const fundoContainerMensagem = document.querySelector("#fundo-container-mensagem")
const spanMensagem = document.querySelector("#span-mensagem")
const botaoFecharMensagem = document.querySelector("#botao-fechar-mensagem")


const definirPartidas = document.querySelectorAll(".definir-partida")

// variáveis base
let jogadorAtual = "X";
let cliques = 0;
let jogadasX = []
let jogadasO = []

let partidas = 0;
let partidasBase = 1;
let vitoriasO = 0;
let vitoriasX = 0;


// posições para vitória
const posicoes = [
    [1, 2, 3], // linhas
    [4, 5, 6], 
    [7, 8, 9],
    [1, 4, 7], // colunas
    [2, 5, 8],
    [3, 6, 9], 
    [1, 5, 9], // diagonais
    [3, 5, 7]
]

// função inicial
function funcaoInicial(){

    for(let botao of botoes){
        let numeroBotao = parseInt(botao.dataset.botao);
        botao.addEventListener("click", () => {clicou(botao, numeroBotao)})
    }
    for(let botao of definirPartidas){
        botao.addEventListener("click", () => {partidasBase = parseInt(botao.dataset.partida); resetarJogo()})
    }
}


// função clicou 
function clicou(intem, numeroBotao){

    if(intem.textContent === ""){
        intem.textContent = jogadorAtual;
        intem.classList.add("botao-transition");

        if(jogadorAtual === "X"){
            jogadasX.push(numeroBotao);
        }
        else if(jogadorAtual === "O"){ // vou definir o condicional pra evitar erros
            jogadasO.push(numeroBotao);
        }

    cliques = cliques + 1;

    // verificar jogada
    verificarJogada()
    }
}


// verificar jogada
function verificarJogada(){

    let xGanhou = posicoes.some(linha => linha.every(intem => jogadasX.includes(intem)));
    let oGanhou = posicoes.some(linha => linha.every(intem => jogadasO.includes(intem)));

    if(xGanhou){
        haVencedor("X")
    }
    else if(oGanhou){
        haVencedor("O")
    }
    else if(cliques === 9){
        setTimeout(() => {
        haVencedor("empate");
        }, 100);
    }
    trocarJogador();
}


// trocar jogador
function trocarJogador(){
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    jogadorSpan.textContent = jogadorAtual;
}


// há um vencedor
function haVencedor(vencedor){

    if(vencedor === "O"){
        vitoriasO = vitoriasO + 1;
        jogadorO.textContent = vitoriasO;
        partidas = partidas + 1;
        concluirPartida(vencedor)
    }
    else if(vencedor === "X"){
        vitoriasX = vitoriasX + 1;
        partidas = partidas + 1;
        jogadorX.textContent = vitoriasX;
        concluirPartida(vencedor);
    }
    else if(vencedor === "empate"){
        spanMensagem.textContent = 'Empate na partida!'
        fundoContainerMensagem.style.display = 'block';
        reiniciarPartida()
    }
    else{
        alert("houve um erro ao processar")
    }
}


function concluirPartida(vencedor){

    if(vitoriasO === partidasBase){
        spanMensagem.textContent = 'O jogador O venceu!'
        fundoContainerMensagem.style.display = 'block';
        resetarJogo()
    }
    else if(vitoriasX === partidasBase){
        spanMensagem.textContent = 'O jogador X venceu!'
        fundoContainerMensagem.style.display = 'block';
        resetarJogo()
    }
    else{
        reiniciarPartida()
    }
}


// resetar 
function reiniciarPartida(){

    // resete variáveis base
    jogadasO = [];
    jogadasX = [];
    cliques = 0;

    // resete botões
    for(let botao of botoes){
        botao.textContent = "";
        botao.classList.remove("botao-transition");
    }
}


// resetar tudo

function resetarJogo(){
    partidas = 0;
    vitoriasO = 0;
    vitoriasX = 0;
    jogadorO.textContent = 0;
    jogadorX.textContent = 0;
    reiniciarPartida()
}

// botão reiniciar

botaoReiniciar.addEventListener("click", () => {
    resetarJogo();
})


// full screen
function openFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) { // Safari
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) { // IE11
    document.documentElement.msRequestFullscreen();
  }
}


botoes.forEach((element) => {
    element.addEventListener("click", openFullscreen);
})



botaoFecharMensagem.addEventListener('click', () => {
    fundoContainerMensagem.style.display = 'none';
})


// chamar a primeira função
funcaoInicial()