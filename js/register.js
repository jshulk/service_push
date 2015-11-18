var isPushEnabled = false;
window.addEventListener('load', function(){
	var pushButton = document.querySelector(".js-push-button");
	if( isPushEnabled ) {
		subscribe();
	} else {
		unsubscribe();
	}

	if( 'serviceWorker' in navigator ){
		navigator.serviceWorker.register("/service-worker.js")
		.then(initializeState);
	} else {
		console.warn("service worker is not supported");
	}
});