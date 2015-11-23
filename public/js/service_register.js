(function(global, pusher){
	
	var navigator = global.navigator;
	var API_KEY = "AIzaSyCKt6uhdecDom2GSq75qNnSoy0lAxuBEYw";

	function registerServiceWorker(){
		
		navigator.serviceWorker.register("/service_worker.js", {
			scope: "./"
		})
		.then(function(res){
			console.log("service worker registered");
			console.log(res);
		})
		.catch(function(res){
			console.log("service worker registration failed");
			console.log(res);
		});
	}

	registerServiceWorker();

	// setup click event listener for subscribing push notifications
	var pushButton = document.getElementById("push-button");
	pushButton.addEventListener('click', function(e){
		var isSubscribed = pushButton.getAttribute("data-subscribed");
		if( !isSubscribed ) {
			subscribeDevice();
		}
	});

	function subscribeDevice(){
		navigator.serviceWorker.ready.then(function(serviceWorkerRegistration){
			serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
			.then(onPushSubscription)
			.catch(function(err){
				console.log("could not subscribe for push notifications");
				console.log(err);
			});
		});
	}

	function onPushSubscription(pushSubscription){
		console.log("push subscription done");
		console.log(pushSubscription);
		var curlEndPoint = pushSubscription.endpoint;
		var curlCommand = 'curl -I -X POST ' + curlEndPoint;
		if( curlEndPoint.indexOf("https://android.googleapis.com/gcm/send") === 0 ) {
			curlEndPoint = "https://android.googleapis.com/gcm/send";
			var subscriptionId = null;

			if( pushSubscription.subscriptionId ) {
				subscriptionId = pushSubscription.subscriptionId;
			} else {
				var endPointSections = pushSubscription.endpoint.split("/");
				subscriptionId = endPointSections[endPointSections.length - 1];
			}
		 	curlCommand = 'curl --header "Authorization: key=' + API_KEY +
		      '" --header Content-Type:"application/json" ' + curlEndPoint +
		      ' -d "{\\"registration_ids\\":[\\"' + subscriptionId + '\\"]}"';
		}

		var curlCodeElement = document.getElementById("curl-code");
		curlCodeElement.innerHTML = curlCommand;
	}

})(window, window.pusher || {});