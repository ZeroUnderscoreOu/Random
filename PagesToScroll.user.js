// ==UserScript==
// @name        PagesToScroll
// @author      ZeroUnderscoreOu
// @version     1.0.0
// @description Script shows how many pages you have to scroll to get to the end
// @namespace   https://github.com/ZeroUnderscoreOu/
// @include     *
// @run-at      document-idle
// @grant       none
// ==/UserScript==

var Pages = Math.ceil(document.documentElement.scrollHeight / document.documentElement.clientHeight - 1);
var Div = document.createElement("Div");
Div.style = `
	Position: Absolute;
	Width: 20%;
	Left: 10%;
	Top: 10%;
	Color: #FFFFFF;
	Background-Color: #000000C0;
	Font-Size: X-Large;
	Text-Align: Center;
`;
Div.textContent = `Pages to scroll: ${Pages}`;
Div.addEventListener("click",(Data)=>{Data.target.remove();});
document.body.append(Div);
