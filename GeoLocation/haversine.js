var curlat=2;
var curlong=3;
var textlat=2;
var textlon=3;

self.onmessage = function (e) {
    curlat = e.data.curlat;
    curlon = e.data.curlon;
	textlat = e.data.textLat;
    textlon = e.data.textLon;
	doSomething();
}

function radians(degrees) {
	return degrees * Math.PI / 180;
}

function doSomething(){
	var R= 6371;
	var sp1 = radians(curlat);
	var sp2 = radians(textlat);
	var dLat = radians(textlat - curlat);
	var dLon = radians(textlon - curlon);
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(sp1) * Math.cos(sp2) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
				
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	
	var d = R * c; 
	postMessage("Distance between the two: " +d.toString().substring(0,10) +" KM");
}
