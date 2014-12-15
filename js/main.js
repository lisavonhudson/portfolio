var porfolioApp = angular.module('porfolioApp', []);

porfolioApp.controller('portfolioListCtrl', function ($scope) {
  $scope.examples = [
		{
			"title":  "Interactive Chart",
			"link": "chart", 
			"mobile": "yes",
			"useJSON":"yes",
			"desc": "The set up:  You want to buy a new car.  Your loan is for five years.  This interactive chart will help you find the lowest cost car based on estimated fuel prices and how many miles you will drive per year.  Use the sliders to create different scenarios.",
			"skills":[
				"CSS 3", 
				"jQuery", 
				"JSON",
				"Dust"
			]
		},
		{
			"title":  "SVG Gauge",
			"link": "gauge", 
			"mobile": "no",
			"useJSON":"no",
			"desc": "This was a test with SVG.  Drag the needle on the gauge and it will change other elements on the page.",
			"skills":[
				"CSS 3", 
				"jQuery", 
				"SVG"
			]
		},
		{
			"title":  "Heatmaps",
			"link": "heatmaps", 
			"mobile": "yes",
			"useJSON":"yes",
			"desc": "A Google map that shows you all the fun areas in Door County, WI.",
			"skills":[
				"Google Api", 
				"jQuery", 
				"JSON",
				"KML"
			]
		},
		{
			"title":  "balfabservices.com",
			"link": "http://balfabservices.com",
			"externalLink": "yes", 
			"mobile": "yes",
			"useJSON":"no",
			"desc": "A freelance project for a fan repair and rebuilding company.",
			"skills":[
				"PHP", 
				"jQuery", 
				"Design",
				"CSS"
			]
		},
		{
			"title":  "A Parallax Site",
			"link": "parallax", 
			"externalLink": "yes", 
			"mobile": "yes",
			"useJSON":"no",
			"desc": "A site I built for the marketing department.  They made a PDF, I made it move.  It is not live yet, but hopefully soon it will be.",
			"skills":[
				"parallax", 
				"CSS3"
			]
		}
	];
});
$(document).ready(function() {

  var s = skrollr.init();


});