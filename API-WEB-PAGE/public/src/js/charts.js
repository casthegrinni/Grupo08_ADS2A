var ctx = document.getElementById('myChart').getContext('2d');
var hardwareData = {
    labels: ['RAM', 'CPU', 'Disco'],
    datasets: [{
        data: [8, 10, 5],
        backgroundColor: [
            'rgba(15,125,146, 1)',
            'rgba(255, 0, 67, 1)',
            'rgba(15,125,146, 1)',
        ],
        borderColor: [
            'rgba(24,179,194, 1)',
            'rgba(255, 0, 67, 1)',
            'rgba(24,179,194, 1)',
        ],
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
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                },
            }],
        }
    }
}
var myChart = new Chart(ctx, config);

var ctx = document.getElementById('chartMaquinas').getContext('2d');
var paperData = {
    labels: ['00/04', '4/08', '08/12', '12/16', '16/20', '20/24'],
    datasets: [{
        label: "nº de ocorrências",
        data: [3, 15, 5, 8, 14, 6],
        backgroundColor: [
            'rgba(15,125,146, 1)',
            'rgba(255, 0, 67, 1)',
            'rgba(15,125,146, 1)',
            'rgba(15,125,146, 1)',
            'rgba(15,125,146, 1)',
            'rgba(15,125,146, 1)'
        ],
        borderColor: [
            'rgba(24,179,194, 1)',
            'rgba(255, 0, 67, 1)',
            'rgba(24,179,194, 1)',
            'rgba(24,179,194, 1)',
            'rgba(24,179,194, 1)', ,
            'rgba(24,179,194, 1)'
        ],
        borderWidth: 1
    }]
}

var config = {
    type: 'bar',
    data: paperData,
    options: {
        title: {
            text: "Sem papel x hora",
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
