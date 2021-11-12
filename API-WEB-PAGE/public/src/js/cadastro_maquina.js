function setInfo(){
    var nome = sessionStorage.nome_usuario_meuapp
    userName.innerHTML = nome;
}




function cadastroMaquina() {
    var want_disco = checkboxOne.checked ? 1  : 0
    var want_ram = checkboxTwo.checked ? 1 : 0
    var want_cpu = checkboxThree.checked ? 1 : 0
   if(nomeMaquina.value == "" || select_estacao.value == ""){
       alert("Por favor preencha todos os campos")
       return false
   }
   else{
    
    var formulario = new URLSearchParams(new FormData(form_cadastroResponsavel));

        fetch(`../usuarios/cadastrar_maquina/${want_cpu}/${want_ram}/${want_disco}`, {
        method: "POST",
        body: formulario
    }).then(function (response) {
        
        if (response.ok) {
            alert("maquina cadastrada")

            // window.location.href='login.html';

        } else {

            console.log('Erro de cadastro!');
            response.text().then(function (resposta) {
            });
        }
    });

    return false;
}
}
