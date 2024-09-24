

// Base 
// const = document.querySelector("")

// DOM para customizar
const formulario = document.querySelector("#formulario")
const esqueceuSenha = document.querySelector("#esqueceu-senha")
const formularioTitulo = document.querySelector("#formulario-titulo")
const confirmarSenha = document.querySelector("#confirmar-senha")
const containerTermos = document.querySelector("#container-termos")
const formularioBotao = document.querySelector("#formulario-botao")

// Dom para adicionar validações
const campoEmail = document.querySelector("input[type=email]")
const camposSenha = document.querySelectorAll("input[type=password]")
const caixaDialogo = document.querySelector("#caixa-dialogo")
const checkboxTermos = document.querySelector("#checkbox-termos")


// DOM para o conteúdo dos termos

const linkTermos = document.querySelector("#link-termos")
const containerTermosUso = document.querySelector("#container-termos-uso")
const termosUso = document.querySelector("#termos-uso")
const containerListaTermos = document.querySelector("#container-lista-termos")

const tituloLista = document.querySelector("#titulo-lista")
const listaTermos = document.querySelectorAll("#lista-termos li")
const fecharTermos = document.querySelector("#fechar-termos")
const avançarTermos = document.querySelector("#avançar-termos")
const voltarTermos = document.querySelector("#voltar-termos")



// logica e conteudp termos
let termoAtual = 1;
const termosDeUso = [
    // inicialmente iria ser por array, ai preferi separar em objetos pra facilitar, porem ja tava tudo montado, senao usaria factory function
    {
        titulo:"Uso do conteúdo", 
        topico1:"Todo o conteúdo presente neste site, incluindo textos, imagens, gráficos e código, é de minha propriedade ou de terceiros licenciados e está protegido por direitos autorais. O uso do conteúdo é permitido apenas para visualização pessoal e não comercial.", 
        topico2: "É proibida a reprodução, distribuição, modificação ou qualquer outro uso do conteúdo sem minha permissão prévia por escrito."
    },
    {
        titulo:"Insençao de responsabilidade", 
        topico1:"O conteúdo deste site é fornecido como está e sem garantias de qualquer tipo, expressas ou implícitas. Não me responsabilizo por quaisquer danos resultantes do uso ou da incapacidade de usar o conteúdo deste site.",
        topico2:"Não garanto que o site estará sempre disponível ou livre de erros, vírus ou outros componentes prejudiciais."
    },
    {
        titulo:"Links externos", 
        topico1:"Este site pode conter links para sites de terceiros. Não sou responsável pelo conteúdo ou práticas de privacidade desses sites. A inclusão de links não implica endosso ou associação com esses sites.",
        topico2:false
    },
    {
        titulo:"Alterações nos Termos de Uso", 
        topico1:"Reservo-me o direito de modificar estes termos de uso a qualquer momento, sem aviso prévio. As alterações entrarão em vigor imediatamente após a publicação no site. É sua responsabilidade revisar os termos de uso periodicamente.",
        topico2:false,
    },
    {
        titulo:"Lei aplicável", 
        topico1:"Estes termos de uso serão regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa decorrente do uso deste site será resolvida nos tribunais competentes do Brasil.",
        topico2:false
    }
]
    







// funções base e de controle
let urlHash;
let timeOutCaixa;
let timeOutOpacidade;



// função inicial, definir tipo de formulário

function definirTipoFormulario(){
    
    window.addEventListener('hashchange', definirTipoFormulario);
    urlHash = window.location.hash;
    console.log(urlHash)

    // garantir limpeza caso troque
    campoEmail.value = "";
    camposSenha[0].value = "";
    camposSenha[1].value = "";
    checkboxTermos.checked = false;
    caixaDialogo.classList.add("esconder");
    if(urlHash === "#login"){
        definirParaLogin()
    }


    else if(urlHash === "#registrar"){
        definirParaCadastro()
    }
    else{
        window.location.hash = "#registrar"
    }
}



// tipo de formulario

function definirParaCadastro(){
    // base
    formularioTitulo.textContent = "Cadastrar";
    formularioBotao.textContent = "Cadastrar"
    esqueceuSenha.classList.add("esconder");

    // caso troque
    formulario.classList.remove("formulario-entrar")
    confirmarSenha.classList.remove("esconder")
    containerTermos.classList.remove("esconder")
}


