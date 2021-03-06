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
                sessionStorage.fk_estacao = json.fk_estacao;
                sessionStorage.tipo_usuario = json.tipo_usuario;

                window.location.href = 'dashboard.html';
            });

        } else {
            resposta.text().then(texto => {
                swal("Falha de Autenticação!", "Login ou Senha incorretos!", "error");
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
