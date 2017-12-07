This is a chrome extension that uses the HTML 5 desktop alerts at various traffic levels based on the real time number in Google Analytics.

**Steps to install**

1. Copy this folder to a location on your desktop where you want it to live.

2. Go to chrome://extensions/ and check off the "developer mode" checkbox

3. Click "Load unpacked extension" button and choose this folder

4. The first time you load google analytics, there should be a button at the top left corner of the page to trigger you to allow desktop notifications.  Click the button, refresh the page.

5. That should be it!

The heart of the extension is the galerts.js file.  If you wish to tweak it to remove the sound or change the alert levels or increments it alerts at, just edit the file there, it is pretty straightforward JS.  Unfortunately the options page doesn't do anything yet. If you want to edit settings in galerts.js, look at the nextAlert and incremental variables to set when to start getting alerted and at what resolution you want alerts at. 

