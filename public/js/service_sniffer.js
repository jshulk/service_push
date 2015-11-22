(function(global, pusher){
	var sniffer = {

		isServiceWorkerEnabled: function serviceWorkerEnabled(){
			return ('serviceWorker' in global.navigator);
		},
		isReady: function isReady(){
			( this.isServiceWorkerEnabled() && this.pushEnabled() );
		},
		pushEnabled: function(){
			return !!(global.serviceWorkerRegistration.pushManager);
		},
		notificationEnabled: function(){
			//Todo : remove it
		}	
	};

	pusher.sniffer = sniffer;
	global.pusher = pusher ;

})(window, window.pusher || {});