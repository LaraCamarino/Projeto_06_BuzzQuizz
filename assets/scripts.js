let tituloQuizz;
let urlImagem;
let numeroDePerguntas;
let numeroDeNiveis;

function irCriarQuizz() {
    const pagina1 = document.querySelector(".pagina1");
    const pagina3Inputs = document.querySelector(".pagina3-inputs");
    pagina1.classList.add("escondido");
    pagina3Inputs.classList.remove("escondido");

    irCriarPerguntas();
}

function irCriarPerguntas() {
    if (validacaoInformacoesBasicas()) {
        const pagina3Inputs = document.querySelector(".pagina3-inputs");
        const pagina3Perguntas = document.querySelector(".pagina3-perguntas");
        pagina3Inputs.classList.add("escondido");
        pagina3Perguntas.classList.remove("escondido");
        
        prepararPerguntas();
    } else {
        alert("Por favor, preencha os dados corretamente!");
    }
}

function validacaoInformacoesBasicas() {
    tituloQuizz = document.getElementById("titulo-quizz").value;
    urlImagem = document.getElementById("titulo-imagem").value;
    numeroDePerguntas = document.getElementById("quantidade-perguntas").value;
    numeroDeNiveis = document.getElementById("quantidade-niveis").value;

    if(tituloQuizz.length < 20 || tituloQuizz.length > 65) {
        return false;
    }
    if(verificaUrl(urlImagem) === false) {
        return false;
    }
    if(numeroDePerguntas < 3) {
        return false;
    }
    if(numeroDeNiveis < 2) {
        return false;
    }

    return true;
}

function prepararPerguntas() {
    const containerPerguntas = document.querySelector(".perguntas");
    containerPerguntas.innerHTML = "";
    containerPerguntas.innerHTML += `
        <div class="pergunta">
            <div class="topo-pergunta">
                <h2>Pergunta 1</h2>
            </div>
            <div class="conteudo-pergunta">
                <div class="texto-pergunta">
                    <input type="text" placeholder="Texto da pergunta">
                    <input type="text" placeholder="Cor de fundo da pergunta">
                </div>
                <div class="resposta-correta">
                    <h2>Resposta correta</h2>
                    <input type="text" placeholder="Resposta correta">
                    <input type="text" placeholder="URL da imagem">
                </div>
                <div class="respostas-incorretas">
                    <h2>Respostas incorretas</h2>
                    <div class="resposta-incorreta">
                        <input type="text" placeholder="Resposta incorreta 1">
                        <input type="text" placeholder="URL da imagem 1">
                    </div>
                    <div class="resposta-incorreta">
                        <input type="text" placeholder="Resposta incorreta 2">
                        <input type="text" placeholder="URL da imagem 2">
                    </div>
                    <div class="resposta-incorreta">
                        <input type="text" placeholder="Resposta incorreta 3">
                        <input type="text" placeholder="URL da imagem 3">
                    </div>
                </div>
            </div>
        </div>`
    for (let i = 2; i <= numeroDePerguntas; i++) {
        containerPerguntas.innerHTML += `
            <div class="pergunta">
                <div class="topo-pergunta">
                    <h2>Pergunta ${i}</h2>
                    <ion-icon onclick="abrirConteudoPergunta(this)" name="create-outline"></ion-icon>
                </div>
                <div class="conteudo-pergunta escondido">
                    <div class="texto-pergunta">
                        <input type="text" placeholder="Texto da pergunta">
                        <input type="text" placeholder="Cor de fundo da pergunta">
                    </div>
                    <div class="resposta-correta">
                        <h2>Resposta correta</h2>
                        <input type="text" placeholder="Resposta correta">
                        <input type="text" placeholder="URL da imagem">
                    </div>
                    <div class="respostas-incorretas">
                        <h2>Respostas incorretas</h2>
                        <div class="resposta-incorreta">
                            <input type="text" placeholder="Resposta incorreta 1">
                            <input type="text" placeholder="URL da imagem 1">
                        </div>
                        <div class="resposta-incorreta">
                            <input type="text" placeholder="Resposta incorreta 2">
                            <input type="text" placeholder="URL da imagem 2">
                        </div>
                        <div class="resposta-incorreta">
                            <input type="text" placeholder="Resposta incorreta 3">
                            <input type="text" placeholder="URL da imagem 3">
                        </div>
                    </div>
                </div>
            </div>`
    }
}

function abrirConteudoPergunta(icone) {
    icone.parentNode.parentNode.querySelector(".conteudo-pergunta").classList.toggle("escondido");
}

function abrirConteudoNivel(icone) {
    icone.parentNode.parentNode.querySelector(".conteudo-nivel").classList.toggle("escondido");
}

function irCriarNiveis() {
    if (verificaPerguntas()) {
        const pagina3Perguntas = document.querySelector(".pagina3-perguntas");
        const pagina3Niveis = document.querySelector(".pagina3-niveis");
        pagina3Perguntas.classList.add("escondido");
        pagina3Niveis.classList.remove("escondido");

        prepararNiveis();
    } else {
        alert("Por favor, preencha os dados corretamente!");
    }
}

