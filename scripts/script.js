	map = new OpenLayers.Map("demoMap");
	window.onload = function init() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			document.getElementById("x").innerHTML = "Geolocation is not supported for this browser. Consider Chrome or FireFox, Real Browsers.";
		}

	}
	
	function showPosition(position) {
		curlon= position.coords.longitude;
		curlat= position.coords.latitude;
		mapInit(curlon,curlat);
		document.getElementById("infoLon").innerHTML="Current Longitude: "+curlon.toString().substring(0,10);
		document.getElementById("infoLat").innerHTML="Current Latitude: "+curlat.toString().substring(0,10);
		loadDoc();
	}
	
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
		loadDoc();
		startWorker();
	}
	
	function loadDoc(){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			processXML(this);
			}
		};
		xhttp.open("GET", "https://nominatim.openstreetmap.org/reverse?format=xml&lat="+curlat+"&lon="+curlon+"&zoom=18&addressdetails=1", true);
		xhttp.send();
	}
	
	function loadDocText(){
		var xhttp = new XMLHttpRequest();
		document.getElementById("textAdd").innerHTML = "";
		document.getElementById("textHead").innerHTML = "From Text File";
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			processXML2(this);
			}
		};
		xhttp.open("GET", "https://nominatim.openstreetmap.org/reverse?format=xml&lat="+textLat.toString().replace(" ","")+"&lon="+textLon.toString().replace(" ","")+"&zoom=18&addressdetails=1", true);
		xhttp.send();
	}
	

	function processXML(xml){
		var xmlDoc = xml.responseXML;
		try{
			document.getElementById("infoAdd").innerHTML = xmlDoc.getElementsByTagName("house_number")[0].textContent+" "+xmlDoc.getElementsByTagName("road")[0].textContent+", "+xmlDoc.getElementsByTagName("city")[0].textContent+", "+
			xmlDoc.getElementsByTagName("country")[0].textContent;
		}
		catch{
			try{
			document.getElementById("infoAdd").innerHTML = xmlDoc.getElementsByTagName("road")[0].textContent+", "+xmlDoc.getElementsByTagName("city")[0].textContent+", "+
			xmlDoc.getElementsByTagName("country")[0].textContent;
			}
			catch{
			try{
			document.getElementById("infoAdd").innerHTML = xmlDoc.getElementsByTagName("pedestrian")[0].textContent+", "+xmlDoc.getElementsByTagName("city")[0].textContent+", "+
			xmlDoc.getElementsByTagName("country")[0].textContent;	
			}
			catch{
			document.getElementById("infoAdd").innerHTML = "Failed to find Address";
			}
			}
		}
	}
	
	function processXML2(xml){
		var xmlDoc = xml.responseXML;
		try{
			document.getElementById("textAdd").innerHTML =  xmlDoc.getElementsByTagName("house_number")[0].textContent+" "+xmlDoc.getElementsByTagName("road")[0].textContent+", "+xmlDoc.getElementsByTagName("city")[0].textContent+", "+
			xmlDoc.getElementsByTagName("country")[0].textContent;		
		}
		catch{
			try{
			document.getElementById("textAdd").innerHTML = xmlDoc.getElementsByTagName("road")[0].textContent+", "+xmlDoc.getElementsByTagName("city")[0].textContent+", "+
			xmlDoc.getElementsByTagName("country")[0].textContent;
			}
			catch{
			try{
			document.getElementById("textAdd").innerHTML = xmlDoc.getElementsByTagName("pedestrian")[0].textContent+", "+xmlDoc.getElementsByTagName("city")[0].textContent+", "+
			xmlDoc.getElementsByTagName("country")[0].textContent;
			}
			catch{
			document.getElementById("textAdd").innerHTML = "Failed to find Address";
			}
			}
	}}
	
	function changeMap(lon,lat){
		if(lon!="" && lat!=""){
		var templat=parseFloat(lon,10);
		var templon=parseFloat(lat,10);
		var position = new OpenLayers.LonLat(templon,templat).transform( fromProjection, toProjection);
		markers.clearMarkers();
		markers.addMarker(new OpenLayers.Marker(position));
		map.setCenter(position, zoom );
		document.getElementById("infoAdd").innerHTML = "";
		document.getElementById("infoLon").innerHTML="Current Longitude: "+templon.toString().substring(0,10);
		document.getElementById("infoLat").innerHTML="Current Latitude: "+templat.toString().substring(0,10);
		curlat=templat;
		curlon=templon;
		loadDoc();
		startWorker();
		}
	}
	
	//File Reader
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
			document.getElementById("textLon").innerHTML="TextFile Longitude: "+textLon.toString().substring(0,10);
			document.getElementById("textLat").innerHTML="TextFile Latitude: "+textLat.toString().substring(0,10);
			loadDocText();
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

	/*
	function startWorker() {
		if (typeof(Worker) !== "undefined") {
				w = new Worker("haversine.js");
				//alert(curlat+" "+curlon+" "+textLat+" "+textLon);
				w.postMessage({curlat:curlat, curlon:curlon, textLat:textLat, textLon:textLon});
				
			w.onmessage = function(event) {
				document.getElementById("result").innerHTML = event.data;
			};
			} else {
				document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
			}
	}
	*/
	
	//works on chrome
	function startWorker() {
				w = new Worker(URL.createObjectURL(new Blob(["self.onmessage = function (e) { curlat = e.data.curlat;curlon = e.data.curlon;textlat = e.data.textLat;textlon = e.data.textLon;doSomething();}\n"+doSomething.toString()+radians.toString()], {type: 'application/javascript'})));
				w.postMessage({curlat:curlat, curlon:curlon, textLat:textLat, textLon:textLon});
				w.onmessage = function(event) {
				document.getElementById("result").innerHTML = event.data;
			};
		
	}
	