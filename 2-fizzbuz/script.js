// se for divisivel por 3 -> fizz
// se for divisivel por 5 -> buzz
// se for divisivel por 3 e 5 -> fizzbuzz
// primeiro verifico se é type number, depois vou na opção mais provável até a mais especifica (pra não gerar conflitos na lógica)
// tem que garantir que funcione bem, pra isso corrija os pequenos erros

const campo = document.querySelector("#campo");
const fizz = document.querySelector("#fizz");
const buzz = document.querySelector("#buzz");

function verificarFizzbuzz() {

    let valor = campo.value;
    valor = parseInt(valor);

    if(isNaN(valor)){
        fizz.style.color = "black";
        buzz.style.color = "black";
    }
    else if(valor % 5 === 0 && valor % 3 === 0 ){
        fizz.style.color = "#5d0296";
        buzz.style.color = "gold";
    }
    else if(valor % 5 === 0){
        fizz.style.color = "black";
        buzz.style.color = "gold";
    }
    else if(valor % 3 === 0){
        fizz.style.color = "#5d0296";
        buzz.style.color = "black";
    }
    else{
        fizz.style.color = "black";
        buzz.style.color = "black";
    }
}