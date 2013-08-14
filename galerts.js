if (window.webkitNotifications.checkPermission() == 0) {
  console.log("Notifications are supported!");
  // set initial values
  var nextAlert = 500;
  var lastAlert = nextAlert;
  var incremental = 100;
  
  var minutes = frequency * 60 * 1000; //(minutes times 60 for seconds times 1000 for milliseconds)
  console.log(minutes);
  
  var icon = '48.png';
  var mCoinSound = new Audio("https://dl.dropbox.com/u/7079101/coin.mp3");
  
  function getActiveUsers() {
	 var active = document.getElementById("ID-layout-1374786176014-counterValue").innerHTML;
	 if (active > nextAlert){
	   lastAlert = nextAlert;
	   nextAlert = nextAlert + incremental;
	   
	   var stats = 'Last alert at: ' + lastAlert + ' active users: ' + active + ' next alert at: ' + nextAlert;
	   console.log(stats);
	   
	   var galert = window.webkitNotifications.createNotification(icon, ' New Traffic Alert', stats);
	   galert.onclick = function(x) { window.focus();}
	   mCoinSound.play();
	   galert.show();
	   

	 }
  }
  setInterval(getActiveUsers, frequency);
}
else {
  console.log("Notifications are not allowed for this page yet.");
  $('body').prepend('<button id="ask_permission">Alert me!</button>');
  $('#ask_permission').click(function(e) {
		  e.preventDefault();
		  window.webkitNotifications.requestPermission();
		  alert("Click allow above, and then refresh to see notifications.");
		});
}