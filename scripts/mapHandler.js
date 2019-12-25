//Initialize a map instance. Get the position of the user w/permission.
map = new OpenLayers.Map("demoMap");
window.onload = function init() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		document.getElementById("x").innerHTML = "Geolocation is not supported for this browser. Consider Chrome or FireFox, Real Browsers.";
	}
}

//Initialize the screen and set the Home position
function showPosition(position) {
	//Get the user's position
	curLon = position.coords.longitude; 
	curLat = position.coords.latitude;
	//Initialize the map
	mapInit(curLon, curLat); 
	//Update the screen
	updateCurrentCoors(curLon, curLat); 
	updateAddress1();
}

//Initialize the Map.
function mapInit(curLon, curLat){
	var mapnik = new OpenLayers.Layer.OSM();
	fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
	toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
	var position = new OpenLayers.LonLat(curLon,curLat).transform( fromProjection, toProjection);
	zoom = 18; //Set zoom of the map.

	//Add marker to a layer
	markers = new OpenLayers.Layer.Markers("Markers"); 
	map.addLayer(markers);
	updateMarker(position);
	
	//Add and Set the layer to the map
	map.addLayer(mapnik);
	map.setCenter(position, zoom );
	map.events.register('click', map, handleMapClick);
}

//Update the map on mouse click. Start the worker to compare the two new distances.
function handleMapClick(evt){
	var lonlat = map.getLonLatFromViewPortPx(evt.xy);
	var position = new OpenLayers.LonLat(lonlat.lon,lonlat.lat); //Position using OpenLayer's metrics
	var displayPos = new OpenLayers.LonLat(lonlat.lon,lonlat.lat).transform( toProjection, fromProjection); //Position using Coordinates
	updateMarker(position);
	curLon=displayPos.lon;
	curLat=displayPos.lat;
	updateCurrentCoors(curLon, curLat);
	updateAddress1();
	startWorker();
}

//Set a new current location by input.
function setLocation(lon, lat){
	curLat=parseFloat(lon,10);
	curLon=parseFloat(lat,10);
	document.getElementById("infoAdd").innerHTML = "";
	updateCurrentCoors(curLon, curLat);
	updateMap(lon, lat);
}

//Relocate the user's position on the map.
function updateMap(lon, lat){
	if (lon!="" && lat!=""){
		var templat=parseFloat(lon,10);
		var templon=parseFloat(lat,10);
		var position = new OpenLayers.LonLat(templon, templat).transform( fromProjection, toProjection);
		updateMarker(position);
		map.setCenter(position, zoom );	
		updateAddress1();
		startWorker();
	}
}

//Update the marker on screen to a new position.
function updateMarker(position){
	markers.clearMarkers();
	markers.addMarker(new OpenLayers.Marker(position));
}
