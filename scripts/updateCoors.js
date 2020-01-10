//Updates coordinates on screen for the current position on map.
function updateCurrentCoors(lon, lat){
	document.getElementById("infoLon").innerHTML="Current Longitude: "+lon.toString().substring(0,10);
	document.getElementById("infoLat").innerHTML="Current Latitude: "+lat.toString().substring(0,10);
}

//Updates coordinates on screen for a valid text file that was dragged & dropped.
function updateTextFileCoors(lon, lat){
	document.getElementById("textLon").innerHTML="TextFile Longitude: "+lon.toString().substring(0,10);
	document.getElementById("textLat").innerHTML="TextFile Latitude: "+lat.toString().substring(0,10);
}