
$(document).ready(function() {

// requestAnimationFrame Shim
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();
 

 var canvas = document.getElementById('myCanvas');
 var context = canvas.getContext('2d');
 var x = canvas.width / 2;
 var y = canvas.height / 2;
 var radius = 10;
 var endPercent = 50;
 var curPerc = 0;
 var counterClockwise = false;
 var circ = Math.PI * 2;
 var quart = Math.PI / 2;

 context.lineWidth = 2;
 context.strokeStyle = '#ad2323';


 function animate(current) {
     context.clearRect(0, 0, canvas.width, canvas.height);
     context.beginPath();
     context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
     context.stroke();
     curPerc++;
     if (curPerc < endPercent) {
         requestAnimationFrame(function () {
             animate(curPerc / 100)
         });
     }
 }

 animate();

});