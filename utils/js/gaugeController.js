var opts = {
  angle: -0.2, // The span of the gauge arc
  lineWidth: 0.2, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0, // // Relative to gauge radius
    strokeWidth: 0, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  colorStart: '#6FADCF',   // Colors
  colorStop: '#8FC0DA',    // just experiment with them
  strokeColor: '#E0E0E0',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  percentColors: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],
  
};
var target = document.getElementById('foo'); // your canvas element
var gauge1 = new Gauge(target).setOptions(opts); // create sexy gauge1!
gauge1.maxValue = 3000; // set max gauge1 value
gauge1.setMinValue(0);  // Prefer setter over gauge1.minValue = 0
gauge1.animationSpeed = 59; // set animation speed (32 is default value)
gauge1.set(2375); // set actual value






// var opts = {
//   angle: -0.5, // The span of the gauge arc
//   lineWidth: 0.1, // The line thickness
//   radiusScale: 1, // Relative radius
//   pointer: {
//     length: 0, // // Relative to gauge radius
//     strokeWidth: 0, // The thickness
//     color: '#000000' // Fill color
//   },
//   limitMax: false,     // If false, max value increases automatically if value > maxValue
//   limitMin: false,     // If true, the min value of the gauge will be fixed
//   colorStart: '#6FADCF',   // Colors
//   colorStop: '#8FC0DA',    // just experiment with them
//   strokeColor: '#E0E0E0',  // to see which ones work best for you
//   generateGradient: true,
//   highDpiSupport: true,     // High resolution support
//   percentColors: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],
  
// };
var target = document.getElementById('bar'); // your canvas element
var gauge2 = new Gauge(target).setOptions(opts); // create sexy gauge2!
gauge2.maxValue = 3000; // set max gauge2 value
gauge2.setMinValue(0);  // Prefer setter over gauge2.minValue = 0
gauge2.animationSpeed = 59; // set animation speed (32 is default value)
gauge2.set(2375); // set actual value





// var opts = {
//   angle: -0.5, // The span of the gauge arc
//   lineWidth: 0.1, // The line thickness
//   radiusScale: 1, // Relative radius
//   pointer: {
//     length: 0, // // Relative to gauge radius
//     strokeWidth: 0, // The thickness
//     color: '#000000' // Fill color
//   },
//   limitMax: false,     // If false, max value increases automatically if value > maxValue
//   limitMin: false,     // If true, the min value of the gauge will be fixed
//   colorStart: '#6FADCF',   // Colors
//   colorStop: '#8FC0DA',    // just experiment with them
//   strokeColor: '#E0E0E0',  // to see which ones work best for you
//   generateGradient: true,
//   highDpiSupport: true,     // High resolution support
//   percentColors: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],
  
// };
var target = document.getElementById('doe'); // your canvas element
var gauge3 = new Gauge(target).setOptions(opts); // create sexy gauge3!
gauge3.maxValue = 3000; // set max gauge3 value
gauge3.setMinValue(0);  // Prefer setter over gauge3.minValue = 0
gauge3.animationSpeed = 59; // set animation speed (32 is default value)
gauge3.set(2375); // set actual value


// var counter = 0;

// setInterval(() => {
//   gauge1.set(counter);
//   counter += 10;
//   console.log(counter);
// }, 300);
// setInterval(() => {
//   gauge2.set(counter);
//   counter+= 10;
// }, 300);
// setInterval(() => {
//   gauge3.set(counter);
//   counter+= 10;
// }, 300);

gauge1.set(1500);
gauge2.set(850);
gauge3.set(2500);