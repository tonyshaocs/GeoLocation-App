//Updates coordinates on screen.

function updateCurrentCoors(lon, lat){
	document.getElementById("infoLon").innerHTML="Current Longitude: "+lon.toString().substring(0,10);
	document.getElementById("infoLat").innerHTML="Current Latitude: "+lat.toString().substring(0,10);
}

function updateTextFileCoors(lon, lat){
	document.getElementById("textLon").innerHTML="TextFile Longitude: "+lon.toString().substring(0,10);
	document.getElementById("textLat").innerHTML="TextFile Latitude: "+lat.toString().substring(0,10);
}