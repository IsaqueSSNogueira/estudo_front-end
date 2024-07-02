
const horaSpan = document.querySelector("#horaSpan");
const minutoSpan = document.querySelector("#minutoSpan");
const segundoSpan = document.querySelector("#segundoSpan");

const diaSemana = document.querySelector("#diaSemana");
const diaSpan = document.querySelector("#diaSpan");
const mesSpan = document.querySelector("#mesSpan");
const anoSpan = document.querySelector("#anoSpan");


function atualizarHora(){

    let novaData = new Date();
    let horaAtual = novaData.getHours();
    let minutoAtual = novaData.getMinutes();
    let segundoAtual = novaData.getSeconds();

    if(segundoAtual < 10){
        segundoAtual = "0" + segundoAtual;
    }

    if(minutoAtual < 10){
        minutoAtual = "0" + minutoAtual;
    }

    if(horaAtual < 10){
        horaAtual = "0" + horaAtual;
    }

    horaSpan.textContent = horaAtual;
    minutoSpan.textContent = minutoAtual;
    segundoSpan.textContent = segundoAtual;

    setTimeout(atualizarHora, 1000)

}

function atualizarData(){

    let novaData = new Date();
    
    switch(novaData.getDay()){
        case 0:
            diaSemana.textContent = "dom";
            break;
        case 1:
            diaSemana.textContent = "seg";
            break;
        case 2:
            diaSemana.textContent = "ter";
            break;
        case 3:
            diaSemana.textContent = "qua";
            break;
        case 4:
            diaSemana.textContent = "qui";
            break;
        case 5:
            diaSemana.textContent = "sex";
            break;
        case 6:
            diaSemana.textContent = "sáb";
            break;
    }

    let data = [novaData.getDate(), novaData.getMonth() + 1, novaData. getFullYear()];

    data.forEach((item, index) => {
        if (item < 10) {
            data[index] = "0" + item;
        }
    });

    diaSpan.textContent = data[0]
    mesSpan.textContent = data[1]
    anoSpan.textContent = data[2]

    setTimeout(atualizarData, 1000)
}

atualizarData();
atualizarHora();
coletarTemp();


/* tô fazendo ainda

async function coletarTemp(){

    const urlTemp = "";
    const response = await fetch(urlTemp);
    const data = await response.json();
    console.log(data)
}


if ("geolocation" in navigator) {
    // Geolocalização disponível
    navigator.geolocation.getCurrentPosition(
        function(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);
        },
        function(error) {
            // Tratamento de erro, se necessário
            console.error("Erro ao obter localização:", error.message);
        }
    );
} else {
    // Geolocalização não suportada pelo navegador
    console.log("Geolocalização não suportada pelo navegador.");
}*/