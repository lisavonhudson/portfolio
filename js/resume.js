//load resume
function loadResume(){
  $.getJSON("json/resume.json").done(function(data){
    
            dust.render("resume",  data, function(err, out) {
              
              $("#resume").append(out);
          }); 

            var curYear = new Date().getFullYear();
            //highest year.  using html because I know that will always be the highest
            var highestYear = curYear - data.resume[0].skills[0].years;
            $(data.resume[0].skills).each( function(i, d){
            	//calculate bar width
            	var id = d.id;
            	var years =  curYear - d.years;

            	var bWidth = (years/highestYear) * 100;

            	  setTimeout(function(){
			    $('#'+id+" .fill").html(years).css('width', bWidth+"%");
			     
			   },100);

            });


        
    }).fail(function(){});
}