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
            
                sessionStorage.id_maquina = json[0].id_maquina
                
       

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
function getFirstInfo(){
    const fk_estacao = sessionStorage.fk_estacao
    fetch(`../leituras/machines_total/${fk_estacao}`, {
          method: "GET",
      }).then(resposta => {
          if (resposta.ok) {
            resposta.json().then(function (json){
                count_maquinas.innerHTML = json.contagem
                  
              

  
              });
  
          } else {
  
              console.log('aaaaaaa!');
  
              resposta.text().then(texto => {
                  console.error(texto);
                  finalizar_aguardar(texto);
              });
          }
      });
      fetch(`../leituras/stations_total`, {
        method: "GET",
    }).then(resposta => {
        if (resposta.ok) {
          resposta.json().then(function (json){
            count_stations.innerHTML = `${json.contagem} `
           
                
            


            });

        } else {

            console.log('aaaaaaa!');

            resposta.text().then(texto => {
                console.error(texto);
                finalizar_aguardar(texto);
            });
        }
    });
    fetch(`../leituras/getStatusCounter/${sessionStorage.fk_estacao}/Crítico`, {
        method: "GET",
    }).then(resposta => {
        if (resposta.ok) {
          resposta.json().then(function (json){
            count_critical.innerHTML = json.length
          
                
            


            });

        } else {

            console.log('aaaaaaa!');

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    });
    fetch(`../leituras/getStatusCounter/${sessionStorage.fk_estacao}/Perigo`, {
        method: "GET",
    }).then(resposta => {
        if (resposta.ok) {
          resposta.json().then(function (json){
            count_alert.innerHTML = json.length
          
                
            


            });

        } else {

            console.log('aaaaaaa!');

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    });
  
      return false;

}










