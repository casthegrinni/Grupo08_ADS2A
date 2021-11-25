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
        )}
        else {
            console.log('erro ao capturar os dados!');
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
});

var ctx = document.getElementById('myChart').getContext('2d');
var hardwareData = {
    labels: ['00h-04h', '04h-08h', '08h-12h', '12h-16h', '16h-20h', '20h-24h'],
    datasets: [{
        data: [3, 13, 8, 5, 17, 6],
        backgroundColor: getColor([3, 13, 8, 5, 17, 6]),
        borderColor: getColor([3, 13, 8, 5, 17, 6]),
        borderWidth: 1
    }]
}

var config = {
    type: 'horizontalBar',
    data: hardwareData,
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

var ctx = document.getElementById('chartMaquinas').getContext('2d');
var paperData = {
    labels: ['00h-04h', '04h-08h', '08h-12h', '12h-16h', '16h-20h', '20h-24h'],
    datasets: [{
        data: [3, 15, 5, 8, 14, 6],
        backgroundColor: getColor([3, 15, 5, 8, 14, 6]),
        borderColor: getColor([3, 15, 5, 8, 14, 6]),
        borderWidth: 1
    }]
}

var config = {
    type: 'bar',
    data: paperData,
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
}

