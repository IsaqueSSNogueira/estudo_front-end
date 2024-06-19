const altura = document.querySelector("#altura");
const peso = document.querySelector("#peso");

const alturaR = document.querySelector("#alturaR");
const pesoR = document.querySelector("#pesoR");
const imcR = document.querySelector("#imcR");
const condicao = document.querySelector("#condicao");

const analisar = document.querySelector("#analisar");
const limpar = document.querySelector("#limpar");
const refazer = document.querySelector("#refazer");


analisar.addEventListener("click", () => {

    let valor1 = parseFloat(altura.value);
    let valor2 = parseFloat(peso.value);

    if(isNaN(valor1) || isNaN(valor2) || typeof valor1 !== "number"){
        altura.value = "";
        peso.value = "";
        alert("Digite dois valores válidos para os campos") /* apesar de ser um método que geralmente é invasivo, nesse caso me parece ser uma boa escolha */
    }
    else if(valor1 > 3){
        alert("Digite uma altura válida, não se esqueça de definir os decimais");
    }
    else{
        let valor3 = valor2 / (valor1 * valor1);
        valor1 = valor1.toFixed(2)
        valor2 = valor2.toFixed(2)
        valor3 = valor3.toFixed(2)

        mostrarResultados(valor1, valor2, valor3)
    }
})

function mostrarResultados(v1, v2, v3) {

    alturaR.textContent = v1;
    pesoR.textContent = v2;
    imcR.textContent = v3;

    if(v3 < 18.5){
        condicao.textContent = "Abaixo do peso normal"
    }
    else if(v3 >= 18.5 && v3 < 25){
        condicao.textContent = "Peso normal"
    }
    else if(v3 >= 25 && v3 < 30){
        condicao.textContent = "Excesso de peso"
    }
    else if(v3 >= 30 && v3 < 35){
        condicao.textContent = "Obesidade grau I"
    }
    else if(v3 >= 35 && v3 < 40){
        condicao.textContent = "Obesidade grau II"
    }
    else if(v3 >= 40){
        condicao.textContent = "Obesidade grau III"
    }
    else{
        condicao.textContent = "Ocorreu um erro ao analisar"
    }
    
    window.scrollTo({
        top: 200, 
        behavior: 'smooth'
    });
}

limpar.addEventListener("click", () => {
    altura.value = "";
    peso.value = "";
})

refazer.addEventListener("click", () => {
    alturaR.textContent = "Altura";
    pesoR.textContent = "Peso";
    imcR.textContent = "IMC";
    condicao.textContent = "Condição";

    altura.value = "";
    peso.value = "";
})