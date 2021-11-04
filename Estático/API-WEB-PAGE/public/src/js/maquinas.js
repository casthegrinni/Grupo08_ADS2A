function getMachines(){
      const fk_estacao = sessionStorage.fk_estacao
      fetch(`../leituras/machines/${fk_estacao}`, {
            method: "GET",
        }).then(resposta => {
            if (resposta.ok) {
              resposta.json().then(function (json){
                    
                   for (let i = 0; i < json.length; i++) {
                            const resposta = json[i];
                           let row =  rows_table.insertRow(i)
                           var cell1 = row.insertCell(0)
                           var cell2 = row.insertCell(1)
                           var cell3 = row.insertCell(2)
                           var cell4 = row.insertCell(3)
                           
                           
                           cell1.innerHTML = `${resposta.id_maquina} `
                           cell2.innerHTML= resposta.nome_maquina
                           cell3.innerHTML = `<i class='bx bxs-circle error'></i>`
                           cell4.innerHTML = resposta.nome_estacao
                           row.style.cursor = `pointer`
                           row.addEventListener("click",function(){
                                 openDashboard(resposta.id_maquina)
                           })


                      }

    
                });
    
            } else {
    
                console.log('aaaaaaa!');
    
                resposta.text().then(texto => {
                    console.error(texto);
                    finalizar_aguardar(texto);
                });
            }
        });
    
        return false;
}
function openDashboard(id_maquina){
      sessionStorage.id_maquina = id_maquina
      window.location.href = `graficos.html`

}
function getFirstInfo(){
    
}

