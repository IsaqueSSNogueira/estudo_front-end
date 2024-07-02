
// elementos DOM

const divTarefas = document.querySelector("#tarefas");
const campoInput = document.querySelector("#campo");
const addTarefa = document.querySelector("#addTarefa");
const marcador = document.querySelectorAll(".marcador");



// funções iniciais

controleBotao()



// funções de controle

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

// funções principais

addTarefa.addEventListener("click", () => {

    let tarefaDado = campoInput.value;
    campoInput.value = "";
    addTarefa.disabled = true;
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
    opcoesTarefa.classList.add("opcoes");
    opcoesTarefa.classList.add("fa-solid");
    opcoesTarefa.classList.add("fa-ellipsis");
    tarefa.value = dado;

    // adicionar aos elementos pais
    containerTarefa.appendChild(marcadorTarefa);
    containerTarefa.appendChild(tarefa);
    containerTarefa.appendChild(opcoesTarefa);
    divTarefas.appendChild(containerTarefa);

}

// funções secundárias 

function acaomarcador(){
    marcador.forEach((i) => {
        i.addEventListener("mouseover", () => {
        })
    })
}
