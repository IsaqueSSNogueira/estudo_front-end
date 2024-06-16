const botao = document.querySelector("#botao");
const campo = document.querySelector("#campo");
const resultado = document.querySelector("#resultado");
const nova = document.querySelector("#nova");
const som = document.querySelector("#som");
const imgSom = document.querySelector("#img-som");
const mostrarValor = document.querySelector("#mostrarValor");

let aleatorio = Math.ceil(Math.random() * 100);

botao.addEventListener("click", () => {

    let numero = campo.value;
    numero = parseInt(numero);

    if(isNaN(numero)){
        resultado.textContent = "Digite um número entre 1 e 100";
    }
    else if(numero > aleatorio){
        resultado.textContent = `Quase lá, ${numero} é maior que o aleatório...`;
    }
    else if(numero < aleatorio){
        resultado.textContent = `Quase lá, ${numero} é menor que o aleatório...`;
    }
    else if(numero === aleatorio){
        resultado.textContent = `Parabéns, você acertou!! ${numero} é o número secreto`;
    }
    else{
        resultado.textContent = "Ocorreu um erro, tente novamente!";
    }
})

nova.addEventListener("click", () => {

    aleatorio = Math.round(Math.random() * 100);
    resultado.textContent = "Digite um número entre 1 e 100";
    mostrarValor.textContent = "Ver número";
    mostrarAleatorio = false;
})


const audio = new Audio("sons/kof99_sha-la-la.mp3");
audio.volume = 0.04;

som.addEventListener("click", () => {

    if(!audio.paused){
        audio.pause();
        imgSom.src = "img/sem-som.png";
    }
    else{
        audio.play();
        imgSom.src = "img/som.png";
    }
})


let mostrarAleatorio = false;

mostrarValor.addEventListener("click", () => {

    if(!mostrarAleatorio){
        mostrarValor.textContent = aleatorio;
        mostrarAleatorio = true;
    }
    else{
        mostrarValor.textContent = "Ver número";
        mostrarAleatorio = false;

    }
})