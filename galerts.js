if (Notification.permission === "granted") {
  console.log("Notifications are supported!");
  // set initial values
  var nextAlert = 50;
  var lastAlert = nextAlert;
  var incremental = 10;

  var frequency = 5 * 60 * 1000 ; //(minutes times 60 for seconds times 1000 for milliseconds)


  var mCoinSound = new Audio("https://dl.dropbox.com/u/7079101/coin.mp3");

  function getActiveUsers() {
	 var active = document.getElementById("ID-overviewCounterValue").innerHTML;
	 while (active > nextAlert){
	   lastAlert = nextAlert;
	   nextAlert = nextAlert + incremental;

	   var d=new Date();
	   var n=d.toTimeString();
	   var timeOfAlert = n.substr(0,5);

	   var stats = 'As of ' + timeOfAlert + ' Current active users: ' + active + '\nLast alert at: ' + lastAlert+ ' | Next alert at: ' + nextAlert;

	   console.log(timeOfAlert + '\n' +stats);

	   var galert = new Notification(stats);
	   mCoinSound.play();
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
		  Notification.requestPermission();
		  alert("Click allow above, and then refresh to see notifications.");
		});
}
