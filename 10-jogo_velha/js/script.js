

const botoes = document.querySelectorAll("button");
const jogador = document.querySelector("#indent-jogador");
const vitoriaX = document.querySelector("#vitoriaX")
const vitoriaO = document.querySelector("#vitoriaO")

const posicoes = [
    [1, 2, 3], // linhas
    [4, 5, 6],
    [7, 8, 9], 
    [1, 4, 7], // colunas
    [2, 5, 8],
    [3, 6, 9], 
    [1, 5, 9], // diagonais
    [3, 5, 7], 
]

let jogadorAtual = "X";
let cliques = 0;
let cliquesX = [];
let cliquesO = [];
let xVencedor = 0;
let oVencedor = 0;

function acaoBotoes(){

    for(let botao of botoes){

        botao.addEventListener("click", (evento) => {
        
        if(botao.textContent === ""){
            if(jogadorAtual === "X"){
                botao.textContent = "X"
                jogador.textContent = "O"
                cliquesX.push(parseInt(evento.target.dataset.botao))
            }
            else{
                botao.textContent = "O"
                jogador.textContent = "X"
                cliquesO.push(parseInt(evento.target.dataset.botao))
            }
        contarClique();
        }
    })
}}

function contarClique(){

    cliques = cliques + 1;
    jogadorAtual = jogadorAtual === "X" ?  "O" : "X";

    verificarVencedor()
}


function verificarVencedor() {
    let xGanhou = posicoes.some((linha) =>
        linha.every((numero) => cliquesX.includes(numero))
    );
    let oGanhou = posicoes.some((linha) =>
        linha.every((numero) => cliquesO.includes(numero))
    );

    if (xGanhou) {
        finalizarJogo("X");
    } else if (oGanhou) {
        finalizarJogo("O");
    } else if (cliques > 8) {
        finalizarJogo("Nenhum");
    }
}


function finalizarJogo(ganhador){
    
    // alert

    if(ganhador === "Nenhum"){
        alert("Empate");
    }
    else if(ganhador === "X"){
        alert("O vencedor é o jogador X")
        xVencedor += 1;
        vitoriaX.textContent = xVencedor;
    }
    else if(ganhador === "O"){
        alert("O vencedor é o jogador O")
        oVencedor += 1;
        vitoriaO.textContent = oVencedor;
    }
    else{
        alert("Houve um erro ao definir o vencedor");
    }
    resetar()
}

function resetar(){

    for(let i = 0; i < botoes.length; i++){
        botoes[i].textContent = "";
    }
    jogador.textContent = "X";
    cliques = 0;
    cliquesX = [];
    cliquesO = [];
};


acaoBotoes()



