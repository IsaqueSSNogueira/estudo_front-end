
const lampada = document.getElementById("lampada");

/*variável de controle inserida por fora, para assim não ter problema da própria função redeclara-la a cada clique*/
let estado = false;

lampada.addEventListener("click", () => {

    if(!estado){
        lampada.src = "img/luz-acesa.jpg";
    }
    else{
        lampada.src = "img/luz-apagada.jpg";
    }
    estado = !estado;
})