function getStationInfo(){
    fetch(`/leituras/getAllStations/`)
    .then(resposta => {
        
        if (resposta.ok) {
            resposta.json().then(function (json){
            
                sessionStorage.fk_estacao = json[0]
                
       

            })
           
        } else {
            resposta.text().then(texto => {
                console.error(texto);
                finalizar_aguardar(texto);
            });
        } 
    });    
    
}