function verificaPerguntas() {
    for (let i = 1; i <= numeroDePerguntas; i++) {
        const pergunta = document.querySelector(`.perguntas>div:nth-child(${i})`);

        const textoPergunta = pergunta.querySelector(".texto-pergunta input").value;
        if (!verificaTextoPergunta(textoPergunta)) {
            return false;
        }

        const corPergunta = pergunta.querySelector(".texto-pergunta input:last-child").value;
        if (!verificaCorPergunta(corPergunta)) {
            return false;
        }

        const textoDaCorreta = pergunta.querySelector(".resposta-correta input").value;
        if (!verificaTextoDaResposta(textoDaCorreta)) {
            return false;
        }

        const urlDaCorreta = pergunta.querySelector(".resposta-correta input:last-child").value;
        if (!verificaUrl(urlDaCorreta)) {
            return false;
        }

        for(let j = 1; j <= 3; j++) {
            const primeiraRespostaIncorreta = pergunta.querySelector(`.respostas-incorretas div`);
            if (j === 1) {
                const textoDaPrimeiraIncorreta = primeiraRespostaIncorreta.querySelector("input").value;
                if (!verificaTextoDaResposta(textoDaPrimeiraIncorreta)) {
                    return false;
                }

                const urlDaPrimeiraIncorreta = primeiraRespostaIncorreta.querySelector("input:last-child").value;
                if (!verificaUrl(urlDaPrimeiraIncorreta)) {
                    return false;
                }

            } else {
                const respostaIncorreta = pergunta.querySelector(`.respostas-incorretas>div:nth-child(${j})`);
                const textoDaIncorreta = respostaIncorreta.querySelector("input").value;
                if (textoDaIncorreta.length !== 0) {
                    if (!verificaTextoDaResposta(textoDaIncorreta)) {
                        return false;
                    }
                } 
                
                const urlDaIncorreta = respostaIncorreta.querySelector("input:last-child").value;
                if (urlDaIncorreta.length !== 0) {
                    if (!verificaUrl(urlDaIncorreta)) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
    
}

function verificaTextoPergunta(textoPergunta) {
    if (textoPergunta.length < 20) {
        return false;
    } else {
        return true;
    }
}

function verificaTextoDaResposta(textoDaResposta) {
    if (textoDaResposta.length > 0) {
        return true;
    } else {
        return false;
    }
}

function verificaCorPergunta(corPergunta) {
    if (corPergunta[0] !== '#' || corPergunta.length !== 7) {
        return false;
    } else {
        for (let i = 1; i < corPergunta.length; i++) {
            if(!verificaSeHexadecimal(corPergunta[i])) {
                return false;
            }
        }
    }
    return true;
}

function verificaSeHexadecimal(caractere) {
    if (isNaN(Number(caractere))) {
        caractere = caractere.toUpperCase();
        if (caractere === "A" || caractere === "B" || caractere === "C" || caractere === "D" || 
            caractere === "E" || caractere === "F") {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
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

function prepararNiveis() {
    const containerNiveis = document.querySelector(".niveis");
    containerNiveis.innerHTML = "";
    containerNiveis.innerHTML += `
        <div class="nivel">
            <div class="topo-nivel">
                <h2>Nível 1</h2>
            </div>
            <div class="conteudo-nivel">
                <div class="texto-nivel">
                    <input type="text" placeholder="Título do nível">
                    <input type="text" placeholder="% de acerto mínima">
                    <input type="text" placeholder="URL da imagem do nível">
                    <input type="text" placeholder="Descrição do nível">
                </div>
            </div>
        </div>`
    for (let i = 2; i <= numeroDeNiveis; i++) {
        containerNiveis.innerHTML += `
            <div class="nivel">
                <div class="topo-nivel">
                    <h2>Nível ${i}</h2>
                    <ion-icon onclick="abrirConteudoNivel(this)" name="create-outline"></ion-icon>
                </div>
                <div class="conteudo-nivel">
                    <div class="texto-nivel">
                        <input type="text" placeholder="Título do nível">
                        <input type="text" placeholder="% de acerto mínima">
                        <input type="text" placeholder="URL da imagem do nível">
                        <input type="text" placeholder="Descrição do nível">
                    </div>
                </div>
            </div>`
    }
}

function validacaoNiveis() {
    let tituloNivel = document.getElementById("titulo-nivel").value;
    let porcentagemNivel = document.getElementById("porcentagem-nivel").value;
    let imagemNivel = document.getElementById("imagem-nivel").value;
    let descricaoNivel = document.getElementById("descrição-nivel").value;

    let nivelMinimo = 0; //VOLTAR AQUI

    if(tituloNivel.length < 10 ) {
        return false;
    }
    if(porcentagemNivel < 0 || porcentagemNivel > 100) {
        return false;
    }
    if(verificaUrl(imagemNivel) === false) {
        return false;
    }
    if(descricaoNivel.length < 30) {
        return false;
    }

    return true
}

function irSucesso() {
    if (validacaoNiveis()) {
        
    } else {
        alert("Por favor, preencha os dados corretamente!");
    }
}

