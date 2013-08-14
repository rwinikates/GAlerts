window.addEventListener('load', function() {
  // Apply configuration back to our extension
	function config() {
	  var frequency = parseInt(document.getElementById("iterations").value);
	  console.log(frequency);
	}
  //Save the form
   document.querySelector('.submit').addEventListener('click', function() {
    config();
  });
});