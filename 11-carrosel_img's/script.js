
const containerImg = document.querySelector("#container-img")
const botaoLeft = document.querySelector("#leftB")
const botaoRight = document.querySelector("#rightB")
const range = document.querySelector("#inputRange")
const divImg = document.querySelector(".divImg")

const imgs = [1, 2, 3, 4, 5, 6] // adicione conforme as imagens
let position = 1;

botaoLeft.addEventListener("click", () => {mover("left")})
botaoRight.addEventListener("click", () => {mover("right")})

function mover(direcao){

    if(direcao === "left"){
        position = position - 1;
        divImg.style.backgroundImage = `url('img/${position}.png')`
    }
    else if(direcao === "right"){
        position = position + 1;
        divImg.style.backgroundImage = `url('img/${position}.png')`
    }
    controleBotao()
}

function controleBotao(){

    if(position === 1){
        botaoLeft.disabled = true;
    }
    else{
        botaoLeft.disabled = false;
    }

    if(position === imgs.length){
        botaoRight.disabled = true;
    }
    else{
        botaoRight.disabled = false;
    }
}

controleBotao();