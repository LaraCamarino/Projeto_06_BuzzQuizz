let tituloQuizz;
let urlImagem; //Imagem que ficará no título do quizz
let numeroDePerguntas;
let numeroDeNiveis;

let questions = [];
let levels = [];
let quizz = {};

let numeroDeAcertos = 0;

let idQuizzCriado;

let quizzEscolhido;
let NumeroDePerguntasDoSelecionado;

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

        window.scrollTo({ top: 0, behavior: 'smooth' })

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
                        <input type="text" id="descrição-nivel" class="input-descricao" placeholder="Descrição do nível">
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
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", quizz);
    promise.then(armazenarQuizzUsuario);
}

function armazenarQuizzUsuario(resposta) {
    let idQuizzesUsuario = [];
    let idsSerializados;

    idQuizzesUsuario = JSON.parse(localStorage.getItem("ids"));

    if (idQuizzesUsuario === null) {
        idQuizzesUsuario = [];
    }

    idQuizzCriado = resposta.data.id;
    idQuizzesUsuario.push(idQuizzCriado);
    idsSerializados = JSON.stringify(idQuizzesUsuario);
    localStorage.setItem("ids", idsSerializados);
    

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

    window.scrollTo({ top: 0, behavior: 'smooth' })

    const quizzCriado = document.querySelector(".quizz-criado");
    quizzCriado.innerHTML = `
        <div id="" class="degrade" onclick="abrirQuizzCriado(idQuizzCriado)">
            <img src=${urlImagem} />
        </div>
        <h3>${tituloQuizz}</h3>
    `
}

function embaralharRespostas() {
    return Math.random() - 0.5;
}

function voltarHome() {
    document.location.reload(true);
}

function limparQuizzesUsuario() {
    localStorage.removeItem("ids");
}

function buscarQuizzes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promise.then(carregarQuizzes);
}

function carregarQuizzes(resposta) {
    let quizzes = resposta.data;
    let quizzesUsuario = document.querySelector(".meus-quizzes").querySelector(".quizzes");
    let todosQuizzes = document.querySelector(".todos-quizzes").querySelector(".quizzes");
    let idQuizzesUsuario = JSON.parse(localStorage.getItem("ids"));

    if (idQuizzesUsuario === null) {
        idQuizzesUsuario = [];
    }

    quizzesUsuario.innerHTML = "";
    todosQuizzes.innerHTML = "";
    for (let i = 0; i < quizzes.length; i++) {
        if (verificaQuizzUsuario(quizzes[i].id, idQuizzesUsuario)) {
            preparaQuizzesUsuario(quizzes[i], quizzesUsuario);
        } else {
            preparaTodosQuizzes(quizzes[i], todosQuizzes);
        }
    }

    if (idQuizzesUsuario.length > 0) {
        document.querySelector(".meus-quizzes-vazio").classList.add("escondido");
        document.querySelector(".meus-quizzes").classList.remove("escondido");
    }
}

function verificaQuizzUsuario(idQuizz, idQuizzesUsuario) {
    for(let i = 0; i < idQuizzesUsuario.length; i++) {
        if (Number(idQuizz) === idQuizzesUsuario[i]) {
            return true;
        } 
    }
    return false;
}

function preparaQuizzesUsuario(quizz, quizzesUsuario) {
    quizzesUsuario.innerHTML += `
        <div id="${quizz.id}" class="quizz" onclick="abrirQuizzSelecionado(this)">
            <div class="degrade">
                <img src="${quizz.image}" />
            </div>
            <h3>${quizz.title}</h3>
        </div> `
}

function preparaTodosQuizzes(quizz, todosQuizzes) {
    todosQuizzes.innerHTML +=  `
        <div id="${quizz.id}" class="quizz" onclick="abrirQuizzSelecionado(this)">
            <div class="degrade">
                <img src="${quizz.image}" />
            </div>
            <h3>${quizz.title}</h3>
        </div> `
}

buscarQuizzes();

function abrirQuizzSelecionado(quizz) {
    let idQuizzSelecionado = `${quizz.id}`;

    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${idQuizzSelecionado}`);
    promise.then(preparaQuizzSelecionado);
}

function abrirQuizzCriado(idQuizzCriado) {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${idQuizzCriado}`);
    promise.then(preparaQuizzSelecionado);
}

