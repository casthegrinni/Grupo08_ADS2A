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
    fetch(`/leituras/getRandom/${sessionStorage.fk_estacao}`)
    .then(resposta => {
        
        if (resposta.ok) {
            resposta.json().then(function (json){
            
                console.log(json[0].id_maquina)
                
       

            })
           
        } else {
            resposta.text().then(texto => {
                console.error(texto);
                finalizar_aguardar(texto);
            });
        } 
    });    
}
function getInfosForMachineWithId_maquina(id_maquina){
    fetch(`/leituras/getAllInfo/${id_maquina}`, {cache:'no-store'})
    .then(resposta => {
        
        if (resposta.ok) {
            resposta.json().then(function (json){

                
       

            })
           
        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        } 
    });    

}










