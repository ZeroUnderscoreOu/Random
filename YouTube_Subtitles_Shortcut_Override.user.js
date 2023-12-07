// ==UserScript==
// @name        YouTube Subtitles Shortcut Override
// @author      ZeroUnderscoreOu
// @version     1.0.4
// @icon        
// @description Allows changing the size of subtitles with numpad, while disabling default shortcuts.
// @namespace   https://github.com/ZeroUnderscoreOu/
// @match       https://www.youtube.com/*
// @run-at      document-idle
// @grant       none
// ==/UserScript==

/*
Notes:
I could think of only few ways to distinguish native events from synthetic ones; all "keydown" events have "composed: true", probably as a result of some YT script. So I'm using "cancelable" as one of the properties that I didn't set on my own events that makes them stand out.
Event listener is registered in capturing mode to override YT's listener. Otherwise YT gets priority and still does its thing if userscript is run at document-idle; document-start creates other issues like "movie_player" not existing.
Somehow YT uses "keyCode" to determine which key was pressed, even though it's considered deprecated and "key"/"code" should be used instead. This is the only event property that needs to be set but I added a few other for readability and just in case.
"keyCode" also leads to issues like media keys changing subtitle size.
*/

var M_P = document.getElementById("movie_player"); // video container

var KD_NS = new KeyboardEvent("keydown", { // NumpadSubtract - replacing with Minus
	keyCode: 173,
	code: "Minus",
	key: "-",
	bubbles: true
});
var KD_NA = new KeyboardEvent("keydown", { // NumpadAdd - replacing with Equal
	keyCode: 61,
	code: "Equal",
	key: "=",
	bubbles: true
});

function KD_Override(EvData) {
	switch (EvData.code) { // which key was pressed
		case "Minus":
		case "Equal":
			if (EvData.cancelable) { // avoid stopping script-generated events
				EvData.stopPropagation(); // but stopping default behavior
			};
			break;
		case "AudioVolumeMute": // blocking media keys (potentially relevant ones)
		case "AudioVolumeDown": // prevents subtitle font size change in some cases
		case "AudioVolumeUp": // see https://github.com/ZeroUnderscoreOu/Random/issues/1
		case "VolumeMute":
		case "VolumeDown":
		case "VolumeUp":
			EvData.stopPropagation();
			break;
		case "NumpadSubtract":
			M_P.dispatchEvent(KD_NS);
			break;
		case "NumpadAdd":
			M_P.dispatchEvent(KD_NA);
			break;
	};
};

document.addEventListener("keydown", KD_Override, true);
