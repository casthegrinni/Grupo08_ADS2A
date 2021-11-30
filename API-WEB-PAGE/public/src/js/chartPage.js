var labelData = []

function getRamData() {
  fetch(`/leituras/getRamMachine/${sessionStorage.id_maquina}`, {
    cache: "no-store",
  }).then((resposta) => {
    if (resposta.ok) {
      resposta.json().then(function (resposta) {
        resposta.reverse()
        console.log(`RAM data: ${JSON.stringify(resposta)}`);
        console.log(resposta);
        console.log(resposta.length);
        parseRamData(resposta);
      });
    } else {
      console.log("Error getting RAM data!");
      resposta.text().then((texto) => {
        console.error(texto);
      });
    }
  });
}

function parseRamData(data) {
  let dataArray = [];
  let labelArray = [];

  for (let i = 0; i < data.length; i++) {
    dataArray.push(data[i]["porcentagem_ram"]);
    labelArray.push(data[i]["captura"]);
  }
  console.log("DATA:" + data);
  console.log(data.length);
  chartRam(dataArray, labelArray);
}

function chartRam(ramData, labelData) {
  var ctx = document.getElementById("ramChart").getContext("2d");
  var configData = {
    labels: labelData,
    datasets: [
      {
        data: ramData,
        backgroundColor: getColor([69, 30, 80, 70, 75, 85, 60, 50, 30, 89]),
        borderColor: "rgba(15,125,146, 1)",
        borderWidth: 1,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  var config = {
    type: "line",
    data: configData,
    options: {
      title: {
        text: "Uso de Ram (%)",
        display: true,
        fontSize: 22,
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontSize: 10
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: 0,
              max: 100,
            },
          },
        ],
      },
    },
  };
  var myChart = new Chart(ctx, config);
}

function getDiskData() {
  fetch(`/leituras/getDiskMachine/${sessionStorage.id_maquina}`, {
    cache: "no-store",
  }).then((resposta) => {
    if (resposta.ok) {
      resposta.json().then(function (resposta) {
        resposta.reverse()
        console.log(`Disk data: ${JSON.stringify(resposta)}`);
        console.log(resposta);
        console.log(resposta.length);
        parseDiskData(resposta);
      });
    } else {
      console.log("Error getting Disk data!");
      resposta.text().then((texto) => {
        console.error(texto);
      });
    }
  });
}

function parseDiskData(data) {
  let dataArray = [];
  let labelArray = [];

  for (let i = 0; i < data.length; i++) {
    dataArray.push(data[i]["porcentagem_memoria"]);
    labelArray.push(data[i]["captura"]);
  }
  console.log("DATA:" + data);
  console.log(data.length);
  chartDisk(dataArray, labelArray);
}

function chartDisk(diskData, labelData) {
  var ctx = document.getElementById("diskChart").getContext("2d");
  var configData = {
    labels: labelData,
    datasets: [
      {
        fontSize: "20px",
        data: diskData,
        backgroundColor: getColor([69, 30, 80, 70, 75, 85, 60, 50, 30, 89]),
        borderColor: "rgba(15,125,146, 1)",
        borderWidth: 1,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  var config = {
    type: "line",
    data: configData,
    options: {
      title: {
        text: "Uso de Disco (%)",
        display: true,
        fontSize: 22,
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: 0,
              max: 100,
            },
          },
        ],
      },
    },
  };
  var myChart = new Chart(ctx, config);
}


function getColor(data) {
  var colors = [];
  var maxValue = data[0];

  for (i = 0; i < data.length; i++) {
    if (data[i] > maxValue) {
      maxValue = data[i];
    }
  }

  for (index = 0; index < data.length; index++) {
    if (data[index] == maxValue) {
      colors.push("rgba(255, 0, 67, 1)"); // Red
    } else {
      colors.push("rgba(15,125,146, 1)"); // Blue
    }
  }

  return colors;
}

