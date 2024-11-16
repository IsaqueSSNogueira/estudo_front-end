
// DOM

const teclas = document.querySelectorAll('.tecla');
const checkbox = document.querySelector('#checkbox');
const volumeRange = document.querySelector('#volumeRange');

const nota = null;


// funcoes para tocar
teclas.forEach((element) => {
    
    const tecla = element.dataset.key


    // clique
    element.addEventListener("click", () => {
        const nota = new Audio(`assets/tunes/${tecla}.wav`);
        tocarSom(nota)
        openFullscreen()
    })

    // teclado
    document.addEventListener('keydown', (event) => {
        if(event.key === tecla) {
            const nota = new Audio(`assets/tunes/${tecla}.wav`);
            tocarSom(nota);
            efeitoActive(element, tecla)
        }
    })
})


// tocar
function tocarSom(nota){
    let volume = volumeRange.value;
    nota.volume = volume;
    nota.play();
}



// mostrar teclas
checkbox.addEventListener('click', toggleTeclas)

function toggleTeclas () {
    let show = checkbox.checked;
    teclas.forEach((tecla) => {
        show ? tecla.style.fontSize = "1rem" : tecla.style.fontSize = "0";
    })
}



// efeito do active no teclado
function efeitoActive(element, tecla) {
    const teclasPretas = ['w', 'e', 't', 'y', 'u', 'o', 'p'];

    if (teclasPretas.includes(tecla)) {
        // Se a tecla for preta
        element.classList.add('pretaActive');
        setTimeout(() => {
            element.classList.remove('pretaActive');
        }, 100);
    } else {
        // Se a tecla for branca
        element.classList.add('brancaActive');
        setTimeout(() => {
            element.classList.remove('brancaActive');
        }, 100);
    }
}



// full screen
function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Safari
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE11
      document.documentElement.msRequestFullscreen();
    }
}