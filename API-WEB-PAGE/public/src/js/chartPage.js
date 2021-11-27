var ctx = document.getElementById('cpuChart').getContext('2d');
var cpuData = {
    labels: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45'],
    datasets: [{
        data: [69, 30, 80, 70, 75, 85, 60, 50, 30, 89],
        backgroundColor: getColor([69, 30, 80, 70, 75, 85, 60, 50, 30, 89]),
        borderColor: 'rgba(15,125,146, 1)',
        borderWidth: 1,
        fill: false,
        tension: 0.1
    }]
}

var config = {
    type: 'line',
    data: cpuData,
    options: {
        title: {
            text: "Uso de CPU (%)",
            display: true,
            fontSize: 22,
        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
                }
            }],
        }
    }
}

var myChart = new Chart(ctx, config);

// DISK CHART

var ctx = document.getElementById('diskChart').getContext('2d');
var diskData = {
    labels: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45'],
    datasets: [{
        data: [10, 10, 11, 12, 12, 12, 12, 12, 12, 14],
        backgroundColor: getColor([69, 30, 80, 70, 75, 85, 60, 50, 30, 89]),
        borderColor: 'rgba(15,125,146, 1)',
        borderWidth: 1,
        fill: false,
        tension: 0.1
    }]
}

var config = {
    type: 'line',
    data: diskData,
    options: {
        title: {
            text: "Uso de disco (%)",
            display: true,
            fontSize: 22,
        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
                }
            }],
        }
    }
}

var myChart = new Chart(ctx, config);

// RAM CHART

var ctx = document.getElementById('ramChart').getContext('2d');
var ramData = {
    labels: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45'],
    datasets: [{
        data: [20, 25, 20, 60, 30, 40, 25, 70, 78, 89],
        backgroundColor: getColor([69, 30, 80, 70, 75, 85, 60, 50, 30, 89]),
        borderColor: 'rgba(15,125,146, 1)',
        borderWidth: 1,
        fill: false,
        tension: 0.1
    }]
}

var config = {
    type: 'line',
    data: ramData,
    options: {
        title: {
            text: "Uso de RAM (%)",
            display: true,
            fontSize: 22,
        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
                }
            }],
        }
    }
}

var myChart = new Chart(ctx, config);

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


function getPaperData() {
    fetch(`/leituras/getPaperPerHour/${sessionStorage.id_maquina}`, {
        cache: 'no-store'
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log(`Paper data: ${JSON.stringify(resposta)}`);
                console.log(resposta);
                console.log(resposta.length);
                parsePaperData(resposta)
            }
            )
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

    console.log("Return paper array: " + returnArray)

    chartPaper(returnArray)
}



function chartPaper(paperData) {
    var ctx = document.getElementById('paperChart').getContext('2d');
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


