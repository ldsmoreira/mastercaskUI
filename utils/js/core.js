var dataObjs, chartFlag, detailUpdateObj;

var maxVal = {
  "variable" : {
    "temperature": 300,
  },
  "fuel":{
    "temperature":570,
  },
  "cask":{
    "temperature":103,
    "radiation" : 0.063,
  },
  "canister":{
    "temperature":427,
    "humidity" : 50,
  }
}

var chartsData = {
  "CD01":{
    "temperature":[],
    "humidity":[],
    "radiation":[]
  },
  "CD02":{
    "temperature":[],
    "humidity":[],
    "radiation":[]
  },
  "CD03":{
    "temperature":[],
    "humidity":[],
    "radiation":[]
  },
  "CD04":{
    "temperature":[],
    "humidity":[],
    "radiation":[]
  },
  "CD05":{
    "temperature":[],
    "humidity":[],
    "radiation":[]
  },
  "CD06":{
    "temperature":[],
    "humidity":[],
    "radiation":[]
  },
  "CD07":{
    "temperature":[],
    "humidity":[],
    "radiation":[]
  },
  "CD08":{
    "temperature":[],
    "humidity":[],
    "radiation":[]
  },
  "CD09":{
    "temperature":[],
    "humidity":[],
    "radiation":[]
  }
}

class alertsObj {
  constructor(id, alertString) {
    this.id = id;
    this.alertString = alertString;
  }
}

function temperatureColorSelector(value, comparator){
  if(value < 0.7*comparator){
    return "";
  }else if(value < comparator){
    return "yellow";
  }else{
    return "red";
  }
}

function compareTemperature(a, b)
{
  if (a.fuel.temperature > b.fuel.temperature)
  return -1;
  if (a.fuel.temperature < b.fuel.temperature)
  return 1;
  return 0;
}


function alertNodeGenerator(value, maxValue, alarmMessage, dataObj, kind){
    let colorHighPriority;
    let colorLowPriority;

    if(kind == "humidity"){
      colorHighPriority = "rgba(0, 41, 249, 0.72)";
      colorLowPriority = "rgba(0, 41, 249, 0.72)";
    }
    else{
      colorHighPriority = "rgba(255, 20, 20, 0.71)";
      colorLowPriority = "rgba(255, 255, 50, 0.71)";
    }

    let priority = null;
    let plantDiv = document.getElementsByClassName("plant-div");
    let node = document.createElement("DIV");
    node.classList.add("right-alert-box");

    if(value < 0.7*maxValue){
      return {"null":null, "priority":0}
    }else if(value >= maxValue){
      node.style.background = colorHighPriority;
      plantDiv[0].getElementsByClassName(`plant-cask-${dataObj.id}`)[0].style.fill = colorHighPriority;
      plantDiv[0].getElementsByClassName(`plant-cask-${dataObj.id}`)[0].style.stroke = colorHighPriority;
      priority = 2
    }else if(value >= 0.7*maxValue){
      node.style.background = colorLowPriority;
      plantDiv[0].getElementsByClassName(`plant-cask-${dataObj.id}`)[0].style.fill = colorLowPriority;
      plantDiv[0].getElementsByClassName(`plant-cask-${dataObj.id}`)[0].style.stroke = colorLowPriority;
      priority = 1
    }

    if(kind == "humidity"){
      priority = 0;
    }

    let code = document.createElement("DIV");
    code.classList.add("code");
    
    let alert = document.createElement("DIV");
    alert.classList.add("alert");
    
    let codeTitle = document.createElement("H2");
    codeTitle.classList.add("code-title");
    
    let alertText = document.createElement("P");
    alertText.classList.add("alert-text");
    
    alert.appendChild(alertText);
    
    codeTitle.innerHTML = dataObj.id
    alertText.innerHTML = `${alarmMessage}:${value}`;
    code.appendChild(codeTitle)
    alert.appendChild(alertText)
    node.appendChild(code)
    node.appendChild(alert)

    return {"node":node, "priority":priority}
}

var boxArray = document.getElementsByClassName("box");
document.body.addEventListener('dblclick', (function (event) {
  
  let root = document.querySelector(':root');
  for(element of boxArray) {
    if (element.contains(event.target)) {
      // console.log(element);
      document.getElementsByClassName("graphs")[0].style.width = "48vw";
      document.getElementsByClassName("graphs")[0].style.display = "block";
      document.getElementsByClassName("right")[0].style.display = "none";
      document.getElementsByClassName("left")[0].style.display = "block";
      
      for (dataObj of dataObjs){
        if (dataObj.id == element.id){
          chartFlag = dataObj.id;
        }
      }
    }}}),true);
    
    var rightTopTitle = document.getElementsByClassName("title")[0];
    rightTopTitle.addEventListener('click', function (event) {
      // console.log(event.target.tagName);
      if(event.target.tagName != "H3"){
        
        // console.log(event.target);
        document.getElementsByClassName("graphs")[0].style.width = "96vw";
        document.getElementsByClassName("graphs")[0].style.display = "none";
        document.getElementsByClassName("right")[0].style.display = "block";
        document.getElementsByClassName("left")[0].style.display = "none";
      }
    }, false);
    
