

function getMachines(tipoUsario, required) {
 let array_checadas = []
 getStationName(tipoUsario,required)
 let fk_estacao
if (required  == "true" || parseInt(tipoUsario) != 1) {
    fk_estacao = sessionStorage.fk_estacao
}
else{ 
    fk_estacao = 0
}
    fetch(`../leituras/machines/${fk_estacao}`, {
        method: "GET",
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(function(json) {
                for (let i = 0; i < json.length; i++) {
                    var resp = json[i]
                    if (resp.checada == 0) {
                        array_checadas.push(resp.id_maquina)
                    } else {
                        fetch(`../leituras/info_machines/${resp.id_maquina}`, {
                            method: "GET",
                        }).then(resposta2 => {
                            if (resposta2.ok) {
                                resposta2.json().then(function(json2) {
                                    //continha de porcentagem basica familia, sem escandalo (emoji fazendo shiuuu)
                                    let porcentagem_memoria = (json2.uso_disco * 100) / json2.tamanho_disco;
                                    let porcentagem_ram = (json2.uso_ram * 100) / json2.ram
                                    if (document.documentElement.innerHTML.search(json2.nome_maquina) == -1) {
                                        table_row.innerHTML += `<div class="machine-card" onclick="openDashboard(${json2.id_maquina})">
                                <div class="card-title">
                                    <h1>${json2.nome_maquina}</h1>
                                    <h4>${sessionStorage.nome_estacao != "null"? sessionStorage.nome_estacao : "Aguarde"}</h4>
                                </div>
                                <br>
                                <div class="card-content">
                                    <span id='span_cpu'>CPU: ${Math.round(json2.uso_processador)}%</span>
                                    <span id='span_ram'>RAM: ${Math.round(porcentagem_ram)}% </span>                                 
                                   <span id='span_disco'>Disco: ${Math.round(porcentagem_memoria)}%</span>
                                    <span> Status: ${json2.status_web != null ? json2.status_web : " Indisponivel"}</span>
                                </div>
                            </div>`
                                            //sequencia de ternarios para verificar o que o usuario quer
                                        json2.want_ram == 0 ? span_ram.style.display = 'none' : span_ram.style.display = 'block'
                                        json2.want_cpu == 0 ? span_cpu.style.display = 'none' : span_ram.style.display = 'block'
                                        json2.want_disco == 0 ? span_disco.style.display = 'none' : span_ram.style.display = 'block'
                                        if (array_checadas.length > 0) {
                                            showAlertChecada(array_checadas)
                                        }
                                    } else {
                                        return
                                    }
                                })
                            }
                        })
                    }
                }
            });

        } else {
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    });
    return false;
}

function openDashboard(id_maquina) {
    sessionStorage.id_maquina = id_maquina
    window.location.href = `graficos.html`

    return false;
}

function showAlertChecada(array) {
    let text
    if (array.length == 1) {
        text = `Você possui uma máquina não checada. Por favor, execute o Pulsatrix-java na maquina com ID ${array[0]}`
    } else {
        let aux = '';
        let element;
        for (let i = 1; i < array.length; i++) {
            element = array[i];
            element != undefined ? aux += `\n ${element}` : aux = ``  
        }
        text = `Você possui ${array.length} máquinas não checadas. Por favor, execute o Pulsatrix-java nas seguintes máquinas(ID): ${aux}`

    }
 
    swal("ALERTA!", text, "warning");


}

function getStationName(tipo, required) {
    if(parseInt(tipo) == 1 && required == "false" ){
        h1_nome_estacao.innerHTML = "Visualizando todas as máquinas"
    } 
    else{
        h1_nome_estacao.innerHTML = "Máquinas em: " + sessionStorage.nome_estacao
    }

   
 fetch(`/leituras/getStation/${sessionStorage.fk_estacao}`, {
            cache: 'no-store'
        }).then(resposta => {
            if (resposta.ok) {
                resposta.json().then(function(resposta) {
                    console.log(`Nome da estacao: ${JSON.stringify(resposta)}`);
                    sessionStorage.nome_estacao = resposta["nome_estacao"]
                    
                })
            } else {
                console.log('Error getting station data!');
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        });
       

        if (tipo == 2) {
            btn_add.style.display = "none"
        }
    }
