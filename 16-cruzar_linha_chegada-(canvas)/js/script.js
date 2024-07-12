
// base
const canvas = document.querySelector("#meuCanvas");
const telaLargura = canvas.width;
const telaAltura = canvas.height;
const telaFinal = document.querySelector("#telaFinal")
const reiniciar = document.querySelector("#reiniciar")


// elementos
const bonequinho = canvas.getContext("2d");
const objetivo = canvas.getContext("2d");


// var base boneco
let xBoneco = 20;
let yBoneco = 20;
let tamanhoB = 20;
const movimento = 10;


// var base objetivo 
let larguraObj = 40;
let alturaObjt = telaAltura;
let posicaoObjX = telaLargura - larguraObj;


// dimensoes maximas 

const maxX = telaLargura - tamanhoB;
const maxY = telaAltura - tamanhoB;

// funções criar e limpar

function criarBonequinho(){
    bonequinho.fillStyle = "red";
    bonequinho.fillRect(xBoneco, yBoneco, tamanhoB, tamanhoB)
}

function limparRetangulo(){
    bonequinho.clearRect(xBoneco, yBoneco, tamanhoB, tamanhoB)
}

function criarCenario(){
    objetivo.fillStyle = "mediumseagreen";
    objetivo.fillRect(posicaoObjX, 0, larguraObj, alturaObjt)
}



// mover

function movimentarBonequinho(){

    document.addEventListener("keydown", (event) => {
        
        if(event.key === "ArrowUp" && yBoneco > 0){
            limparRetangulo();
            yBoneco -= movimento;
            criarBonequinho();
        }
        else if(event.key === "ArrowDown" && yBoneco < maxY){
            limparRetangulo();
            yBoneco += movimento;
            criarBonequinho();
        }
        else if(event.key === "ArrowLeft" && xBoneco > 0){
            limparRetangulo();
            xBoneco -= movimento;
            criarBonequinho()
        }
        else if(event.key === "ArrowRight" && xBoneco < maxX){
            limparRetangulo();
            xBoneco += movimento;
            criarBonequinho()
            verificarVenceu()
        }
    })
}



// só pra mostrar tela final
function verificarVenceu(){
    if(xBoneco > posicaoObjX - tamanhoB){
        telaFinal.classList.add("mostrar");
    }
}

reiniciar.addEventListener("click", () => {

    limparTudo();
    xBoneco = 20;
    yBoneco = 20;
    criarBonequinho();
    criarCenario();
    telaFinal.classList.remove("mostrar")
})

// reload
function limparTudo(){
    bonequinho.clearRect(0, 0, telaLargura, telaAltura);
}



criarBonequinho()
movimentarBonequinho();
criarCenario()