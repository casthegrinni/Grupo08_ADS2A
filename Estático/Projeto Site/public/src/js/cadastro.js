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

function cadastrar() {
    aguardar();
    var formulario = new URLSearchParams(new FormData(form_cadastro));
    fetch("../usuarios/cadastrar", {
        method: "POST",
        body: formulario
    }).then(function (response) {
        
        if (response.ok) {

            window.location.href='login.html';

        } else {

            console.log('Erro de cadastro!');
            response.text().then(function (resposta) {
                div_erro.innerHTML = resposta;
            });
            finalizar_aguardar();
        }
    });

    return false;
}

function aguardar() {
    btn_entrar.disabled = true;
    img_aguarde.style.display='block';
    div_erro.style.display='none';
}

function finalizar_aguardar() {
    btn_entrar.disabled = false;
    img_aguarde.style.display='none';
    div_erro.style.display='block';
}