if (window.webkitNotifications.checkPermission() == 0) {
  console.log("Notifications are supported!");
  // set initial values
  var nextAlert = 500; 
  var lastAlert = nextAlert;
  var incremental = 100;
  
  var frequency = 5 * 60 * 1000 ; //(minutes times 60 for seconds times 1000 for milliseconds)
  
  var icon = '48.png';
  var mCoinSound = new Audio("https://dl.dropbox.com/u/7079101/coin.mp3");
  
  function getActiveUsers() {
	 var active = document.getElementById("ID-layout-1374786176014-counterValue").innerHTML;
	 while (active > nextAlert){
	   lastAlert = nextAlert;
	   nextAlert = nextAlert + incremental;
	   var stats = 'Current active users: ' + active + '\nLast alert at: ' + lastAlert+ ' | Next alert at: ' + nextAlert;
	   
	   var d=new Date();
	   var n=d.toTimeString();
	   var timeOfAlert = n.substr(0,5);
	   var title = 'New traffic alert: ' + timeOfAlert;
	   
	   console.log(timeOfAlert + '\n' +stats);
	   
	   var galert = window.webkitNotifications.createNotification(icon, title, stats);
	   galert.onclick = function(x) { window.focus();}
	   mCoinSound.play();
	   galert.show();
	 }
  }
  setInterval(getActiveUsers, frequency);
}
else {
  // Add button to allow desktop notifications if they aren't already available
  console.log("Notifications are not allowed for this page yet.");
  $('body').prepend('<button id="ask_permission">Alert me!</button>');
  $('#ask_permission').click(function(e) {
		  e.preventDefault();
		  window.webkitNotifications.requestPermission();
		  alert("Click allow above, and then refresh to see notifications.");
		});
}
