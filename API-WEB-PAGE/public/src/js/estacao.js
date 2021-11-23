
function getStationInfo(){
    fetch(`/leituras/getAllStations/`)
    .then(resposta => {
        
        if (resposta.ok) {
            resposta.json().then(function (json){
            
                for (let i = 0; i < json.length; i++) {
                    const element = json[i];
                    if(document.documentElement.innerHTML.search(element.nome_estacao) == -1){
                    table.innerHTML += `<div class="station-card" onclick = "openDashboard("${element.nome_estacao}")" style= "cursor: pointer;">
                    <div class="card-title">
                        <h1>${element.nome_estacao}</h1>
                    </div>
                    <br>
                    <div class="card-content">
                        <span>Máquinas:${element.qtdMaquina}</span>
                        <span>Alertas: ${element.contagem_maquinas_criticas}</span>
                    </div>
                </div>`
                    
                }
                else{return}
            }
                
       

            })
           
        } else {
            resposta.text().then(texto => {
                console.error(texto);
                finalizar_aguardar(texto);
            });
        } 
    });    
    
}
