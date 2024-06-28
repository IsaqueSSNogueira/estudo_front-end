// Definir os valores atualizados das moedas convertidas pro BRL
coletarCotacao();

// variaveis principais
const converter = document.querySelector("#converter");
const limpar = document.querySelector("#limpar");
const campo = document.querySelector("#campo");
const resultado = document.querySelector("#resultado");
const radioB = document.querySelectorAll(".radioB");

let dolar = 5.43;
let euro = 5.81;
let libra = 6.87;
let iene = 0.034;

let moeda;
let resposta;

// conversão
converter.addEventListener("click", () => {

    let valor = campo.value;
    radioB.forEach((radios) => {
        if(radios.checked === true){
            moeda = radios.value;
        }
    })

    switch(moeda){
        case "dolar":
            resposta = valor / dolar;
            resultado.textContent = resposta.toFixed(2) + " dólares";
            break;
        case "euro":
                resposta = valor / euro;
                resultado.textContent = resposta.toFixed(2) + " euros";
                break;
        case "libra":
                resposta = valor / libra;
                resultado.textContent = resposta.toFixed(2) + " libras";
                break;
        case "iene":
                resposta = valor / iene;
                resultado.textContent = resposta.toFixed(2) + " ienes japoneses";
                break;
    }
})


// resetar
limpar.addEventListener("click", () => {
    campo.value = "";
    resultado.textContent = "Resultado";
    radioB.forEach((radio) => {
        radio.checked = false;
    })
    moeda = null;
    liberarBotao();
})



// verificação
function liberarBotao(){
    
    radioB.forEach((radios) => {
        if(radios.checked === true){
            moeda = radios.value;
        }
    })
    if(campo.value === "" || typeof moeda !== "string"){
        converter.disabled = true;
        converter.title = "Por favor, insira um valor e escolha uma moeda"
    }
    else{
        converter.disabled = false;
        converter.title = "";
    }
}

liberarBotao()
campo.addEventListener("input", () => {liberarBotao()})
radioB.forEach((radios) => {
    radios.addEventListener("click", () => {
        liberarBotao()
    })
})

// API

async function coletarCotacao(){

    const urlApi = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,JPY-BRL";
    const response = await fetch(urlApi);
    console.log("Response: ",response);
    const data = await response.json();
    console.log("Data: ",data)

    dolar = data.USDBRL.ask;
    euro = data.EURBRL.ask;
    libra = data.GBPBRL.ask;
    iene = data.JPYBRL.ask;

    console.log("Moedas: ",dolar, euro, libra, iene)

}