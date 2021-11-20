

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

