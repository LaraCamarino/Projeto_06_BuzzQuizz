let tituloQuizz;
let urlImagem; //Imagem que ficará no título do quizz
let numeroDePerguntas;
let numeroDeNiveis = 3;

const paginaHome = document.querySelector(".pagina1")

let questions = [];
let levels = [];
let quizz = {};
let quizzesDoUsuario = [];
let primeiroQuizz = 0;

const idQuizzesUsuario = [];

function irCriarQuizz() {
    const pagina1 = document.querySelector(".pagina1");
    const pagina3Inputs = document.querySelector(".pagina3-inputs");
    pagina1.classList.add("escondido");
    pagina3Inputs.classList.remove("escondido");
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

    quizz.title = tituloQuizz;
    quizz.image = urlImagem;
    return true;
}

function irCriarPerguntas() {
    if (validacaoInformacoesBasicas()) {
        const pagina3Inputs = document.querySelector(".pagina3-inputs");
        const pagina3Perguntas = document.querySelector(".pagina3-perguntas");
        pagina3Inputs.classList.add("escondido");
        pagina3Perguntas.classList.remove("escondido");
        
        prepararPerguntas();
    } else  {
        alert("Por favor, preencha os dados corretamente!");
    }
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

function verificaPerguntas() {
    for (let i = 1; i <= numeroDePerguntas; i++) {
        const pergunta = document.querySelector(`.perguntas>div:nth-child(${i})`);
        let question = {};
        let answers = [];
        let correctAnswer = {};
        let wrongAnswer1 = {};
        let wrongAnswer2 = {};
        let wrongAnswer3 = {};

        const textoPergunta = pergunta.querySelector(".texto-pergunta input").value;
        if (!verificaTextoPergunta(textoPergunta)) {
            return false;
        } else {
            question.title = textoPergunta;
        }

        const corPergunta = pergunta.querySelector(".texto-pergunta input:last-child").value;
        if (!verificaCorPergunta(corPergunta)) {
            return false;
        } else {
            question.color = corPergunta;
        }

        const textoDaCorreta = pergunta.querySelector(".resposta-correta input").value;
        if (!verificaTextoDaResposta(textoDaCorreta)) {
            return false;
        } else {
            correctAnswer.text = textoDaCorreta;
        }

        const urlDaCorreta = pergunta.querySelector(".resposta-correta input:last-child").value;
        if (!verificaUrl(urlDaCorreta)) {
            return false;
        } else {
            correctAnswer.image = urlDaCorreta;
            correctAnswer.isCorrectAnswer = true;
            answers.push(correctAnswer);
        }

       
        const primeiraRespostaIncorreta = pergunta.querySelector(`.respostas-incorretas div`);
        const textoDaPrimeiraIncorreta = primeiraRespostaIncorreta.querySelector("input").value;
        if (!verificaTextoDaResposta(textoDaPrimeiraIncorreta)) {
            return false;
        } else {
            wrongAnswer1.text = textoDaPrimeiraIncorreta;
        }

        const urlDaPrimeiraIncorreta = primeiraRespostaIncorreta.querySelector("input:last-child").value;
        if (!verificaUrl(urlDaPrimeiraIncorreta)) {
            return false;
        } else {
            wrongAnswer1.image = urlDaPrimeiraIncorreta;
            wrongAnswer1.isCorrectAnswer = false;
            answers.push(wrongAnswer1);
        }

        const segundaRespostaIncorreta = pergunta.querySelector(`.respostas-incorretas>div:nth-child(3)`);
        const textoDaSegundaIncorreta = segundaRespostaIncorreta.querySelector("input").value;
        const urlDaSegundaIncorreta = segundaRespostaIncorreta.querySelector("input:last-child").value;
        if (textoDaSegundaIncorreta.length !== 0 && urlDaSegundaIncorreta.length !== 0) {
            if (!verificaTextoDaResposta(textoDaSegundaIncorreta)) {
                return false;
            } else {
                wrongAnswer2.text = textoDaSegundaIncorreta;
            }

            if (!verificaUrl(urlDaSegundaIncorreta)) {
                return false;
            } else {
                wrongAnswer2.image = urlDaSegundaIncorreta;
                wrongAnswer2.isCorrectAnswer = false;
                answers.push(wrongAnswer2);
            }
        } 

        const terceiraRespostaIncorreta = pergunta.querySelector(`.respostas-incorretas>div:nth-child(4)`);
        const textoDaTerceiraIncorreta = terceiraRespostaIncorreta.querySelector("input").value;
        const urlDaTerceiraIncorreta = terceiraRespostaIncorreta.querySelector("input:last-child").value;
        if (textoDaTerceiraIncorreta.length !== 0 && urlDaTerceiraIncorreta.length !== 0) {
            if (!verificaTextoDaResposta(textoDaTerceiraIncorreta)) {
                return false;
            } else {
                wrongAnswer3.text = textoDaTerceiraIncorreta;
            }

            if (!verificaUrl(urlDaTerceiraIncorreta)) {
                return false;
            } else {
                wrongAnswer3.image = urlDaTerceiraIncorreta;
                wrongAnswer3.isCorrectAnswer = false;
                answers.push(wrongAnswer3);
            }
        } 

        answers.sort(embaralharRespostas);
        question.answers = answers;
        questions.push(question);
    }

    quizz.questions = questions;
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
                    <input type="text" id="titulo-nivel" placeholder="Título do nível">
                    <input type="text" id="porcentagem-nivel" placeholder="% de acerto mínima">
                    <input type="text" id="imagem-nivel" placeholder="URL da imagem do nível">
                    <input type="text" id="descrição-nivel" placeholder="Descrição do nível">
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
                <div class="conteudo-nivel escondido">
                    <div class="texto-nivel">
                        <input type="text" id="titulo-nivel" placeholder="Título do nível">
                        <input type="text" id="porcentagem-nivel" placeholder="% de acerto mínima">
                        <input type="text" id="imagem-nivel" placeholder="URL da imagem do nível">
                        <input type="text" id="descrição-nivel" placeholder="Descrição do nível">
                    </div>
                </div>
            </div>`
    }
}

function abrirConteudoNivel(icone) {
    icone.parentNode.parentNode.querySelector(".conteudo-nivel").classList.toggle("escondido");
}

function validacaoNiveis() {
    const auxLevels = [];
    const porcentagemNiveis = [];

        // title: tituloNivel,
        // image: imagemNivel,
        // text: descricaoNivel,
        // minValue: porcentagemNivel 

    for (let i = 1; i <= numeroDeNiveis; i++) {
        const nivel = document.querySelector(`.niveis>div:nth-child(${i})`);
        let level = {};
  
        const tituloNivel = nivel.querySelector("#titulo-nivel").value;
        if (!verificaTituloNivel(tituloNivel)) {
            return false;
        } else {
            level.title = tituloNivel;
        }

        const porcentagemNivel = Number(nivel.querySelector("#porcentagem-nivel").value);
        if (!verificaPorcentagemNivel(porcentagemNivel)) {
            return false;
        } else {
            level.minValue = porcentagemNivel;
            porcentagemNiveis.push(porcentagemNivel);
        }

        const descricaoNivel = nivel.querySelector("#descrição-nivel").value;
        if (!verificaDescricaoNivel(descricaoNivel)) {
            return false;
        } else {
            level.text = descricaoNivel;
        }

        const imagemNivel = nivel.querySelector("#imagem-nivel").value;
        if (!verificaUrl(imagemNivel)) {
            return false;
        } else {
            level.image = imagemNivel;
        }

        auxLevels.push(level);
    }

    if(!verificaNivelMinimo(porcentagemNiveis)) {
        return false;
    }
     
    levels = auxLevels;
    quizz.levels = levels;
    return true;
}

function verificaTituloNivel(tituloNivel) {
    if (tituloNivel.length < 10) {
      return false;
    } else {
      return true;
    }
}
  
function verificaPorcentagemNivel(porcentagemNivel) {
    if(porcentagemNivel < 0 || porcentagemNivel > 100) {
        return false;
    } else {
        return true;
    }
}

function verificaNivelMinimo(porcentagemNiveis) {
    for (let i = 0; i < porcentagemNiveis.length; i++) {
        if (porcentagemNiveis[i] === 0){
            return true;
        }
    }

    return false;
}
  
function verificaDescricaoNivel(descricaoNivel) {
    if (descricaoNivel.length < 30) {
      return false;
    } else {
      return true;
    }
}

function salvarQuizz() {
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", quizz);
    promise.then(armazenarQuizzUsuario);
}



function armazenarQuizzUsuario(resposta) {
    if (primeiroQuizz === 0) {
        quizzesDoUsuario.push(resposta.data);
        idQuizzesUsuario.push(resposta.data.id);
        let quizzSerializado = JSON.stringify(resposta.data);
        localStorage.setItem("quizzesDoUsuario", quizzSerializado);
        primeiroQuizz++;
    } else {
        quizzesDoUsuario = JSON.parse(localStorage.getItem("quizzesDoUsuario"));
        quizzesDoUsuario.push(resposta.data);
        idQuizzesUsuario.push(resposta.data.id);
        let quizzSerializado = JSON.stringify(resposta.data);
        localStorage.setItem("quizzesDoUsuario", quizzSerializado);
    }

    quizz = {};
    prepararSucesso();
}

function irSucesso() {
  if (validacaoNiveis()) {
    salvarQuizz();
  } else {
    alert("Por favor, preencha os dados corretamente!");
  }
}

function prepararSucesso() {
    const pagina3Niveis = document.querySelector(".pagina3-niveis");
    const pagina3Sucesso = document.querySelector(".pagina3-sucesso");
    pagina3Sucesso.classList.remove("escondido");
    pagina3Niveis.classList.add("escondido");

    const quizzCriado = document.querySelector(".quizz-criado");
    quizzCriado.innerHTML = `
        <div class="degrade">
            <img src=${urlImagem} />
        </div>
        <h3>${tituloQuizz}</h3>
    `
}

function embaralharRespostas() {
    return Math.random() - 0.5;
}

function voltarHome() {
    paginaHome.classList.remove("escondido");
    document.querySelector(".pagina2").classList.add("escondido");
    document.querySelector(".pagina3-sucesso").classList.add("escondido");
    //Outra opção - document.location.reload(true);
}

function limparQuizzesUsuario() {
    localStorage.removeItem("quizzesDoUsuario");
}