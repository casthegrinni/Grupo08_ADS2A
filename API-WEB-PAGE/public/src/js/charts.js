function getDadosMachine() {
    fetch(`/leituras/getDadosMachine/${sessionStorage.id_maquina}`, {
        cache: 'no-store'
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                // resposta.reverse();
                console.log(resposta);
                console.log("lua");
                console.log(resposta.length);
                console.log("a");
            }
            )
        }
        else {
            console.log('erro ao capturar os dados!');
            resposta.text().then(texto => {

            });
        }
    });
}

function getColor(data) {
    var colors = [];
    var maxValue = data[0];

    for (i = 0; i < data.length; i++) {
        if (data[i] > maxValue) {
            maxValue = data[i]
        }
    }

    for (index = 0; index < data.length; index++) {
        if (data[index] == maxValue) {
            colors.push('rgba(255, 0, 67, 1)') // Red
        } else {
            colors.push('rgba(15,125,146, 1)') // Blue
        }
    }

    return colors;

}

function getHardwareData() {
    fetch(`/leituras/getHardwarePerHour/${sessionStorage.id_maquina}`, {
        cache: 'no-store'
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                parseHardwareData(resposta[0])
            }
            )
        }
        else {
            console.log('Error getting hardware data!');
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    });

}

function parseHardwareData(data) {
    let returnArray = [];

    returnArray.push(data["zero_a_quatro"])
    returnArray.push(data["quatro_a_oito"])
    returnArray.push(data["oito_a_doze"])
    returnArray.push(data["doze_a_dezesseis"])
    returnArray.push(data["dezesseis_a_vinte"])
    returnArray.push(data["vinte_a_vintequatro"])

    chartHardware(returnArray)
}


function chartHardware(hardwareData) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var configData = {
        labels: ['00h-04h', '04h-08h', '08h-12h', '12h-16h', '16h-20h', '20h-24h'],
        datasets: [{
            data: hardwareData,
            backgroundColor: getColor(hardwareData),
            borderColor: getColor(hardwareData),
            borderWidth: 1
        }]
    }

    var config = {
        type: 'horizontalBar',
        data: configData,
        options: {
            title: {
                text: "Alertas de hardware x hora",
                display: true,
                fontSize: 22,
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
            }
        }
    }
    var myChart = new Chart(ctx, config);

}


function getPaperData() {
    fetch(`/leituras/getPaperPerHour/${sessionStorage.id_maquina}`, {
        cache: 'no-store'
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                parsePaperData(resposta)
            })
        }
        else {
            console.log('Error getting Paper data!');
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    });

}

function parsePaperData(data) {
    let returnArray = [];

    returnArray.push(data["zero_a_quatro"])
    returnArray.push(data["quatro_a_oito"])
    returnArray.push(data["oito_a_doze"])
    returnArray.push(data["doze_a_dezesseis"])
    returnArray.push(data["dezesseis_a_vinte"])
    returnArray.push(data["vinte_a_vintequatro"])

    chartPaper(returnArray)
}

function chartPaper(paperData) {
    var ctx = document.getElementById('chartMaquinas').getContext('2d');
    var configData = {
        labels: ['00h-04h', '04h-08h', '08h-12h', '12h-16h', '16h-20h', '20h-24h'],
        datasets: [{
            data: paperData,
            backgroundColor: getColor(paperData),
            borderColor: getColor(paperData),
            borderWidth: 1
        }]
    }

    var config = {
        type: 'bar',
        data: configData,
        options: {
            title: {
                text: "Alertas sem papel x hora",
                display: true,
                fontSize: 22
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                    beginAtZero: true
                }],
            }
        }
    }

    var myChart = new Chart(ctx, config);
}