function preparaQuizzSelecionado(resposta) {
    if (document.querySelector(".pagina1").classList.contains("escondido")) {
        const pagina3Sucesso = document.querySelector(".pagina3-sucesso");
        const pagina2 = document.querySelector(".pagina2");
        pagina3Sucesso.classList.add("escondido");
        pagina2.classList.remove("escondido");
    } else {
        const pagina1 = document.querySelector(".pagina1");
        const pagina2 = document.querySelector(".pagina2");
        pagina1.classList.add("escondido");
        pagina2.classList.remove("escondido");
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })

    quizzEscolhido = resposta.data;
    let questions = quizzEscolhido.questions;
    NumeroDePerguntasDoSelecionado = questions.length;

    const quizzSelecionado = document.querySelector(".quizz-selecionado");
    quizzSelecionado.innerHTML = "";
    quizzSelecionado.innerHTML +=  `
        <header class="titulo-quiz">
            <div class="overlay-preto">
                <img src="${quizzEscolhido.image}" />
            </div>
            <h1>${quizzEscolhido.title}</h1>
        </header>
        <div class="conteiner-quiz"></div>`

    const containerQuizz = document.querySelector(".conteiner-quiz")
    for(let i = 0; i < questions.length; i++) {
        containerQuizz.innerHTML +=  `
            <div class="caixa-pergunta i${i}">
                <div id="pergunta${i}" style="background-color:${questions[i].color}" class="titulo-pergunta">${questions[i].title}</div>
                <div class="caixa-opcoes"></div>
            </div>`
        
    let answers = questions[i].answers;
    const conteinerOpcoes = document.querySelector(".i"+ i +"> .caixa-opcoes");
    conteinerOpcoes.innerHTML = "";
    questions[i].answers.sort(embaralharRespostas);

        for(let j = 0; j < answers.length; j++) {
            conteinerOpcoes.innerHTML += `
            <div class="opcao ${answers[j].isCorrectAnswer}" onclick="opcaoEscolhida(this)">
                <img src="${answers[j].image}" alt="">
                <p>${answers[j].text}</p>
            </div>`;
        }   
    }       
}

function opcaoEscolhida(opcaoEscolhida) {
    let caixaOpcoes = opcaoEscolhida.parentNode;
    let opcoes = caixaOpcoes.querySelectorAll(".opcao");

    if(caixaOpcoes.classList.contains("respondida")) {
        return;
    }

    for(let i = 0; i < opcoes.length; i++) {
        if(opcaoEscolhida !== opcoes[i]) {
            opcoes[i].classList.add("nao-selecionada");
        }
        if(opcoes[i].classList.contains("true")) {
            opcoes[i].classList.add("certa");
        }
        if(opcoes[i].classList.contains("false")) {
            opcoes[i].classList.add("errada");
        }
        caixaOpcoes.classList.add("respondida");
    }

    if (opcaoEscolhida.classList.contains("certa")) {
        numeroDeAcertos++;
    }

    if (caixaOpcoes.parentNode.classList.contains(`i${NumeroDePerguntasDoSelecionado-1}`)) {
        mostrarResultado();
        setTimeout(scrollParaFim, 2000);
    } else {
        setTimeout(scrollParaProxima, 2000, opcaoEscolhida);
    }
    caixaOpcoes.classList.add("respondida");
   
}

function mostrarResultado() {
    const quizzSelecionado = document.querySelector(".quizz-selecionado");
    const porcentagemAcerto = Math.round((numeroDeAcertos/NumeroDePerguntasDoSelecionado)*100);
    const levels = quizzEscolhido.levels;
    let minValueAnterior = 0;
    let indiceAtingido = 0;
    for (let i = 0; i < levels.length; i++) {
        if (porcentagemAcerto >= levels[i].minValue && minValueAnterior <= levels[i].minValue) {
            minValueAnterior = levels[i].minValue;
            indiceAtingido = i;
        }
    }

    const levelAtingido = quizzEscolhido.levels[indiceAtingido];

    quizzSelecionado.innerHTML += `
        <div class="caixa-resultado">
                <div class="titulo-resultado">${porcentagemAcerto}% de acerto: ${levelAtingido.title}</div>
                <div class="conteudo-resultado">
                    <img src=${levelAtingido.image} alt="">
                    <p>${levelAtingido.text}</p>
                </div>
            </div>
            <div class="reininciar">
                    <button onclick="reininciarQuizz()">Reiniciar Quizz</button>
            </div>
            <div class="voltar-home">
                    <button onclick="voltarHome()">Voltar pra home</button>
        </div>
        `
}

function scrollParaProxima(pergunta) {
    const elemento = pergunta.parentNode.parentNode;
    const proximaPergunta = elemento.nextElementSibling;
    proximaPergunta.scrollIntoView({ behavior: "smooth" });
}

function scrollParaFim() {
    const resultado = document.querySelector(".caixa-resultado");
    resultado.scrollIntoView({ behavior: "smooth" });
}

function reininciarQuizz() {
    NumeroDePerguntasDoSelecionado = 0;
    numeroDeAcertos = 0;
    abrirQuizzSelecionado(quizzEscolhido);
    document.documentElement.scrollTo({top: 0, behavior: "smooth"});
}

//limparQuizzesUsuario();