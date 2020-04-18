// ==UserScript==
// @name         GAlerts!
// @namespace    http://github.com/rwinikates/GAlerts
// @version      0.1
// @description  Set threshold, alert when realtime traffic goes over threshold
// @author       Rwinikates
// @grant        GM_notification
// @match        https://analytics.google.com/analytics/web/
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    if (Notification.permission === "granted") {
        console.log("Notifications are supported!");
        // set initial values
        var nextAlert = 3000;
        var lastAlert = nextAlert;
        var incremental = 250;

        var frequency = 1 * 60 * 1000 ; //(minutes times 60 for seconds times 1000 for milliseconds)

        var a=new AudioContext() // browsers limit the number of concurrent audio contexts, so you better re-use'em

        function beep(vol, freq, duration){
            var v=a.createOscillator()
            var u=a.createGain()
            v.connect(u)
            v.frequency.value=freq
            v.type="square"
            u.connect(a.destination)
            u.gain.value=vol*0.01
            v.start(a.currentTime)
            v.stop(a.currentTime+duration*0.001)
        }

        function getActiveUsers() {
            var active = document.getElementById('galaxyIframe').contentWindow.document.getElementById('ID-overviewCounterValue').innerHTML;
            while (active > nextAlert){
                lastAlert = nextAlert;
                nextAlert = nextAlert + incremental;

                var d=new Date();
                var n=d.toTimeString();
                var timeOfAlert = n.substr(0,5);

                var stats = 'As of ' + timeOfAlert + ' Current active users: ' + active + '\nLast alert at: ' + lastAlert+ ' | Next alert at: ' + nextAlert;

                // console.log(timeOfAlert + '\n' +stats);

                var galert = new Notification(stats);
                beep(100,520,200);
            }
        }
        setInterval(getActiveUsers, frequency);
    }
    else {
        // Add button to allow desktop notifications if they aren't already available
        console.log("Notifications are not allowed for this page yet.");
        document.getElementsByTagName('body').prepend('<button id="ask_permission">Alert me!</button>');
        document.GetElementById('ask_permission').click(function(e) {
            e.preventDefault();
            Notification.requestPermission();
            alert("Click allow above, and then refresh to see notifications.");
        });
    }
})();
