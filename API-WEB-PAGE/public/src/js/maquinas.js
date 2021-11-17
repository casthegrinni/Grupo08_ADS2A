

function getMachines(){
  
    
      const fk_estacao = sessionStorage.fk_estacao
      fetch(`../leituras/machines/${fk_estacao}`, {
            method: "GET",
        }).then(resposta => {
            if (resposta.ok) {
              resposta.json().then(function (json){
                   var status
                
                    
                   for (let i = 0; i < json.length; i++) {

                            const resposta = json[i];
                           let row =  rows_table.insertRow(i)
                           var cell1 = row.insertCell(0)
                           var cell2 = row.insertCell(1)
                           var cell3 = row.insertCell(2)
                           var cell4 = row.insertCell(3)
                          status  = getStatusForIdMachine(resposta.id_maquina)
                          

                           
                           
                           cell1.innerHTML = `${resposta.id_maquina} `
                           cell2.innerHTML= resposta.nome_maquina
                           cell3.innerHTML = status == 'critical' ? `<i class='bx bxs-circle error'></i>` : `<i class='bx bxs-circle maintenance'></i>`
                           cell4.innerHTML = resposta.nome_estacao
                           row.style.cursor = `pointer`
                           row.addEventListener("click",function(){
                                 openDashboard(resposta.id_maquina)
                           })
                           if(status == 'critical'){
                            critical ++
                            }
                            else if(status == 'alert'){
                                alert++
                            }
                            



                      }
                      getFirstInfo()
                      
                    //   if(window.location.pathname == `/pages/dashboard.html`){
                          
                    //     getFirstInfo()
                    //   }

                     
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

