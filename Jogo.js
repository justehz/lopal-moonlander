//Moonlander. um jogo de alunissagem.
//Juan Beserra (https://github.com/justehz)
//28/03/2025
//Versão 0.1.0

/** @type {HTMLCanvasElement} */

let canvas = document.querySelector("#Jogo");
let contexto = canvas.getContext("2d");

let modulolunar = {
    posicao: {
        x: 100,
        y: 100
    },
    angulo: 0,
    largura: 20,
    altura: 20,
    cor: "pink",
    motorligado: false,
    velocidade: {
        x: 0,
        y: 0
    },
    combustivel: 100
}

let jogoAcabado = false;

let alturaChao = canvas.height - 20;

function desenharModuloLunar() {
    contexto.save();
    contexto.beginPath();
    contexto.translate(modulolunar.posicao.x, modulolunar.posicao.y);
    contexto.rotate(modulolunar.angulo);
    contexto.rect(-modulolunar.largura / 2, -modulolunar.altura / 2,
        modulolunar.largura, modulolunar.altura);
    contexto.fillStyle = modulolunar.cor;
    contexto.fill();
    contexto.closePath();

    if (modulolunar.motorligado) {
        desenharchama();
    }

    contexto.restore();
}

function desenharchama() {
    contexto.beginPath();
    contexto.moveTo(-modulolunar.largura / 2, modulolunar.altura / 2);
    contexto.lineTo(modulolunar.largura / 2, modulolunar.altura / 2);
    contexto.lineTo(0, modulolunar.altura / 2 + Math.random() * 80);
    contexto.lineTo(-modulolunar.largura / 2, modulolunar.altura / 2);
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
}

function mostrarvelocidade() {
    contexto.font = "bold 18px times new roman";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade = `velocidade = ${(10 * modulolunar.velocidade.y).toFixed(2)}`;
    contexto.fillText(velocidade, 100, 60)
}

function mostrarcombustivel() {
    contexto.font = "bold 18px times new roman";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "lightgray";
    let combustivel = `combustível = ${(modulolunar.combustivel).toFixed(0)}%`;
    contexto.fillText(combustivel, 100, 80)
}



function desenhar() {
    contexto.clearRect(0, 0, canvas.width, canvas.height);


    atracaogravitacional();
    desenharModuloLunar();
    requestAnimationFrame(desenhar);
    mostrarvelocidade()
    mostrarcombustivel()

    if (jogoAcabado) {
        mostrarGameOver();
       
    }

    function mostrarGameOver() {
        contexto.font = "bold 30px Arial";
        contexto.textAlign = "center";
        contexto.textBaseline = "middle";
        contexto.fillStyle = "red"; 
        contexto.fillText("GAME OVER", canvas.width / 2, canvas.height / 2); 

}
}
document.addEventListener("keydown", teclaPressionada);


function teclaPressionada(evento) {
    if (evento.keyCode == 38) {
        modulolunar.motorligado = true;

    }
}

document.addEventListener("keyup", teclasolta);

function teclasolta(evento) {
    if (evento.keyCode == 38) {
        modulolunar.motorligado = false;
    }
}

let gravidade = 0.1;

function atracaogravitacional() {
    if (jogoAcabado) return;
    modulolunar.posicao.x += modulolunar.velocidade.x;
    modulolunar.posicao.y += modulolunar.velocidade.y;
    if (modulolunar.motorligado) {
        modulolunar.velocidade.y -= 0.0120
        modulolunar.combustivel -= 0.05
    } if (modulolunar.combustivel < 0) {
        modulolunar.combustivel = 0
    }

    if (!modulolunar.motorligado) {
        modulolunar.velocidade.y += gravidade;
    }


    if (modulolunar.combustivel == 0) {
        modulolunar.motorligado = false
    }

    if (modulolunar.posicao.y >= alturaChao) {
        modulolunar.posicao.y = alturaChao;
        modulolunar.velocidade.y = 0;
        modulolunar.motorligado = false;
        jogoAcabado = true;
    }
}
if (modulolunar.posicao.y >= alturaChao) {
    modulolunar.posicao.y = alturaChao;
    modulolunar.velocidade.y = 0;
    modulolunar.motorligado = false;
    jogoAcabado = true;
}

desenhar();
