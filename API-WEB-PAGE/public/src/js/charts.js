var ctx = document.getElementById('myChart').getContext('2d');
var hardwareData = {
    labels: ['RAM', 'CPU', 'Disco'],
    datasets: [{
        data: [8, 10, 5],
        backgroundColor: getColor([8, 10, 5]),
        borderColor: getColor([8, 10, 5]),
        borderWidth: 1
    }]
}

var config = {
    type: 'horizontalBar',
    data: hardwareData,
    options: {
        title: {
            text: "Registros de alerta",
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
    labels: ['00/04', '4/08', '08/12', '12/16', '16/20', '20/24'],
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
        tooltips: {
            enabled: false
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