function definirParaLogin(){
    // base
    formulario.classList.add("formulario-entrar")
    formularioTitulo.textContent = "Login";
    formularioBotao.textContent = "Entrar"

    esqueceuSenha.classList.remove("esconder");
    confirmarSenha.classList.add("esconder")
    containerTermos.classList.add("esconder")
}


function regexEmail(campoDoEmail){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(campoDoEmail);
}


function verificarCampos(){

    console.log(camposSenha)
    formularioBotao.addEventListener("click", () => {
        
        if(urlHash === "#registrar"){

            if(!regexEmail(campoEmail.value)){
                mostrarCaixadialogo("125px", "Digite um endereço de email válido", campoEmail)
            }
            else if(camposSenha[0].value.length < 6){
                mostrarCaixadialogo("195px", "A senha precisa ter 6 caracteres ou mais", camposSenha[0])
            }
            else if(camposSenha[1].value !== camposSenha[0].value){
                mostrarCaixadialogo("265px", "As senhas não coincidem", camposSenha[1])
            }
            else if(!checkboxTermos.checked){
                caixaDialogo.classList.add("opacidade")
                piscarElemento(containerTermos)
            }
        }
    })
}


function mostrarCaixadialogo(altura, dialogo, inputAtual){

    // renderizar
    caixaDialogo.classList.remove("esconder")
    caixaDialogo.classList.remove("opacidade")
    caixaDialogo.style.top = altura;
    caixaDialogo.textContent = dialogo;
    inputAtual.focus();

    // evitar conflitos
    clearTimeout(timeOutCaixa)
    clearTimeout(timeOutOpacidade)

    // programar mudança de estilo (esconder)
    esconderCaixa()
}

function esconderCaixa(){

    timeOutOpacidade = setTimeout(() => {
        caixaDialogo.classList.add("opacidade")
    }, 4000);

    timeOutCaixa = setTimeout(() => {
        caixaDialogo.classList.add("esconder")
    }, 5000);
}


function piscarElemento(elemento){
    elemento.classList.add("piscar")
    setTimeout(() => {
        elemento.classList.remove("piscar")
    }, 1500)
}


function termos(){
    linkTermos.addEventListener("click", () => {

        // com transição suave
        containerTermosUso.style.display = "flex";
        setTimeout(()=>{
            containerTermosUso.style.opacity = "1";
        }, 100)

        // renderizar manter estavel
        termoAtual = 1;
        renderizarTermos()
        botoesTermos()
    })

    fecharTermos.addEventListener("click", () => {
        
        // com transição suave
        containerTermosUso.style.opacity = "0";
        setTimeout(()=>{
            containerTermosUso.style.display = "none";
        }, 500)
    })

    avançarTermos.addEventListener("click", () => {
        termoAtual = termoAtual + 1;
        renderizarTermos()
        botoesTermos()
    })

    voltarTermos.addEventListener("click", () => {
        termoAtual = termoAtual - 1;
        renderizarTermos()
        botoesTermos()
    })

    containerTermosUso.addEventListener("click", (event) => {
        if(!termosUso.contains(event.target)){
            containerTermosUso.style.opacity = "0";
            setTimeout(()=>{
                containerTermosUso.style.display = "none";
            }, 500)
        }
    })
}

function renderizarTermos(){
    
    termosDeUso.forEach((intem, index) => {

        if(index === termoAtual - 1){
            containerListaTermos.scrollTop = 0;
            tituloLista.textContent = `${termoAtual}. ${intem.titulo}:`;
            listaTermos[0].textContent = intem.topico1

            if(intem.topico2){
                listaTermos[1].setAttribute("type", "disc")
                listaTermos[1].textContent = intem.topico2
            }
            else{
                listaTermos[1].setAttribute("type", "none")
                listaTermos[1].textContent = "";
            }
        }
    })
}

function botoesTermos(){

        // bloquear e liberar botoes
        if(termoAtual < 2){
            voltarTermos.disabled = true;
        }
        else{
            voltarTermos.disabled = false;
        }
    
        if(termoAtual >= termosDeUso.length){
            avançarTermos.disabled = true;
        }
        else{
            avançarTermos.disabled = false;
        }
}

// chamar funções iniciais
definirTipoFormulario()
verificarCampos()
termos()