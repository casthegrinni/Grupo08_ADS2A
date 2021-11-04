function entrar() {
    aguardar();
    var formulario = new URLSearchParams(new FormData(form_login));
    fetch("../usuarios/autenticar", {
        method: "POST",
        body: formulario
    }).then(resposta => {
        if (resposta.ok) {

            resposta.json().then(json => {

                sessionStorage.login_usuario_meuapp = json.email;
                sessionStorage.nome_usuario_meuapp = json.nome;
                sessionStorage.fk_estacao = json.fk_estacao

                window.location.href = 'dashboard.html';
            });

        } else {

            console.log('Erro de login!');

            resposta.text().then(texto => {
                console.error(texto);
                finalizar_aguardar(texto);
            });
        }
    });

    return false;
}

function aguardar() {
    // btn_entrar.disabled = true;
}

function finalizar_aguardar(resposta) {
    // btn_entrar.disabled = false;
}