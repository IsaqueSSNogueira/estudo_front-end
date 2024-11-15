
// DOM
const telaInicial = document.querySelector("#inicio")
const telaJogo = document.querySelector("#jogo")
const telaFinal = document.querySelector("#final")

const botaoIniciar = document.querySelector("#botao-iniciar")
const botaoReiniciar = document.querySelector("#botao-reiniciar")

const perguntas = document.querySelectorAll(".perguntas");
const tituloP = document.querySelector("#titulo-pergunta")
const altA = document.querySelector("#altA")
const altB = document.querySelector("#altB")
const altC = document.querySelector("#altC")
const altD = document.querySelector("#altD")

const pontuacaoFinal = document.querySelector("#pontuacao-final")


// questões
const p1 = criarQuestao("Qual é a capital do Brasil?", "São Paulo", "Rio De Janeiro", "Brasília", "Salvador", "c")
const p2 = criarQuestao("Quem pintou a Mona Lisa?", "Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo", "a")
const p3 = criarQuestao("Qual é o maior planeta do sistema solar?", "Terra", "Júpiter", "Vênus", "Marte", "b")
const p4 = criarQuestao("Quem descobriu a penicilina?", "Alexander Fleming", "Albert Einstein", "Isaac Newton", "Marie Curie", "a")
const p5 = criarQuestao("Quem escreveu 'Dom Quixote'?", "William Shakespeare", "Franz Kafka", "Jorge Luis Borges", "Miguel de Cervantes", "d")
const questoes = [p1, p2, p3, p4, p5];


// variáveis base

let questaoAtual = 0;
let pontuacao = 0;


// eventos botoes
botaoIniciar.addEventListener("click", iniciarJogo)

botaoReiniciar.addEventListener("click", reiniciarJogo)


// factory function questoes
function criarQuestao(titulo, p1, p2, p3, p4, resposta){

    return {
        titulo,
        p1,
        p2,
        p3,
        p4,
        resposta
    }
}

// funções iniciais

function funcaoInicial(){
    perguntas.forEach((intem) => {

        intem.addEventListener("click", (event) => {
            clicouAlternativa(intem.dataset.alternativa, event.target);
        })
    })
}


// iniciar game

function iniciarJogo(){

    telaInicial.classList.add("esconder");
    telaJogo.classList.remove("esconder");

    renderizarPerguntas()
}

// renderizar perguntas 

function renderizarPerguntas(){

    tituloP.textContent = questoes[questaoAtual].titulo;
    altA.textContent = questoes[questaoAtual].p1;
    altB.textContent = questoes[questaoAtual].p2;
    altC.textContent = questoes[questaoAtual].p3;
    altD.textContent = questoes[questaoAtual].p4;
}


// definir jgogabilidade

function clicouAlternativa(alternativa, clicado){

    perguntas.forEach((intem) => {intem.disabled = true;})

    //avaliar resposta
    if(alternativa === questoes[questaoAtual].resposta){
        pontuacao = pontuacao + 10;
        clicado.classList.add("correta")
    }
    else{
        clicado.classList.add("errada")
    }

    // proxima questao
    questaoAtual = questaoAtual + 1;
    proxima(clicado)
}


// remover animacao e controle de fluxo (proxima ou finalizar?) 
function proxima(clicado){

    setTimeout(() => {clicado.classList.remove("correta", "errada")}, 500)

    setTimeout(() => {

    perguntas.forEach((intem) => {intem.disabled = false;})
    
        if(questaoAtual >= questoes.length){
            finalizarJogo()
        }
        else{
            renderizarPerguntas()
        }
    }, 600)
}


// finalizar jogo
function finalizarJogo(){

    telaJogo.classList.add("esconder");
    telaFinal.classList.remove("esconder");

    pontuacaoFinal.textContent = pontuacao;
}


// botao reiniciar 

function reiniciarJogo(){
    questaoAtual = 0;
    pontuacao = 0;
    telaFinal.classList.add("esconder");
    telaInicial.classList.remove("esconder");
}



// fullscreen


function ativarFullscreen() {
    if (body.requestFullscreen) {
        body.requestFullscreen();
    } else if (cbody.webkitRequestFullscreen) { // Para Safari
        body.webkitRequestFullscreen();
    } else if (body.msRequestFullscreen) { // Para IE/Edge
        body.msRequestFullscreen();
    }
}

// Adicione o evento ao botão
document.querySelector("#botao-iniciar").addEventListener("click", ativarFullscreen);
document.querySelector("#botao-reiniciar").addEventListener("click", ativarFullscreen);



funcaoInicial();