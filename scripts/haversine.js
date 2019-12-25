self.onmessage = function (e) {
    var curLat = e.data.curLat;
    var curLon = e.data.curLon;
	var textLat = e.data.textLat;
    var textLon = e.data.textLon;
	doSomething(curLat, curLon, textLat, textLon);
}

//Converts degrees to radians.
function radians(degrees) {
	return degrees * Math.PI / 180;
}

//Calculates distance between two points of lat/lon using the Haversine formula.
function doSomething(){
	var R= 6371;
	var sp1 = radians(curLat);
	var sp2 = radians(textLat);
	var dLat = radians(textLat - curLat);
	var dLon = radians(textLon - curLon);
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(sp1) * Math.cos(sp2) * 
                Math.sin(dLon/2) * Math.sin(dLon/2); 
				
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	
	var d = R * c; 
	postMessage("Distance between the two: " +d.toString().substring(0,10) +" KM");
}