window.api.receive("fromMain", (data) => {
      let alarmArray = []
      var t0 = performance.now()
      let alertDiv = document.getElementsByClassName("alert-div")[0];
      let alertArray = [];
      let plantDiv = document.getElementsByClassName("plant-div");
      dataObjs = data;
      dataCarrier = data;
      data.sort(compareTemperature);
      
      let paras = document.getElementsByClassName('right-alert-box');
      
      document.querySelectorAll('.right-alert-box').forEach(e => e.remove());
      
      
  for(let i = 0; i < data.length; i++) {

    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        
    // boxArray = document.getElementsByClassName("box");
    boxArray[i].id = data[i].id
    boxArray[i].getElementsByClassName("tag-value")[0].innerHTML = data[i].id;
    boxArray[i].getElementsByClassName("temperature-value")[0].innerHTML = data[i].fuel.temperature;
    boxArray[i].getElementsByClassName("humidity-value")[0].innerHTML = data[i].canister.humidity;
    boxArray[i].getElementsByClassName("radiation-value")[0].innerHTML = data[i].cask.radiation;
    
    
    if(chartsData[data[i].id].temperature.length < 100){
      
      chartsData[data[i].id].temperature.push({x: time, y:data[i].fuel.temperature})
      chartsData[data[i].id].humidity.push({x: time, y:data[i].canister.humidity})
      chartsData[data[i].id].radiation.push({x: time, y:data[i].cask.radiation})
    }else{
    
      chartsData[data[i].id].temperature.push({x: time, y:data[i].fuel.temperature})
      chartsData[data[i].id].temperature.shift()
      chartsData[data[i].id].humidity.push({x: time, y:data[i].canister.humidity})
      chartsData[data[i].id].humidity.shift()
      chartsData[data[i].id].radiation.push({x: time, y:data[i].cask.radiation.toFixed(2)})
      chartsData[data[i].id].radiation.shift()
    }
  
  dataObjs[i].cask.color =  temperatureColorSelector(data[i].cask.temperature,
                                                     maxVal.cask.temperature);

  dataObjs[i].canister.color =  temperatureColorSelector(data[i].canister.temperature,
                                                         maxVal.canister.temperature);

  dataObjs[i].fuel.color =  temperatureColorSelector(data[i].fuel.temperature,
                                                     maxVal.fuel.temperature);
  
  boxArray[i].getElementsByClassName("cask-mini")[0].style.stroke = temperatureColorSelector(data[i].cask.temperature,
                                                                                             maxVal.cask.temperature);

  boxArray[i].getElementsByClassName("canister-mini")[0].style.stroke = temperatureColorSelector(data[i].canister.temperature,
                                                                                                 maxVal.canister.temperature);
                                                                                                 
  boxArray[i].getElementsByClassName("fuel-mini")[0].style.fill = temperatureColorSelector(data[i].fuel.temperature, maxVal.fuel.temperature);

  let temperatureAlarm = alertNodeGenerator(dataObjs[i].variable.temperature,
                                            maxVal.variable.temperature, 
                                            "Temperatura elevada", 
                                            dataObjs[i], 
                                            "temperature")
 
  let humidityAlarm = alertNodeGenerator(dataObjs[i].canister.humidity,
                                         maxVal.canister.humidity,
                                         "Umidade elevada",
                                         dataObjs[i],
                                         "humidity")
 
  let radiationAlarm = alertNodeGenerator(dataObjs[i].cask.radiation,
                                          maxVal.cask.radiation, 
                                          "Radiacao elevada", 
                                          dataObjs[i], 
                                          "radiation")
  
  let fuelTemperatureAlarm = alertNodeGenerator(dataObjs[i].fuel.temperature, 
                                                maxVal.fuel.temperature, 
                                                "Temperatura do nucleo elevada", 
                                                dataObjs[i], 
                                                "temperature")
                                                
  let caskTemperatureAlarm = alertNodeGenerator(dataObjs[i].cask.temperature, 
                                                maxVal.cask.temperature, 
                                                "Temperatura do cask elevada", 
                                                dataObjs[i], 
                                                "temperature")

  let canisterTemperatureAlarm = alertNodeGenerator(dataObjs[i].canister.temperature, 
                                                    maxVal.canister.temperature, 
                                                    "Temperatura do canister elevada", 
                                                    dataObjs[i], 
                                                    "temperature")

  alarmArray = alarmArray.concat([temperatureAlarm, 
                                  humidityAlarm, 
                                  radiationAlarm, 
                                  fuelTemperatureAlarm, 
                                  caskTemperatureAlarm, 
                                  canisterTemperatureAlarm])


  canTurnOffAlarm = dataObjs[i].variable.temperature < 0.7*maxVal.variable.temperature &&
                    dataObjs[i].canister.humidity < 0.7*maxVal.canister.humidity &&
                    dataObjs[i].cask.radiation  < 0.7*maxVal.cask.radiation &&
                    dataObjs[i].fuel.temperature < 0.7*maxVal.fuel.temperature &&
                    dataObjs[i].cask.temperature < 0.7*maxVal.cask.temperature &&
                    dataObjs[i].canister.temperature < 0.7*maxVal.canister.temperature

  if(canTurnOffAlarm){
    plantDiv[0].getElementsByClassName(`plant-cask-${dataObjs[i].id}`)[0].style.fill = "black";
    plantDiv[0].getElementsByClassName(`plant-cask-${dataObjs[i].id}`)[0].style.stroke = "black";
};
}
alarmArray = alarmArray.sort((a,b) => (a.priority <= b.priority) ? 1 : ((a.priority > b.priority) ? -1 : 0))
// console.log(alarmArray)
for (let node of alarmArray){
  if(node.node){
    alertDiv.appendChild(node.node)
  }
}
});


// setInterval(()=>{
//   window.api.send("toMain", "some data");

// }, 10000)
