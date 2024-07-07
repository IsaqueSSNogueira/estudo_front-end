
// DOM elementos
const botoes = document.querySelectorAll("button");
const jogador = document.querySelector("#indent-jogador");
const vitoriaX = document.querySelector("#vitoriaX")
const vitoriaO = document.querySelector("#vitoriaO")
const resetarVitorias = document.querySelector("#resetarVitorias")
const radiosButton = document.querySelectorAll(".radio");

// combinações de acertos
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

// variaveis base / iniciais
let jogadorAtual = "X";
let cliques = 0;
let cliquesX = [];
let cliquesO = [];
let xVencedor = 0;
let oVencedor = 0;
let niveis = 1;


// definir quantas rodadas (input radio)
function rodadas(){
    radiosButton.forEach((intem, indice) => {    
        intem.addEventListener("click", ()=> {
            switch(indice) {
                case 0:
                    niveis = 1
                    break;
                case 1:
                    niveis = 3;
                    break;
                case 2:
                    niveis = 5;
                    break;
                default:
                    niveis = 1;
            }
            reseteTotal()
        })
    })
}


// função dos cliques
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


// contar cliques e mudar o jogador 
function contarClique(){

    cliques = cliques + 1;
    jogadorAtual = jogadorAtual === "X" ?  "O" : "X";

    verificarVencedor()
}


// função principal
function verificarVencedor() {
    
    // analisar se alguma combinação foi satisfeita
    let xGanhou = posicoes.some((linha) =>
        linha.every((numero) => cliquesX.includes(numero))
    );
    let oGanhou = posicoes.some((linha) =>
        linha.every((numero) => cliquesO.includes(numero))
    );

    // verificar se houve vencedor
    if (xGanhou) {
        finalizarPartida("X");
    } else if (oGanhou) {
        finalizarPartida("O");
    } else if (cliques > 8) {
        finalizarPartida("Nenhum");
    }
}

// ação por partida
function finalizarPartida(ganhador){

    if(ganhador === "Nenhum"){
        alert("Empate na partida");
    }
    else if(ganhador === "X"){
        xVencedor += 1;
        vitoriaX.textContent = xVencedor;
    }
    else if(ganhador === "O"){
        oVencedor += 1;
        vitoriaO.textContent = oVencedor;
    }
    else{
        alert("Houve um erro ao definir o vencedor");
    }

    reseteSimples()
}


// resete simple, o "por rodada"
function reseteSimples(){

    for(let i = 0; i < botoes.length; i++){
        botoes[i].textContent = "";
    }
    jogador.textContent = "X" ? "O" : "X";
    cliques = 0;
    cliquesX = [];
    cliquesO = [];


    if(xVencedor === niveis || oVencedor === niveis){
        finalizarJogo()
    }
};

// resete total, reiniciar o jogo
function reseteTotal(){

    xVencedor = 0;
    oVencedor = 0;

    vitoriaX.textContent = xVencedor;
    vitoriaO.textContent = xVencedor;
    reseteSimples()
}

// caso haja um vercedor do jogo
function finalizarJogo(){
    if(xVencedor === niveis){
        alert("O jogador X é o vencedor!");
    }
    else{
        alert("O jogador O é o vencedor!")
    }
    reseteTotal();
}

// botao de resete

resetarVitorias.addEventListener("click", () => {
    reseteTotal();
})

acaoBotoes()
rodadas()



