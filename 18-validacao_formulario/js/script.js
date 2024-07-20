

// Base 
// const = document.querySelector("")
const body = document.querySelector("body")
const formulario = document.querySelector("#formulario")
const esqueceuSenha = document.querySelector("#esqueceu-senha")
const formularioTitulo = document.querySelector("#formulario-titulo")
const confirmarSenha = document.querySelector("#confirmar-senha")
const containerTermos = document.querySelector("#container-termos")
const formularioBotao = document.querySelector("#formulario-botao")




// função inicial, definir tipo de formulário

function definirTipoFormulario(){
    
    window.addEventListener('hashchange', definirTipoFormulario);
    const urlHash = window.location.hash;
    console.log(urlHash)

    if(urlHash === "#login"){
        definirParaLogin()
        body.classList.add("body-formulario")
    }
    else if(urlHash === "#registrar"){
        definirParaCadastro()
        body.classList.add("body-formulario")
    }
    else{
        window.location.hash = "#registrar"
        body.classList.add("body-index")
    }
}



// tipo de formulario

function definirParaCadastro(){
    // base
    formularioTitulo.textContent = "Cadastrar";
    formularioBotao.textContent = "Cadastrar"
    esqueceuSenha.classList.add("esconder");

    // caso troque
    formulario.classList.remove("#formulario-entrar")
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




// chamar funções iniciais
definirTipoFormulario()