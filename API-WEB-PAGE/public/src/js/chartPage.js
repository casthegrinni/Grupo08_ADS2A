var ctx = document.getElementById('cpuChart').getContext('2d');
var cpuData = {
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
    data: cpuData,
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

// DISK CHART

var ctx = document.getElementById('diskChart').getContext('2d');
var diskData = {
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
    data: diskData,
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

// RAM CHART

var ctx = document.getElementById('ramChart').getContext('2d');
var ramData = {
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
    data: ramData,
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

// PAPER CHART

var ctx = document.getElementById('paperChart').getContext('2d');
var paperData = {
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
    data: paperData,
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