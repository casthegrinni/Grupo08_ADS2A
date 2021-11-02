function proximo() {
    form1.style.display = "none";
    form2.style.display = "block";
    progress.style.width = "300px";
}

function anterior() {
    form1.style.display = "block";
    form2.style.display = "none";
    progress.style.width = "140px";
}

function entrar() {
    aguardar();
    var formulario = new URLSearchParams(new FormData(form_login));
    fetch("../usuarios/autenticar", {
        method: "POST",
        body: formulario
    }).then(resposta => {
        if (resposta.ok) {

            resposta.json().then(json => {

                sessionStorage.login_usuario_meuapp = json.login;
                sessionStorage.nome_usuario_meuapp = json.nome;

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