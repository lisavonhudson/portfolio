var carObj={cars:[]};
var loanYears = 5;
var mpy = 15000;
var cpg = 3.5;
var highestGridLine = 8000;
var highestTotalCost = 6840;
var lowestCostCar = [];
var lowestCost =0;

function loadJsonDust(id){

$.getJSON("json/"+id+".json").done(function(data){
      
              dust.render(id,  data, function(err, out) {

                  $("#"+id).html(out).toggleClass('open');
            }); 
          
      }).fail(function(){});
}

function loadDust(id){
   dust.render(id,  empty, function(err, out) {
                  
          $("#"+id).html(out).toggleClass('open');

    });
}



function buildChartObject(){
    carObj.cars = [];
    lowestCostCar= [];
    $.getJSON("json/example-chart.json").done(function(data){
      
            $.each(data.carData, function(i, d){
                var car = d;

                var fuel = (cpg / d.cmpg) * mpy;
                var costPerYear = d.cost/loanYears;


                car.costYear = costPerYear;
                car.costYearView = formatMoney(costPerYear);

                car.fuelCost = fuel;
                car.fuelCostView = formatMoney(fuel);

                car.totalCost = fuel+costPerYear;
                car.totalCostView = formatMoney(fuel+costPerYear);

                carObj.cars.push(car);
                lowestCostCar.push(car.totalCost);
            });

          
      }).fail(function(){});


    carObj.cars.sort(function(a, b){
        var a1= a.cost, b1= b.cost;5
        if(a1== b1) return 0;
        return a1> b1? 1: -1;
    });

lowestCost = Math.min.apply(null, lowestCostCar);

}

function buildChart(){
      dust.render('example-chart',  carObj, function(err, out) {
        $("#example-chart").html(out).toggleClass('open');
        $( "#cpgSlider" ).slider({
                              value:cpg,
                              min: 3,
                              max: 6,
                              step: .25,
                              animate: "slow",
                               create: function( event, ui ) {
                                $('#fuelCost').html("$"+cpg.toFixed(2));
                              },
                              slide: function( event, ui ) {
                                var val = ui.value;
                                cpg = val;
                                $('#fuelCost').html("$"+cpg.toFixed(2));
                                updateCosts();
                              }
                            });

        $( "#mpySlider" ).slider({
                              value:mpy,
                              min: 10000,
                              max: 20000,
                              step: 1000,
                              animate: "slow",
                              create: function( event, ui ) {
                                $('#mpyCost').html(formatDigits(mpy));
                              },
                              slide: function( event, ui ) {
                                var val = ui.value;
                                mpy = val;
                                $('#mpyCost').html(formatDigits(mpy));
                                updateCosts();
                              }
                            });
      });

     var gridlineDivide = 1000;

     var numGridLines = Math.floor(highestGridLine / gridlineDivide);
     var gridLines = '<div  class="grid-line" style="bottom: 0%;"><span>$0</span></div>';

        for (var i=1; i <= numGridLines; i++)
          { 
            
            var bottom = (((i*gridlineDivide) / highestGridLine) * 100);

           gridLines += '<div  class="grid-line" style="bottom: '+bottom+'%;"><span>'+formatMoney(i*gridlineDivide)+'</span></div>';
          }

      $('.chart').append(gridLines);
}


function animateCosts(){

$.each(carObj.cars, function(i, d ) {

  var paymentH = (d.costYear/highestGridLine) * 100;
  var fuelH = (d.fuelCost/highestGridLine) * 100;
  var coverH = (d.totalCost/highestGridLine) * 100;

  $('.bar[data-id = "'+d.id+'"] .cover-div').css('height', coverH+'%');
  $('.bar[data-id = "'+d.id+'"] .fuel-costs').css('bottom', paymentH+'%');


  if(d.totalCost == lowestCost){
    $('.bar[data-id = "'+d.id+'"]').prepend("<div class='lowest-cost'>Lowest Cost</div>");
    $('.lowest-cost').css('bottom', coverH+'%');

    setTimeout(function(){
      $('.lowest-cost').addClass('show');
    },700);
  }
  
  setTimeout(function(){
    $('.bar[data-id = "'+d.id+'"] .year-payment').css('height', paymentH+'%').html(d.costYearView);
   },100);
  
  setTimeout(function(){
    $('.bar[data-id = "'+d.id+'"] .fuel-costs').css('height', fuelH+'%').html(d.fuelCostView);
   },600);

  $( '.bar[data-id = "'+d.id+'"] .cover-div' ).tooltip({
      items: "[ttc]",
      content: function() {
        return "Total Cost: "+d.totalCostView;
      },
      position: {
                my: "center bottom-10",
                at: "center top",
                using: function( position, feedback ) {
                  $( this ).css( position );
                  $( "<div>" )
                    .addClass( "arrow" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
              }
    });
  

});


}

function updateCosts(){
  $('.lowest-cost').remove();
buildChartObject();
$.each(carObj.cars, function(i, d ) {

  var fuelH = (d.fuelCost/highestGridLine) * 100;
  var coverH = (d.totalCost/highestGridLine) * 100;

  $('.bar[data-id = "'+d.id+'"] .cover-div').css('height', coverH+'%');

  $('.bar[data-id = "'+d.id+'"] .fuel-costs').css('height', fuelH+'%').html(d.fuelCostView) ;

    if(d.totalCost == lowestCost){
    $('.bar[data-id = "'+d.id+'"]').prepend("<div class='lowest-cost'>Lowest Cost</div>");
    $('.lowest-cost').css('bottom', coverH+'%');

    setTimeout(function(){
      $('.lowest-cost').addClass('show');
    },700);
  }
     
  

});


}

/*$(document).on('mouseenter', "._example", function(){

      var id = $(this).attr('data-id');
      var isExpand = $(this).hasClass('expand');

     if(isExpand === false){
      $('.example').addClass("shrink").removeClass("expand");
      $('.example-area').removeClass('open');
      $( '._example[data-id = "'+id+'"]' ).addClass('expand').removeClass("shrink");
   

     switch(id){
        case "example-chart":
          buildChartObject();
          buildChart();
          animateCosts();
        break;

        case "example-heatmaps":
         loadDust(id);
         loadMap();
        break;

        default:
        loadDust(id);
        break;
     }
    }

}).on('mouseleave', "._example", function(){
  $('.example').removeClass("expand shrink");
  $('.example-area').removeClass('open');
});*/

