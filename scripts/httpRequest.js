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
