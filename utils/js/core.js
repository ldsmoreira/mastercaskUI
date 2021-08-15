var dataObjs, chartFlag;

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

function temperatureColorSelector(value){
  if(value <60){
    return "";
  }else if(value <120){
    return "yellow";
  }else{
    return "red";
  }
}

function compareTemperature(a, b)
{   
  // console.log(a.variable.temperature);
  // console.log(b.variable.temperature);
  if (a.variable.temperature > b.variable.temperature)
  return -1;
  if (a.variable.temperature < b.variable.temperature)
  return 1;
  return 0;
}


var miniCaskColors = {
  normal : "rgb(185, 185, 185)",
  semiNormal : "rgb(181, 181, 114)",
  anormal : "rgb(232, 240, 109)",
  critical : "rgb(250, 74, 74)",
  superCritical : "rgb(255, 0, 0)",
};

var boxArray = document.getElementsByClassName("box");
document.body.addEventListener('dblclick', function (event) {
  let root = document.querySelector(':root');
  for(element of boxArray) {
    if (element.contains(event.target)) {
      // console.log(element);
      document.getElementsByClassName("graphs")[0].style.width = "48vw";
      document.getElementsByClassName("graphs")[0].style.display = "block";
      document.getElementsByClassName("right")[0].style.display = "none";
      document.getElementsByClassName("left")[0].style.display = "block";
      
      console.log(element.id);
      for (dataObj of dataObjs){
        if (dataObj.id == element.id){
          root.style.setProperty("--cask-color", dataObj.cask.color);
          root.style.setProperty("--canister-color", dataObj.canister.color);
          chartFlag = dataObj.id;
          // root.style.setProperty("--tampa-color", dataObj.tampa.color);
        }
      }
    }}},true);
    
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
      var t0 = performance.now()
      let alertDiv = document.getElementsByClassName("alert-div")[0];
      let alertArray = [];
      let plantDiv = document.getElementsByClassName("plant-div");
      dataObjs = data;
      dataCarrier = data;
      data.sort(compareTemperature);

      let paras = document.getElementsByClassName('right-alert-box');
      // if(paras.length != 0){
        
      //   while(paras[0]){
      //       paras[0].parentNode.removeChild(paras[0]);
      //     }​

      // }

      document.querySelectorAll('.right-alert-box').forEach(e => e.remove());

    //   for(let o = 0; o == 3; o++){
    //   for(let alert12 of document.getElementsByClassName("right-alert-box")){
    //     alert12.parentNode.removeChild(alert12);
    //     console.log(alert12)
    //   };
    // }
      

  for(let i = 0; i < data.length; i++) {

  // boxArray = document.getElementsByClassName("box");
  boxArray[i].id = data[i].id
  boxArray[i].getElementsByClassName("tag-value")[0].innerHTML = data[i].id;
  boxArray[i].getElementsByClassName("temperature-value")[0].innerHTML = data[i].variable.temperature;
  boxArray[i].getElementsByClassName("humidity-value")[0].innerHTML = data[i].variable.humidity;
  boxArray[i].getElementsByClassName("radiation-value")[0].innerHTML = data[i].variable.radiation;
  
  
  if(chartsData[data[i].id].temperature.length < 25){
    
    chartsData[data[i].id].temperature.push(data[i].variable.temperature)
    chartsData[data[i].id].humidity.push(data[i].variable.humidity)
    chartsData[data[i].id].radiation.push(data[i].variable.radiation)
  }else{
    
    chartsData[data[i].id].temperature.push(data[i].variable.temperature)
    chartsData[data[i].id].temperature.shift()
    chartsData[data[i].id].humidity.push(data[i].variable.humidity)
    chartsData[data[i].id].humidity.shift()
    chartsData[data[i].id].radiation.push(data[i].variable.radiation)
    chartsData[data[i].id].radiation.shift()
  }

  dataObjs[i].cask.color =  temperatureColorSelector(data[i].cask.temperature);
  dataObjs[i].canister.color =  temperatureColorSelector(data[i].canister.temperature);
  dataObjs[i].fuel.color =  temperatureColorSelector(data[i].fuel.temperature);
  
  boxArray[i].getElementsByClassName("cask-mini")[0].style.stroke = temperatureColorSelector(data[i].cask.temperature);
  boxArray[i].getElementsByClassName("canister-mini")[0].style.stroke = temperatureColorSelector(data[i].canister.temperature);
  boxArray[i].getElementsByClassName("fuel-mini")[0].style.fill = temperatureColorSelector(data[i].fuel.temperature);
  
  
  
  if (dataObjs[i].variable.temperature > 200){
    // console.log(plantDiv);
    
    var alarmTemperature = dataObjs[i].variable.temperature
    
    var node = document.createElement("DIV");
    node.classList.add("right-alert-box");
    if(alarmTemperature < 300){
      node.style.background = "yellow";
      plantDiv[0].getElementsByClassName(`plant-cask-${dataObjs[i].id}`)[0].style.fill = "yellow";
      plantDiv[0].getElementsByClassName(`plant-cask-${dataObjs[i].id}`)[0].style.stroke = "yellow";
    }else if(alarmTemperature >= 300){
      node.style.background = "red";
      plantDiv[0].getElementsByClassName(`plant-cask-${dataObjs[i].id}`)[0].style.fill = "red";
      plantDiv[0].getElementsByClassName(`plant-cask-${dataObjs[i].id}`)[0].style.stroke = "red";
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
    
    codeTitle.innerHTML = dataObjs[i].id
    alertText.innerHTML = "Temperatura do sistema a cima do limite";
    code.appendChild(codeTitle)
    alert.appendChild(alertText)
    node.appendChild(code)
    node.appendChild(alert)
    // console.log(alertDiv.contains(node));
    // let alert = document.createElement("DIV");
    if(!alertArray.some( alert => alert.id === dataObjs[i].id)){
      alertArray.push(new alertsObj(dataObjs[i].id, "Temperatura do sistema a cima do limite"));
      alertDiv.appendChild(node);
    }
  };
  if(dataObjs[i].variable.temperature <= 200){
    plantDiv[0].getElementsByClassName(`plant-cask-${dataObjs[i].id}`)[0].style.fill = "black";
    plantDiv[0].getElementsByClassName(`plant-cask-${dataObjs[i].id}`)[0].style.stroke = "black";
};
}

console.log("Hello World")
var t1 = performance.now()
console.log(t1 - t0);
});


setInterval(()=>{
  window.api.send("toMain", "some data");

}, 10000)
