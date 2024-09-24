
// DOM
const botoes = document.querySelectorAll(".botao")
const jogadorSpan = document.querySelector("#span-jogadorAtual")
const jogadorX = document.querySelector("#vitoriasX")
const jogadorO = document.querySelector("#vitoriasO")
const botaoReiniciar = document.querySelector("#reiniciar-partida")

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
    verificarJogada()
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
        alert("Empate na rodada")
        concluirPartida()
    }
    else{
        alert("houve um erro ao processar")
    }
}


function concluirPartida(vencedor){

    if(vitoriasO === partidasBase){
        alert(`O jogador 'O' venceu!`)
        resetarJogo()
    }
    else if(vitoriasX === partidasBase){
        alert(`O jogador 'X' venceu!`)
        resetarJogo()
    }
    else{
        reiniciarPartida();
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



// chamar a primeira função
funcaoInicial()