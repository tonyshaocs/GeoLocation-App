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


