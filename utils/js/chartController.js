var options = {
  chart: {
    type: 'line',
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
  text: 'Temperatura',
  align: 'left'
},
  series: [{
    name: 'sales',
    data: [67,80,23,12,39,30,90,77,9]
  }],
  xaxis: {
    categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11,12]
  }
}

var chart1 = new ApexCharts(document.querySelector("#CD01-temperature"), options);


var options = {
  chart: {
    type: 'line',
    width: '100%',
    height: '100%',
    animations: {
      enabled: false,
    }
  },
  stroke: {
    show: true,
    // curve: 'smooth',
    lineCap: 'butt',
    colors: undefined,
    width: 2,
    dashArray: 0,      
},
title: {
  text: 'Umidade',
  align: 'left'
},
  series: [{
    name: 'sales',
    data: [67,80,23,12,39,30,90,77,9]
  }],
  xaxis: {
    categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
  }
}

var chart2 = new ApexCharts(document.querySelector("#CD01-radiation"), options);


var options = {
  chart: {
    type: 'line',
    width: '100%',
    height: '100%',
    animations: {
      enabled: false,
    }
  },
  stroke: {
    show: true,
    // curve: 'smooth',
    lineCap: 'butt',
    colors: undefined,
    width: 2,
    dashArray: 0,      
},
title: {
  text: 'Radiação',
  align: 'left'
},
  series: [{
    name: 'sales',
    data: [67,80,23,12,39,30,90,77,9]
  }],
  xaxis: {
    categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
  }
}

var chart3 = new ApexCharts(document.querySelector("#CD01-humidity"), options);

chart1.render();
chart3.render();
chart2.render();

window.setInterval(function () {
let obj_to_plot;

for(let dataObj of dataObjs){
  if(dataObj.id == chartFlag){
    obj_to_plot = dataObj
  }
}
console.log(obj_to_plot)
document.getElementsByClassName("cask-card")[0].querySelector("h2").innerHTML = `${obj_to_plot.cask.temperature} °C`;
document.getElementsByClassName("canister-card")[0].querySelector("h2").innerHTML = `${obj_to_plot.canister.temperature} °C`;


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