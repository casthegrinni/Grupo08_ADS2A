

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
                                   table_row.innerHTML +=``

                               })
                           }
                       })
                       
                            



                      }
                      
                  

                     
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




