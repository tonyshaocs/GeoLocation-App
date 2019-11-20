	//Change the map on mouse click.
	function handleMapClick(evt){
		var lonlat = map.getLonLatFromViewPortPx(evt.xy);
		var position = new OpenLayers.LonLat(lonlat.lon,lonlat.lat);
		var displayPos = new OpenLayers.LonLat(lonlat.lon,lonlat.lat).transform( toProjection, fromProjection);
		markers.clearMarkers();
		markers.addMarker(new OpenLayers.Marker(position));
		curlon=displayPos.lon;
		curlat=displayPos.lat;
		document.getElementById("infoLon").innerHTML="Current Longitude: "+curlon.toString().substring(0,10);
		document.getElementById("infoLat").innerHTML="Current Latitude: "+curlat.toString().substring(0,10);
		updateAddress1();
		startWorker();
	}
	
	//Relocate the position on the map.
	function changeMap(lon,lat){
		if (lon!="" && lat!=""){
			var templat=parseFloat(lon,10);
			var templon=parseFloat(lat,10);
			var position = new OpenLayers.LonLat(templon, templat).transform( fromProjection, toProjection);
			markers.clearMarkers();
			markers.addMarker(new OpenLayers.Marker(position));
			map.setCenter(position, zoom );	
			updateAddress1();
			startWorker();
		}
	}
	
	//Set a new current location by input.
	function setLocation(lon,lat){
		var templat=parseFloat(lon,10);
		var templon=parseFloat(lat,10);
		document.getElementById("infoAdd").innerHTML = "";
		document.getElementById("infoLon").innerHTML="Current Longitude: "+templon.toString().substring(0,10);
		document.getElementById("infoLat").innerHTML="Current Latitude: "+templat.toString().substring(0,10);
		curlat=templat;
		curlon=templon;
		changeMap(lon, lat);
	}
	