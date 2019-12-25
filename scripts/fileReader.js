//Read the file and set the longitude & latitude on screen.
function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	var files = evt.dataTransfer.files; 
	var reader = new FileReader();  
	reader.readAsText(files[0]);
	
	reader.onload = function(event) {      
		//Read the text file for a set of coordinates
		document.getElementById('targetZone').value = event.target.reader;
		var coorSet=(reader.result).replace(")","").replace("(","").split(","); 
		textLon=coorSet[1];
		textLat=coorSet[0];
		//Update the map to the coordinates inside the text file.
		updateMap(coorSet[0],coorSet[1]);
		//Update the screen for the coordinates in the text file.
		updateTextFileCoors(textLon, textLat);
		document.getElementById("textHead").innerHTML = "Loaded Coors";
		//Retrieve and update the address for the coordinates in the text file.
		updateAddress2();
		//Begin the worker to calculate the distance between the user's previous position and new position.
		startWorker();
	}        
}


//Handler for the drop and drop zone
function dragoverHandler(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}

var dropZone = document.getElementById('targetZone');
dropZone.addEventListener('dragover', dragoverHandler, false);
dropZone.addEventListener('drop', handleFileSelect, false);


