const visor = document.querySelector("#visor");
const botoes = document.querySelectorAll(".button");
const resultado = document.querySelector("#igual");
const ce = document.querySelector("#ce");
const limpar = document.querySelector("#limpar");



botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
        visor.value += botao.textContent;
    })
})

resultado.addEventListener("click", () => {

    
    let conta = visor.value;
    conta = eval(conta);
    if(typeof conta !== "undefined"){
    visor.value = conta;
    }
})

ce.addEventListener("click", () => {
    visor.value = "";
})

limpar.addEventListener("click", () => {

    visor.value = visor.value.substring(0, visor.value.length - 1)
})