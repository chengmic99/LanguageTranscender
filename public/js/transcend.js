
// Render the login form.
//- function showLogin() {
//- 	okta.renderEl({ el: "#okta-login-container" }, function(res) {}, function(err) {
//- 		alert("Couldn't render the login form, something horrible must have happened. Please refresh the page.");
//- 	});
//- }

// Determine the room name and public URL for this chat session.
function getRoom() {
	var query = location.search && location.search.split("?")[1];
	if (query) 
		return (location.search && decodeURIComponent(query.split("&")[0].split("=")[1]));
	else
		return okta.tokenManager.get("idToken").claims.email;
}

// Retrieve the absolute room URL.
function getRoomURL() {
	return location.protocol + "//" + location.host + (location.pathname || "") + "?room=" + getRoom();
}

// Determine whether or not we have a querystring.
function hasQueryString() {
	return location.href.indexOf("?") !== -1;
}

// Handle the user's login and what happens next.
function handleLogin() {
	// If the user is logging in for the first time...
	if (okta.token.hasTokensInUrl()) {
		okta.token.parseTokensFromUrl(
		function success(res) {
			// Save the tokens for later use, e.g. if the page gets refreshed:
			okta.tokenManager.add("accessToken", res[0]);
			okta.tokenManager.add("idToken", res[1]);
			// Redirect to this user's dedicated room URL.
			window.location = getRoomURL();
			}, function error(err) {
			alert("We weren't able to log you in, something horrible must have happened. Please refresh the page.");
		}
		);
	} 
	// If the user is alrdy logged in...
	else {
		okta.session.get(function(res) {
			if (res.status === "ACTIVE") {
				// If the user is logged in on the home page, redirect to their room page.
				if (!hasQueryString()) 
					window.location = getRoomURL();
				else
					return enableVideo();
			}
			// If we get here, the user is not logged in.
			// If there's a querystring in the URL, it means this person is in a
			// "room" so we should display our passive login notice. Otherwise,
			// we'll prompt them for login immediately.
			if (hasQueryString()) {
				document.getElementById("login").style.display = "block";
			 	enableVideo();
			} else {
				showLogin();
			}
		});
	}
}

// display the video boxes and initialize the SimpleWebRTC code you just defined
function enableVideo() {
	document.getElementById("url").style.display = "block";
	document.getElementById("remotes").style.visibility = "visible";
	loadSimpleWebRTC();
}

