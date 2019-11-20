	//works on chrome
	function startWorker() {
		worker = new Worker(URL.createObjectURL(new Blob(["self.onmessage = function (e) { curlat = e.data.curlat;curlon = e.data.curlon;textlat = e.data.textLat;textlon = e.data.textLon;doSomething();}\n"+doSomething.toString()+radians.toString()], {type: 'application/javascript'})));
		worker.postMessage({curlat:curlat, curlon:curlon, textLat:textLat, textLon:textLon});
		worker.onmessage = function(event) {
			document.getElementById("result").innerHTML = event.data;
		};
	}
	
	
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
	