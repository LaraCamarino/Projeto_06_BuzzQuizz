function irCriarQuizz() {
    pagina1 = document.querySelector(".pagina1");
    pagina3Inputs = document.querySelector(".pagina3-inputs");
    pagina1.classList.add("escondido");
    pagina3Inputs.classList.remove("escondido");
}

function abrirConteudoPergunta(icone) {
    icone.parentNode.parentNode.querySelector(".conteudo-pergunta").classList.toggle("escondido");
}

function validacaoInformacoesBasicas() {
    let tituloQuizz = document.getElementById("titulo-quizz").value;
    let tituloImagem = document.getElementById("titulo-imagem").value;
    let quantidadePerguntas = document.getElementById("quantidade-perguntas").value;
    let quantidadeNiveis = document.getElementById("quantidade-niveis").value;

    if(tituloQuizz.length < 20 || tituloQuizz.length > 65) {
        alert("O título deve conter entre 20 e 65 caracteres.");
    }
    if(verificaUrl(tituloImagem) === false) {
        alert("O endereço da imagem não é válido.");
    }
    if(quantidadePerguntas < 3) {
        alert("O quizz deve conter no mínimo 3 perguntas.");
    }
    if(quantidadeNiveis < 2) {
        alert("O quizz deve conter no mínimo 2 níveis.");
    }

}

function verificaUrl(url) {
    const pattern = /^https:\/\//i;

    if (pattern.test(url)) {
        return true
    }
    else {
        return false;
    }
}

function validacaoNiveis() {
    let tituloNivel = document.getElementById("titulo-nivel").value;
    let porcentagemNivel = document.getElementById("porcentagem-nivel").value;
    let imagemNivel = document.getElementById("imagem-nivel").value;
    let descricaoNivel = document.getElementById("descrição-nivel").value;

    if(tituloNivel < 10 ) {
        alert("O título deve conter no mínimo 10 caracteres.");
    }
    if(porcentagemNivel < 0 || porcentagemNivel > 100) {
        alert("A porcentagem deve ser um número de 0 a 100.");
    }
    if(verificaUrl(imagemNivel) === false) {
        alert("O endereço da imagem não é válido.");
    }
    if(descricaoNivel < 30) {
        alert("A descrição deve conter no mínimo 30 caracteres.");
    }
}