function getPaperData() {
  fetch(`/leituras/getPaperMachine/${sessionStorage.id_maquina}`, {
    cache: "no-store",
  }).then((resposta) => {
    if (resposta.ok) {
      resposta.json().then(function (resposta) {
        resposta.reverse()
        console.log(`Paper data: ${JSON.stringify(resposta)}`);
        console.log(resposta);
        console.log(resposta.length);
        parsePaperData(resposta);
      });
    } else {
      console.log("Error getting Paper data!");
      resposta.text().then((texto) => {
        console.error(texto);
      });
    }
  });
}

function parsePaperData(data) {
  let dataArray = [];
  let labelArray = []
  for (let i = 0; i < data.length; i++) {
    dataArray.push(data[i]["estoque_papel"]);
    labelArray.push(data[i]["captura"]);
  }
  console.log("DATA:" + data);
  console.log(data.length);
  chartPaper(dataArray, labelArray);
}

function chartPaper(paperData, labelData) {
  var ctx = document.getElementById("paperChart").getContext("2d");
  var configData = {
    labels: labelData,
    datasets: [
      {
        data: paperData,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: getColor(paperData),
        borderWidth: 1,
      },
    ],
  };

  var config = {
    type: "line",
    data: configData,
    options: {
      title: {
        text: "Alertas sem papel x tempo real",
        display: true,
        fontSize: 22,
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
          },
        ],
        yAxes: [
          {
            beginAtZero: true,
            ticks: {
              callback: function(value, index, values) {
                if (value == 1) {
                  return "Com papel"
                } else if (value == 0){
                  return "Sem papel"
                }
              },
             
            },
          },
        ],
      },
    },
  };

  var myChart = new Chart(ctx, config);
}

function getCpuData() {
  fetch(`/leituras/getCpuMachine/${sessionStorage.id_maquina}`, {
    cache: "no-store",
  }).then((resposta) => {
    if (resposta.ok) {
      resposta.json().then(function (resposta) {
        resposta.reverse()
        console.log(`Cpu data: ${JSON.stringify(resposta)}`);
        console.log(resposta);
        console.log(resposta.length);
        parseCpuData(resposta);
      });
    } else {
      console.log("Error getting CPU data!");
      resposta.text().then((texto) => {
        console.error(texto);
      });
    }
  });
}

function parseCpuData(data) {
  let dataArray = [];
  let labelArray = [];

  for (let i = 0; i < data.length; i++) {
    dataArray.push(data[i]["porcentagem_processador"]);
    labelArray.push(data[i].captura);
  }
  

  console.log("DATA:" + data);
  chartCpu(dataArray, labelArray);
}

function chartCpu(cpuData, labelData) {
  var ctx = document.getElementById("cpuChart").getContext("2d");
  var configData = {
    labels: labelData,
    datasets: [
      {
        data: cpuData,
        backgroundColor: getColor([69, 30, 80, 70, 75, 85, 60, 50, 30, 89]),
        borderColor: "rgba(15,125,146, 1)",
        borderWidth: 1,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  var config = {
    type: "line",
    data: configData,
    options: {
      title: {
        text: "Uso de CPU (%)",
        display: true,
        fontSize: 22,
      },
      legend: {
        display: false,
        labels: {
          font: {
            size: 5
          }
        }
          
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: 0,
              max: 100,
            },
          },
        ],
      },
    },
  };
  var myChart = new Chart(ctx, config);
}
function getMachineName(){
  fetch(`/leituras/getMachineName/${sessionStorage.id_maquina}`, {
    cache: "no-store",
  }).then((resposta) => {
    if (resposta.ok) {
      resposta.json().then(function (resposta) {
        console.log("Machine name: " + resposta[0].nome_maquina);
        console.log(resposta)
        h1_nome_Maquina.innerHTML = `Você está vendo a máquina: ${resposta[0].nome_maquina}`
      });
    } else {
      console.log("Error geting machine name");
      resposta.text().then((texto) => {
        console.error(texto);
      });
    }
  });
}



