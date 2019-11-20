	//Initialize a map instance. Get the position of the user w/permission.
	map = new OpenLayers.Map("demoMap");
	window.onload = function init() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			document.getElementById("x").innerHTML = "Geolocation is not supported for this browser. Consider Chrome or FireFox, Real Browsers.";
		}
	}
	
	//Set the Home(Initial) Position
	function showPosition(position) {
		curlon= position.coords.longitude;
		curlat= position.coords.latitude;
		mapInit(curlon,curlat);
		document.getElementById("infoLon").innerHTML="Current Longitude: "+curlon.toString().substring(0,10);
		document.getElementById("infoLat").innerHTML="Current Latitude: "+curlat.toString().substring(0,10);
		updateAddress1();
	}
	
	//Initialize the Map.
	function mapInit(curlon,curlat){
        var mapnik = new OpenLayers.Layer.OSM();
        fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var position = new OpenLayers.LonLat(curlon,curlat).transform( fromProjection, toProjection);
        zoom = 18; 

		markers = new OpenLayers.Layer.Markers("Markers");
		map.addLayer(markers);
		markers.addMarker(new OpenLayers.Marker(position));
		
        map.addLayer(mapnik);
        map.setCenter(position, zoom );
		map.events.register('click', map, handleMapClick);
	}
