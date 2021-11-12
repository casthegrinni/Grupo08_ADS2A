// const { json } = require("sequelize/types");

let login_usuario;
let nome_usuario;

function redirecionar_login() {
    window.location.href = 'login.html';
}

function verificar_autenticacao() {
    console.log("Teste verificar autenti")
    login_usuario = sessionStorage.login_usuario_meuapp;
    nome_usuario = sessionStorage.nome_usuario_meuapp;
    
    if (login_usuario == undefined)  {
        redirecionar_login();
    } else {
        b_usuario.innerHTML = nome_usuario;
        validar_sessao();
    }
    
}

function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    redirecionar_login();
}

function validar_sessao() {
    fetch(`/usuarios/sessao/${login_usuario}`, {cache:'no-store'})
    .then(resposta => {
        if (resposta.ok) {
            resposta.text().then(texto => {
                console.log('Sessão :) ', texto);    
            });
        } else {
            console.error('Sessão :.( ');
            logoff();
        } 
    });    
}

function finalizar_sessao() {
    fetch(`/usuarios/sair/${login_usuario}`, {cache:'no-store'}); 
}
function getRandomMachine(){
    fetch(`/leituras/getRandom/${sessionStorage.fk_estacao}`, {cache:'no-store'})
    .then(resposta => {
        
        if (resposta.ok) {
            resposta.json().then(function (json){
                let array_critical = []
                let array_alerta = []
                for (let i = 0; i < json.length; i++) {
                    const obj = json[i];
                    switch (obj.status_web){
                        case "critico":
                            array_critical.push(obj.id_maquina)
                            json.splice(pos,i)
                            break;
                        case "alerta":
                            array_alerta.push(obj.id_maquina)
                            json.splice(pos,i)
                            break;
                        default: 
                         break;       
                    }
                }
                if(array_critical.length != 0){
                  
                       
                        let max = array_critical[0]
                        let min = max
                        for (let i = 0; i < array_critical.length; i++) {
                            const element = array_critical[i];
                            max < element ? max = element : max = max
                            min > element ? max = element : min = min
                            
                        }
                        var number = Math.random() * (max - min) + min;
                        sessionStorage.id_maquina = number
                        
                    
                }else if(array_alerta != 0 ){
                    let max = array_alerta[0]
                    let min = max
                    for (let i = 0; i < array_alerta.length; i++) {
                        const element = array_alerta[i];
                        max < element ? max = element : max = max
                        min > element ? max = element : min = min
                        
                    }
                    let number = Math.random() * (max - min) + min;
                    sessionStorage.id_maquina = number

                }else {
                    let max = array_alerta[0]
                    let min = max
                    for (let i = 0; i < json.length; i++) {
                        const element = json[i];
                        max < element ? max = element : max = max
                        min > element ? max = element : min = min
                        
                    }
                    let number = Math.random() * (max - min) + min;
                    sessionStorage.id_maquina = number

                }
                alert(sessionStorage.id_maquina)


            })
           
        } else {
            resposta.text().then(texto => {
                console.error(texto);
                finalizar_aguardar(texto);
            });
        } 
    });    
}










