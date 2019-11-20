	//Update the address of the first set of coors.
	function updateAddress1(){
		HTTPRequest(1);
	}
	
	//Update the address of the second set of coors.
	function updateAddress2(){
		HTTPRequest(2);
	}
	
	//Make a get http request to the API.
	function HTTPRequest(inputType){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				processXML(this, inputType);
			}
		};
		if (inputType ==1){
			xhttp.open("GET", "https://nominatim.openstreetmap.org/reverse?format=xml&lat="+curlat+"&lon="+curlon+"&zoom=18&addressdetails=1", true);
		}
		else{
			xhttp.open("GET", "https://nominatim.openstreetmap.org/reverse?format=xml&lat="+textLat.toString().replace(" ","")+"&lon="+textLon.toString().replace(" ","")+"&zoom=18&addressdetails=1", true);
		}
		xhttp.send();
		
	}
	
	//Process the XML and set the address.
	function processXML(xml, type){
		if (type == 1){
			id = "infoAdd";
		}
		else {
			id = "textAdd";
		}
	
		var xmlDoc = xml.responseXML;
		try{
			document.getElementById(id).innerHTML = xmlDoc.getElementsByTagName("house_number")[0].textContent+" "+xmlDoc.getElementsByTagName("road")[0].textContent+", "+xmlDoc.getElementsByTagName("city")[0].textContent+", "+
			xmlDoc.getElementsByTagName("country")[0].textContent;
		}
		catch{
			try{
			document.getElementById(id).innerHTML = xmlDoc.getElementsByTagName("road")[0].textContent+", "+xmlDoc.getElementsByTagName("city")[0].textContent+", "+
			xmlDoc.getElementsByTagName("country")[0].textContent;
			}
			catch{
			try{
			document.getElementById(id).innerHTML = xmlDoc.getElementsByTagName("pedestrian")[0].textContent+", "+xmlDoc.getElementsByTagName("city")[0].textContent+", "+
			xmlDoc.getElementsByTagName("country")[0].textContent;	
			}
			catch{
			document.getElementById(id).innerHTML = "Failed to find Address";
			}
			}
		}
	}


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
	
	
	//Read the file.
	function handleFileSelect(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		var files = evt.dataTransfer.files; 
		var reader = new FileReader();  
		reader.readAsText(files[0]);
		reader.onload = function(event) {            
			document.getElementById('targetZone').value = event.target.reader;
			var coorSet=(reader.result).replace(")","").replace("(","").split(",");
			textLat=coorSet[0];
			textLon=coorSet[1];
			changeMap(coorSet[0],coorSet[1]);
			document.getElementById("textLon").innerHTML="TextFile Longitude: "+textLon.toString().substring(0,10);
			document.getElementById("textLat").innerHTML="TextFile Latitude: "+textLat.toString().substring(0,10);
			document.getElementById("textAdd").innerHTML = "";
			document.getElementById("textHead").innerHTML = "Loaded Coors";
			updateAddress2();
			startWorker();
		}        
	}
	

	function dragoverHandler(evt) {
		evt.stopPropagation();
		evt.preventDefault();
	}
	
	var dropZone = document.getElementById('targetZone');
	dropZone.addEventListener('dragover', dragoverHandler, false);
	dropZone.addEventListener('drop', handleFileSelect, false);


