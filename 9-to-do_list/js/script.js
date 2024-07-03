
// elementos DOM

const divTarefas = document.querySelector("#tarefas");
const campoInput = document.querySelector("#campo");
const addTarefa = document.querySelector("#addTarefa");
const marcador = document.querySelectorAll(".marcador");



// funções iniciais

controleBotao()



// funções de controle e de base

function controleBotao(){
    if(campoInput.value < 1){
        addTarefa.disabled = true;
    }
    else{
        addTarefa.disabled = false;
    }
}

campoInput.addEventListener("input", () => {
    controleBotao();
})

addTarefa.addEventListener("mouseover", () => {
    if(addTarefa.disabled === true){
        addTarefa.setAttribute("title", "Digite uma tarefa");
    }
    else{
        addTarefa.removeAttribute("title");
    }
})

document.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        addTarefa.click();
    }
})


// funções principais

addTarefa.addEventListener("click", () => {

    let tarefaDado = campoInput.value;
    campoInput.value = "";
    addTarefa.disabled = true;
    campoInput.blur();
    renderizarTarefas(tarefaDado);
})


function renderizarTarefas(dado){
    
    // criar elementos
    let containerTarefa = document.createElement("div");
    let marcadorTarefa = document.createElement("button");
    let tarefa = document.createElement("input");
    let opcoesTarefa = document.createElement("i");

    // adicionar classes e dados
    containerTarefa.classList.add("containerTarefa");
    marcadorTarefa.classList.add("marcador");
    tarefa.classList.add("tarefa-criada");
    opcoesTarefa.classList.add("opcoes", "fa-solid", "fa-ellipsis");
    tarefa.value = dado;
    tarefa.disabled = true;

    // adicionar aos elementos pais
    containerTarefa.appendChild(marcadorTarefa);
    containerTarefa.appendChild(tarefa);
    containerTarefa.appendChild(opcoesTarefa);
    divTarefas.appendChild(containerTarefa);

    criarCaixaOpcoes(containerTarefa, tarefa, opcoesTarefa, marcadorTarefa)
}

function criarCaixaOpcoes(containerTarefa, tarefa, opcoesTarefa, marcadorTarefa) {

        let caixaOpcao = document.createElement("div");
        let cores = document.createElement("div");
        let cinza = document.createElement("spas");
        let azul = document.createElement("span");
        let gold = document.createElement("span");
        let vermelho = document.createElement("span");
        let editar = document.createElement("span");
        let deletar = document.createElement("span");
    
        caixaOpcao.classList.add("caixaOpcoes");
        cinza.classList.add("cor", "cinza");
        azul.classList.add("cor", "azul");
        gold.classList.add("cor", "gold");
        vermelho.classList.add("cor", "vermelho");
        cores.classList.add("cores");
        editar.classList.add("editarTarefa");
        deletar.classList.add("deletarTarefa");
    
        cores.appendChild(cinza)
        cores.appendChild(azul)
        cores.appendChild(gold)
        cores.appendChild(vermelho)
        editar.textContent = "Editar";
        deletar.textContent = "Deletar";
        caixaOpcao.appendChild(cores);
        caixaOpcao.appendChild(editar);
        caixaOpcao.appendChild(deletar);
        containerTarefa.appendChild(caixaOpcao);

        opcoesTarefa.addEventListener("click", () => {caixaOpcoes(containerTarefa, tarefa, opcoesTarefa, caixaOpcao, cinza, vermelho, azul, gold, editar, deletar)})
        marcadorTarefa.addEventListener("click", () => {tarefaConcluida(containerTarefa, marcadorTarefa, tarefa, opcoesTarefa, caixaOpcao)});

}

function caixaOpcoes(container, tarefa, opcoes, caixaOpcao, cinza, vermelho, azul, gold, editar, deletar){

    caixaOpcao.classList.toggle("mostrar")
    cinza.addEventListener("click", () => {mudarCor(container, "cinza")})
    vermelho.addEventListener("click", () => {mudarCor(container, "vermelho")})
    azul.addEventListener("click", () => {mudarCor(container, "azul")})
    gold.addEventListener("click", () => {mudarCor(container, "gold")})
    editar.addEventListener("click", () => {editarTarefa(container, tarefa, caixaOpcao)})
    deletar.addEventListener("click", () => {deletarTarefa(container, caixaOpcao)})

    cliqueForaArea(caixaOpcao, opcoes, tarefa)
}

function cliqueForaArea(caixaOpcao, opcoes, tarefa){

    document.addEventListener("click", (event) => {
        if(!caixaOpcao.contains(event.target) && !opcoes.contains(event.target)){
            caixaOpcao.classList.remove("mostrar")
        }

        if(tarefa.disabled === false && !tarefa.contains(event.target)){
            tarefa.disabled = true;
        }

        })

}


function tarefaConcluida(container, marcador, tarefa, opcoes, caixaOpcao){
    
    container.classList.toggle("concluidaContainer")
    marcador.classList.toggle("concluidaMarcador")
    tarefa.disabled = true;
    tarefa.classList.toggle("concluidaTarefa")
    opcoes.classList.toggle("esconder")
    caixaOpcao.classList.remove("mostrar")
}


function editarTarefa(container, tarefa, caixaOpcao){

    setTimeout(() => {    
        tarefa.disabled = false;
        tarefa.focus();
    }, 100)

    document.addEventListener("keydown", (event) => {
        if(event.key === "Enter" && tarefa.disabled === false){
            tarefa.disabled = true;
        }
    })
    caixaOpcao.classList.remove("mostrar");
}

function deletarTarefa(container, caixaOpcao){

    setTimeout(() => {
        container.remove();
    }, 100)
}

// funções secundárias 

function acaomarcador(){
    marcador.forEach((i) => {
        i.addEventListener("mouseover", () => {
        })
    })
}

function mudarCor(campo, cor){
    switch(cor){
        case "cinza":
            campo.style.backgroundColor = "#EEE9E9";
            break;
        case "vermelho":
            campo.style.backgroundColor = "rgb(254, 102, 102)";
            break;
        case "azul":
            campo.style.backgroundColor = "rgb(170, 170, 253)";
            break;
        case "gold":
            campo.style.backgroundColor = "gold";
            break;
    }
}