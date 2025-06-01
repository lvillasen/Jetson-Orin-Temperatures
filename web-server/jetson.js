var ms_start;
var ms_final;

// Fecha actual
const today = new Date();

// Obtener componentes de la fecha en UTC
const year = today.getUTCFullYear();
const month = String(today.getUTCMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
const day = String(today.getUTCDate()).padStart(2, "0");
const hours = String(today.getUTCHours()).padStart(2, "0");
const minutes = String(today.getUTCMinutes()).padStart(2, "0");
const seconds = String(today.getUTCSeconds()).padStart(2, "0");

// Formatear la fecha en UTC (YYYY-MM-DD HH:MM:SS)
const utcDate = DateToUTC(today);

console.log("Fecha actual en UTC:", utcDate);

// Fecha de hace 30 días
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(today.getDate() - 30);
const utcDate30DaysAgo = DateToUTC(thirtyDaysAgo);
console.log("Fecha 30 days ago en UTC:", utcDate30DaysAgo);

// Establecer valores iniciales en los inputs
document.getElementById("start_date").value = utcDate30DaysAgo;
document.getElementById("final_date").value = utcDate;

window.onorientationchange = function () {
  var orientation = window.orientation;
  switch (orientation) {
    case 0:
    case 90:
    case -90:
      window.location.reload();
      break;
  }
};
var dateTime = [];
var v1 = [];
var v2 = [];
var v3 = [];
var v4 = [];
var v5 = [];
var v6 = [];
var v7 = [];
var v8 = [];
var dateTime_rec = [];
function fetchData() {
 dateTime = [];
 v1 = [];
 v2 = [];
 v3 = [];
 v4 = [];
 v5 = [];
 v6 = [];
 v7 = [];
 v8 = [];
 dateTime_rec = [];


	console.log("...........Fetching data...");
  var startDate = document.getElementById("start_date").value;
  var endDate = document.getElementById("final_date").value;
console.log(startDate+ " "+endDate);
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "fetch_mySQL.php?start_date=" + startDate + "&end_date=" + endDate,
    true
  );
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);

      for (var i in data) {
        dateTime.push(data[i].date_time);
        v1.push(data[i].CPU);
        v2.push(data[i].Tboard);
        v3.push(data[i].SOC2);
        v4.push(data[i].Tdiode);
        v5.push(data[i].SOC0);
        v6.push(data[i].GPU);
        v7.push(data[i].tj);
        v8.push(data[i].SOC1);
        dateTime_rec.push(data[i].date_time_rec);
      }


      plotData();
    }
  };
  xhr.send();
}
fetchData();
function plotData() {
  var dataV1 = {
    x: dateTime,
    y: v1,
    name: "CPU",
    type: "scatter",
    mode: "lines+markers",
  };
  var dataV2 = {
    x: dateTime,
    y: v2,
    name: "Tboard",
    type: "scatter",
    mode: "lines+markers",
  };
  var dataV3 = {
    x: dateTime,
    y: v3,
    name: "SOC2",
    type: "scatter",
    mode: "lines+markers",
  };
  var dataV4 = {
    x: dateTime,
    y: v4,
    name: "Tdiode",
    type: "scatter",
    mode: "lines+markers",
  };
  var dataV5 = {
    x: dateTime,
    y: v5,
    name: "SOC0",
    type: "scatter",
    mode: "lines+markers",
  };
  var dataV6 = {
    x: dateTime,
    y: v6,
    name: "GPU",
    type: "scatter",
    mode: "lines+markers",
  };
  var dataV7 = {
    x: dateTime,
    y: v7,
    name: "tj",
    type: "scatter",
    mode: "lines+markers",
  };
  var dataV8 = {
    x: dateTime,
    y: v8,
    name: "SOC1",
    type: "scatter",
    mode: "lines+markers",
  };

  var layout = {
    xaxis: {
      //   range: [0, N],
      title: "Time",
    },
    yaxis: {
      //    range: [-1, 1],
      title: "Temperature (°C)",
    },
    title: {
      text: "Temperatures",
      font: {
        family: "Times New Roman",
        size: 24,
      },
    },
  };
  Plotly.newPlot("plot_1", [dataV1,dataV2,dataV3,dataV4,dataV5,dataV6,dataV7,dataV8], layout);
  
}





function DateToUTC(date) {
  // Obtener componentes de la fecha en UTC
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  // Formatear la fecha en UTC (YYYY-MM-DD HH:MM:SS)
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
function updateDate(){
document.getElementById("start_date").value = document.getElementById("fecha_inicial").value;
document.getElementById("final_date").value = document.getElementById("fecha_final").value;
}
