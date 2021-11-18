

function getMachines(){
  
    
      const fk_estacao = sessionStorage.fk_estacao
      fetch(`../leituras/machines/${fk_estacao}`, {
            method: "GET",
        }).then(resposta => {
            if (resposta.ok) {
              resposta.json().then(function (json){
                
                    
                   for (let i = 0; i < json.length; i++) {
                       var resp = json[i]
                       fetch(`../leituras/info_machines/${resp.id_maquina}`,{
                           method: "GET",
                       }).then(resposta2 => {
                           if(resposta2.ok){
                               resposta2.json().then(function (json2){
                                   
                               })
                           }
                       })
                       
                            



                      }
                      getFirstInfo()
                      
                  

                     
                });
                
                }
                

    
            else {
    
                console.log('aaaaaaa!');
    
                resposta.text().then(texto => {
                    console.error(texto);
                    
                });
            }
        });
       
       
        getFirstInfo()
        return false;
}
function openDashboard(id_maquina){
      sessionStorage.id_maquina = id_maquina
      window.location.href = `graficos.html`

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
    fetch(`../leituras/getStatusCounter/${sessionStorage.fk_estacao}`, {
        method: "GET",
    }).then(resposta => {
        if (resposta.ok) {
          resposta.json().then(function (json){
              let aux_alert = 0
              let aux_critico = 0
              for (let i; i <json; i++ ) {
                  let resp = json[i]
                  alert(resp.status_web)
                resp.status_web == 'Perigo'? aux_alert ++ : aux_critico ++

              }
              count_critical.innerHTML = aux_critico
              count_alert.innerHTML = aux_alert

                
            


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

