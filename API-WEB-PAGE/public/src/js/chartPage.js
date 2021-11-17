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

// PAPER CHART

var ctx = document.getElementById('paperChart').getContext('2d');
var paperData = {
    labels: ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45'],
    datasets: [{
        data: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        backgroundColor: getColor([0, 0, 0, 0, 0, 0, 0, 1, 1, 1]),
        borderColor: getColor([0, 0, 0, 0, 0, 0, 0, 1, 1, 1])
    }]
}

var config = {
    type: 'bar',
    data: paperData,
    options: {
        title: {
            text: "Estoque de papel",
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
