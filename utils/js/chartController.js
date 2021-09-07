var options = {
  chart: {
    type: 'area',
    width: '100%',
    height: '100%',
    animations: {
      enabled: false,
    }
  },
  stroke: {
    show: true,
    lineCap: 'butt',
    colors: undefined,
    width: 2,
    dashArray: 0,      
},
title: {
  text: 'Temperatura no Nucleo',
  align: 'left'
},
  series: [{
    name: 'point',
    data: []
  }],
  xaxis: {
    type: "category",
    tickAmount: 6,
  },
  dataLabels: {
    enabled: false,
  }
}

var chart1 = new ApexCharts(document.querySelector("#CD01-temperature"), options);

options.title.text = "Radiacao externa ao Cask";
var chart2 = new ApexCharts(document.querySelector("#CD01-radiation"), options);

options.title.text = "Umidade no Canister";
var chart3 = new ApexCharts(document.querySelector("#CD01-humidity"), options);

chart1.render();
chart3.render();
chart2.render();

window.setInterval(function () {
let generalViewTitle = document.getElementById("vista-geral");
let root2 = document.querySelector(':root');
let obj_to_plot;

for(let dataObj of dataObjs){
  if(dataObj.id == chartFlag){
    obj_to_plot = dataObj
  }
}

document.getElementsByClassName("cask-card")[0].querySelector("h2").innerHTML = `${obj_to_plot.cask.temperature} °C`;
document.getElementsByClassName("canister-card")[0].querySelector("h2").innerHTML = `${obj_to_plot.canister.temperature} °C`;

root2.style.setProperty("--cask-color", obj_to_plot.cask.color);
root2.style.setProperty("--canister-color", obj_to_plot.canister.color);
chartFlag = obj_to_plot.id;
generalViewTitle.innerHTML = `Vista geral do ${obj_to_plot.id}`
    // root.style.setProperty("--tampa-color", dataObj.tampa.color);

chart1.updateSeries([{
  data: chartsData[chartFlag].temperature
}])
chart2.updateSeries([{
  data: chartsData[chartFlag].humidity
}])
chart3.updateSeries([{
  data: chartsData[chartFlag].radiation
}])
}, 1000)