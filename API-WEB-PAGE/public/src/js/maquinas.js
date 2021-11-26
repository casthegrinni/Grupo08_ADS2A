

function getMachines(){
  
    let array_checadas = []
    let_duplicada = []
      const fk_estacao = sessionStorage.fk_estacao
      fetch(`../leituras/machines/${fk_estacao}`, {
            method: "GET",
        }).then(resposta => {
            if (resposta.ok) {
              resposta.json().then(function (json){
               
                    
                   for (let i = 0; i < json.length; i++) {
                    
           var resp = json[i]
                  if(resp.checada == 0){
                   array_checadas.push(resp.id_maquina)
                }
                else{
                


          
                       fetch(`../leituras/info_machines/${resp.id_maquina}`,{
                           method: "GET",
                       }).then(resposta2 => {
                           if(resposta2.ok){
                               resposta2.json().then(function (json2){
                                
                              //continha de porcentagem basica familia, sem escandalo (emoji fazendo shiuuu)
                                   let porcentagem_memoria = (json2.uso_disco  * 100) / json2.tamanho_disco;
                                   let porcentagem_ram = (json2.uso_ram * 100)  / json2.ram
                                   if(document.documentElement.innerHTML.search(json2.nome_maquina) == -1){
                                   table_row.innerHTML +=`<div class="machine-card" onclick="openDashboard(${json2.id_maquina})">
                                <div class="card-title">
                                    <h1>${json2.nome_maquina}</h1>
                                    <h4>Consolação</h4>
                                </div>
                                <br>
                                <div class="card-content">
                                    <span id='span_cpu'>CPU: ${Math.round(json2.uso_processador)}%</span>
                                    <span id='span_ram'>RAM: ${Math.round(porcentagem_ram)}% </span>                                 
                                   <span id='span_disco'>Disco:M${Math.round(porcentagem_memoria)}%</span>
                                    <span> Status:${json2.status_web != null ? json2.status_web : "status indosponivel"}</span>
                                </div>
                            </div>`
                                   //sequencia de ternarios para verificar o que o usuario quer
                                   json2.want_ram == 0 ? span_ram.style.display = 'none' : span_ram.style.display = 'block' 
                                   json2.want_cpu == 0 ? span_cpu.style.display = 'none' : span_ram.style.display = 'block' 
                                   json2.want_disco == 0 ? span_disco.style.display = 'none' : span_ram.style.display = 'block' 
                                   if(array_checadas.length > 0){
                                    showAlertChecada(array_checadas)
                                    
                                }
                                   } else{
                                       return
                                    }
                })
                           }
                       })
                    }
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
       
        return false;
}
function openDashboard(id_maquina){
      sessionStorage.id_maquina = id_maquina
      window.location.href = `graficos.html`

}
function showAlertChecada(array){
    let text
    if(array.length == 1){
        text = `Você possui uma maquina não chechada, por favor, execute o pulsatrix-java na maquina com id ${array[0]}`
    }
    else{
        let aux
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            element !=undefined ? aux += `\n ${element}` : aux = `` }
        text = `você possui ${array.length} maquinas não checadas, por favor execute o pulsatrix-java nas seguintes maquinas(id): ${aux}` 
    }
    
alert(text)

}