function loadSimpleWebRTC() {
	
	//handles room joining
	var webrtc = new SimpleWebRTC({
		localVideoEl: "selfVideo",
		// the id/element dom element that will hold remote videos
		remoteVideosEl: "",
		autoRequestMedia: true,
		debug: false,
		detectSpeakingEvents: true,
		autoAdjustMic: false
	});
	
	// Set the publicly available room URL.
	document.getElementById("roomUrl").innerText = getRoomURL();
	
	// Immediately join room when loaded.
	webrtc.on("readyToCall", function() {
		webrtc.joinRoom(getRoom());
	});
	//snip
	

	function showVolume(el, volume) {
		if (!el) return;
		if (volume < -45) volume = -45; // -45 to -20 is
		if (volume > -20) volume = -20; // a good range
		el.value = volume;
	}
	
	// Display the volume meter.
	webrtc.on("localStream", function(stream) {
		var button = document.querySelector("form>button");
		if (button) 
			button.removeAttribute("disabled");
		document.getElementById("localVolume").style.display = "block";
	});
	
	// If we didn't get access to the camera, raise an error.
	webrtc.on("localMediaError", function (err) {
		alert("hello, pls grant access to camera and mic and refresh the page.");
	});
	
	// When another person joins the chat room, we'll display their video.
	webrtc.on("videoAdded", function(video, peer) {
		console.log("user added to chat", peer);
		var remotes = document.getElementById("remotes");
		if (remotes) {
			var outerContainer = document.createElement("div");
			outerContainer.className = "col-md-6";
			
			var vidCon = document.createElement("div");
			vidCon.className = "videoContainer";
			vidCon.id = "container_" + webrtc.getDomId(peer);
			vidCon.appendChild(video);
			// Suppress right-clicks on the video.
			video.oncontextmenu = function() { return false; };
			// Show the volume meter.
			var vol = document.createElement("meter");
			vol.id = "volume_" + peer.id;
			vol.className = "volume";
			vol.min = -45;
			vol.max = -20;
			vol.low = -40;
			vol.high = -25;
			vidCon.appendChild(vol);
			// box for spoken output
			var textCon = document.createElement("div");
			textCon.id = "speech_" + peer.id;
			textCon.className = "textContainer";
			textCon.readonly = '';
			textCon.wrap = 'soft';
			textCon.innerText = "spoken output  goes here";
			// vidCon.appendChild(textContainer);

			// Show the connection state.
			if (peer && peer.pc) {
				var connstate = document.createElement("div");
				connstate.className = "connectionstate";
				vidCon.appendChild(connstate);
				peer.pc.on("iceConnectionStateChange", function(event) {
					switch (peer.pc.iceConnectionState) {
					case "checking":
						connstate.innerText = "connecting to peer...";
					break;
					case "connected":
					case "completed": // on caller side
						vol.style.display = "block";
						connstate.innerText = "connection established";
					break;
					case "disconnected":
						connstate.innerText = "disconnected";
					break;
					case "failed":
						connstate.innerText = "connection failed";
					break;
					case "closed":
						connstate.innerText = "connection closed";
					break;
					}
				});
			}

			outerContainer.appendChild(vidCon);
			outerContainer.appendChild(textCon);
			remotes.appendChild(outerContainer);
			// If we're adding a new video we need to modify bootstrap so we
			// only get two videos per row.
			var remoteVideos = document.getElementById("remotes").getElementsByTagName("video").length;
			if (!(remoteVideos % 2)) {
				var spacer = document.createElement("div");
				spacer.className = "w-100";
				remotes.appendChild(spacer);
			}
		}
	});
	
	// If a user disconnects from chat, we need to remove their video feed.
	webrtc.on("videoRemoved", function(video, peer) {
		console.log("user removed from chat", peer);
		var remotes = document.getElementById("remotes");
		var el = document.getElementById("container_" + webrtc.getDomId(peer));
		if (remotes && el)
			remotes.removeChild(el.parentElement);
	});
	
	// If our volume has changed, update the meter.
	webrtc.on("volumeChange", function(volume, treshold) {
		showVolume(document.getElementById("localVolume"), volume);
	});
	
	// If a remote user's volume has changed, update the meter.
	webrtc.on("remoteVolumeChange", function(peer, volume) {
		showVolume(document.getElementById("volume_" + peer.id), volume);
	});
	
	// If there is a P2P failure, we need to error out.
	webrtc.on("iceFailed", function(peer) {
		var connstate = document.querySelector("#container_" + webrtc.getDomId(peer) + " .connectionstate");
		console.log("local fail", connstate);
		if (connstate) {
		connstate.innerText = "connection failed";
		fileinput.disabled = "disabled";
		}
	});

	// remote p2p/ice failure
	webrtc.on("connectivityError", function (peer) {
		var connstate = document.querySelector("#container_" + webrtc.getDomId(peer) + " .connectionstate");
		console.log("remote fail", connstate);
		if (connstate) {
			connstate.innerText = "connection failed";
			fileinput.disabled = "disabled";
		}
	});
}

var langModels = {
	"Arabic": "ar-AR_BroadbandModel",
	"Chinese": "zh-CN_BroadbandModel",
	"English": "en-US_BroadbandModel",
	"French": "fr-FR_BroadbandModel",
	"Japanese": "ja-JP_BroadbandModel",
	"Korean": "ko-KR_BroadbandModel",
	"Portuguese": "pt-BR_BroadbandModel",
	"Spanish": "es-ES_BroadbandModel"
}

var lang = document.location.href.split("?")[1].split("&")[1].split("=")[1];
var langModel = langModels[lang];

function speechToText(){
	console.log("fetching stt token")

	$.when($.get('/api/speech-to-text/token')).done(
		function (token) {
	        // the stream is what comes in from the microphone
	        stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
	           // it needs the token received from the server
	           token: token,
	           // which language model to use
	           model: langModel,
	           // and the outputElement is the html element defined with an id="speech" statement
	           outputElement: '#selfSpeech' // CSS selector or DOM Element
	         });
	         // if there's an error in this process, log it to the browser console.
	        stream.on('error', function(err) { console.log(err); });
        });
		$("#btn-stop").click( function() {
		console.log("stopping");
		stream.stop.bind(stream);
		});

}
