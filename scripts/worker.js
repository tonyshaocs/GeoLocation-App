//Uses a worker to handle calculating distance in a seperate process.
//This worker works for all browsers.
function startWorker() {
	worker = new Worker(URL.createObjectURL(new Blob(["self.onmessage = function (e) { curLat = e.data.curLat; curLon = e.data.curLon;textLat = e.data.textLat;textLon = e.data.textLon;doSomething();}\n"+doSomething.toString()+radians.toString()], {type: 'application/javascript'})));
	worker.postMessage({curLat:curLat, curLon:curLon, textLat:textLat, textLon:textLon});
	worker.onmessage = function(event) {
		document.getElementById("result").innerHTML = event.data;
	};
}


/*
//Different worker which only works on Chrome.
function startWorker() {
	if (typeof(Worker) !== "undefined") {
		w = new Worker("haversine.js");
		//alert(curLat+" "+curLon+" "+textLat+" "+textLon);
		w.postMessage({curLat:curLat, curLon:curLon, textLat:textLat, textLon:textLon});
		
	w.onmessage = function(event) {
		document.getElementById("result").innerHTML = event.data;
	};
	} else {
		document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
	}
}
*/
