//Update the address for the set of coordinates the marker is at.
function updateAddress1(){
	HTTPRequest(1);
}

//Update the address of the set of coordinates retrieved from the textfile.
function updateAddress2(){
	HTTPRequest(2);
}

//Make a HTTP GET request to the API, which returns XML containing the address of the given coordinates.
function HTTPRequest(inputType){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			processXML(this, inputType); //If successful, pass to callback function
		}
	};
	if (inputType == 1){
		xhttp.open("GET", "https://nominatim.openstreetmap.org/reverse?format=xml&lat="+curLat+"&lon="+curLon+"&zoom=18&addressdetails=1", true);
	}
	else{
		xhttp.open("GET", "https://nominatim.openstreetmap.org/reverse?format=xml&lat="+textLat.toString().replace(" ","")+"&lon="+textLon.toString().replace(" ","")+"&zoom=18&addressdetails=1", true);
	}
	xhttp.send();
	
}

//Process the XML and set the address when the request finishes.
function processXML(xml, type){
	if (type == 1){
		id = "infoAdd";
	}
	else {
		document.getElementById("textAdd").innerHTML = "";
		id = "textAdd";
	}
	
	//Since not all addresses are given in the same kind of tag, this portion tries to get info from a tag and if it doesnt exist, then it is caught and retried with a different one.
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
