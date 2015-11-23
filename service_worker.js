self.addEventListener('push', function(event){
	console.log("push message received");
	console.log(event);
	showNotification();
});

function showNotification(){
	var notificationOptions = {
		body : "This is a dummy notification"
	}
	var title  = "dummy"
	if(self.registration.showNotification) {
		return self.registration.showNotification(title, notificationOptions);
	} else {
		 new Notification(title, notificationOptions);
	}
}