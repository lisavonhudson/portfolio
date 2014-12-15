$(document).on("mousedown", ".gauge-container", function(e){
     
     $(document).on("mousemove", ".gauge-container", function(e){
      var parentOffset = $(this).offset(); 
      var relX = e.pageX - parentOffset.left;
      var relY = e.pageY - parentOffset.top;

         //find center
         var cy = $(this).height();
         var cx = $(this).width()/2;



         var rad2deg = 180/Math.PI;

         if(relX < cx){
           var op = cy - relY;
           var adj = cx - relX;
           var ratio = op/adj;
           var r = Math.atan( ratio) * rad2deg;
          }  
          else{
           var op = cy - relY;
           var adj = relX - cx;
           var ratio = op/adj;

           var r1 = Math.atan( ratio) * rad2deg;
           var r = 180 - r1;
          }




      if(r >= 0 && r <= 180){

      
        $("#meter").attr("transform", "rotate("+r+" 100 100)");

          var val = r.toFixed();
          var desc = "Safe";

          $('.level-container').removeClass('okay danger').addClass('safe');

          if(val>61 && val < 120){
            desc = "Okay";
            $('.level-container').removeClass('safe danger').addClass('okay');

          }

          if(val > 120){
            desc = "Danger!";
            $('.level-container').removeClass('safe okay').addClass('danger');
          }

         $( ".danger-meter .level" ).html("Level "+val);
          $(".danger-meter .desc").html(desc);
          
          
            }
     });

  });
   $(document).on("mouseup", ".gauge-container", function() {
      $(document).off("mousemove", ".gauge-container");
  });