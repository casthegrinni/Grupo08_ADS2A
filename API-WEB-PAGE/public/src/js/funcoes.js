let login_usuario;
let nome_usuario;

function redirecionar_login() {
    window.location.href = 'login.html';
}

function verificar_autenticacao() {
    login_usuario = sessionStorage.login_usuario_meuapp;
    nome_usuario = sessionStorage.nome_usuario_meuapp;

    if (login_usuario == undefined) {
        logoff()

    } else {
        validar_sessao();
    }
}

function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    redirecionar_login();
}

function validar_sessao() {
    fetch(`/usuarios/sessao/${sessionStorage.login_usuario_meuapp}`, { cache: 'no-store' })
        .then(resposta => {
            if (resposta.ok) {
                resposta.text().then(texto => {
                    console.log('Sessão :) ', texto);
                });
            } else {
                console.error('Sessão :.( ');
            }
        });
}

function finalizar_sessao() {
    fetch(`/usuarios/sair/${login_usuario}`, { cache: 'no-store' });
}

function getRandomMachine() {
    fetch(`/leituras/getRandom/${sessionStorage.fk_estacao}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(function (json) {
                    sessionStorage.id_maquina = json[0].id_maquina
                    getDadosMachine();

                })

            } else {
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        });
}

function getFirstInfo() {
    const fk_estacao = sessionStorage.fk_estacao
    const tipo_usuario = sessionStorage.tipo_usuario

    fetch(`../leituras/machines_total/${fk_estacao}/${tipo_usuario}`, {
        method: "GET",
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(function (json) {
                count_maquinas.innerHTML = json.contagem
            });
        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    });

    fetch(`../leituras/stations_total`, {
        method: "GET",
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(function (json) {
                if(tipo_usuario == 1) {
                    count_stations.innerHTML = `${json.contagem} `
                } else {
                    count_stations.innerHTML = "1"
                }
            });
        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    });

    fetch(`../leituras/getStatusCounter/${sessionStorage.fk_estacao}/Critico`, {
        method: "GET",
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(function (json) {
                count_critical.innerHTML = json.count
            });
        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    });

    param = "Perigo"
    fetch(`../leituras/getStatusCounter/${sessionStorage.fk_estacao}/Perigo`, {
        method: "GET",
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(function (json) {
                count_alert.innerHTML = json.count
            });
        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    });

    return false;
} 

function setup() {
    b_usuario.innerHTML = sessionStorage.nome_usuario_meuapp
    span_exit.style.cursor = "pointer"

    if (sessionStorage.tipo_usuario == 1) {
        b_tipo_usuario.innerHTML = "Administrador"
    } else {
        b_tipo_usuario.innerHTML = "Técnico"
        div_estacoes.style.display = "none"
    }
}










