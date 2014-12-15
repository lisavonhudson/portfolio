var empty = [];
var contactos = 11000;

$.ajaxSetup({
   async: false
 });

 //load dust
   dust.onLoad = function(name, callback) {
    $.ajax("dust/" + name + ".dust", {
      success: function(data) {
        callback(undefined, data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        callback(textStatus, undefined);
      }
    });
  };


//load examples
function loadExampleList(){
  $.getJSON("json/code-examples-list.json").done(function(data){

            dust.render("example-list-view",  data, function(err, out) {
        
           $("#exampleDesc").html(out);
          }); 
    }).fail(function(){});
}


function formatMoney(yourNumber) {
    //Seperates the components of the number
    //var n= yourNumber.toString().split(".");

    //rounds number

   var n =  (yourNumber.toFixed(0)).toString();
    //Comma-fies the first part
    n = n.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //Combines the two sections
   // return "$"+n.join(".");
    return "$"+n;
}

function formatDigits(yourDigit){
   var d = yourDigit.toString();
   return d.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

function setResumePrecentage(){
  var resHeight = $("#resume" ).height();
  var winHeight = $(window).height();
  var dataPercentage = (resHeight/winHeight) * 100;
  $("#resume").attr('data-11000', 'top: -'+dataPercentage+'%;')
}

//on ready
$(document).ready(function() {

  loadExampleList();
  loadResume();
  loadDust("example-gauge");
  loadDust("example-heatmaps");
  buildChartObject();
  buildChart();
  animateCosts();
  loadMap();
  setResumePrecentage();

  $('a._scrollLink').click(function() {

     $('a._scrollLink').removeClass('selected');
     $(this).addClass('selected');
     

    });

   $(window).scroll(function() {           

         var winos = $(window).scrollTop();
         //get section offsets
         var aboutos = 0;
         var workos = 1000;
         var resumeos = 8200;
         var contactos = 11000;
         

         if(aboutos  <= winos && winos< workos){
           $('nav a').removeClass('selected');
           $('nav a._about').addClass('selected');

         }
         else{
          $('#about').removeClass('fixed');
         }
         
         if(workos  <= winos && winos< resumeos){
           $('nav a').removeClass('selected');
           $('nav a._work').addClass('selected');
         }
         else{
          $('#work').removeClass('fixed');
         }

          if(resumeos  <= winos && winos< contactos){
           $('nav a').removeClass('selected');
           $('nav a._resume').addClass('selected');
         }
         else{
          $('#resume').removeClass('fixed');
         }
          if(contactos  <= winos){
           $('nav a').removeClass('selected');
           $('nav a._contact').addClass('selected');
         }
         else{
          $('#contact').removeClass('fixed');
         }


            
        }); // window scroll Ends
      

      if ($('header').width() >= 992){

            
            var s = skrollr.init();
            skrollr.menu.init(s, {
                  animate: true
              });

         }


});





$(window).resize(function(){
  setResumePrecentage();

    var hasSkrollr = $('html').hasClass('skrollr-desktop'); 

      if ($('header').width() >= 992 && (hasSkrollr === false)){

            var s = skrollr.init();
            skrollr.menu.init(s, {
                  animate: true
              });

       }   
       if ($('header').width() <= 992 && (hasSkrollr === true)){

              skrollr.init().destroy();

       }    
       if ($('header').width() >= 992 && (hasSkrollr === true)){

       }

});









