 function loadMap (){

  var map, pointarray, heatmap;

  var myLatlng = new google.maps.LatLng(45.176229,-87.083344);
  var mapOptions = {
    zoom: 12,
    center: myLatlng,
     scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map($("#heatmapArea")[0], mapOptions);

   var heatmapData = [
    new google.maps.LatLng(45.127682,-87.245049),
new google.maps.LatLng(45.162434,-87.195824),
new google.maps.LatLng(45.185848,-87.148193),
new google.maps.LatLng(45.125259,-87.234299),
new google.maps.LatLng(45.296684,-87.060471),
new google.maps.LatLng(45.227032,-86.989662),
new google.maps.LatLng(45.219139,-87.033905),
new google.maps.LatLng(45.187672,-87.123138),
new google.maps.LatLng(44.929928,-87.173607),
new google.maps.LatLng(44.905602,-87.215546),
new google.maps.LatLng(45.184746,-87.123688),
new google.maps.LatLng(45.185200,-87.129898),
new google.maps.LatLng(45.181282,-87.142792),
new google.maps.LatLng(45.128471,-87.250740),
new google.maps.LatLng(45.128887,-87.251793),
new google.maps.LatLng(45.340244,-86.940826),
new google.maps.LatLng(44.837658,-87.376717),
new google.maps.LatLng(44.834511,-87.379791),
new google.maps.LatLng(44.851124,-87.358742),
new google.maps.LatLng(44.850445,-87.349144),
new google.maps.LatLng(44.859764,-87.412056),
new google.maps.LatLng(45.159828,-87.232307),
new google.maps.LatLng(44.792084,-87.309425),
new google.maps.LatLng(45.061459,-87.123741),
new google.maps.LatLng(45.061420,-87.124596),
new google.maps.LatLng(45.065422,-87.123718)
   ];

var pointArray = new google.maps.MVCArray(heatmapData);


  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray
  });
  heatmap.set('opacity', .4);
  heatmap.set('radius', 40);
  heatmap.setMap(map);

  var ctaLayer = new google.maps.KmlLayer({
    url: 'http://lisavonhudson.com/js/DoorCountyWI.kml'
  });
  ctaLayer.setMap(map);

   
}
