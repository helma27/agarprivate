var gamejs = "", modBlocking = true;
var tester = document.getElementsByTagName("script");
var i = 0, main_out_url = "http://agar.io/main_out.js", discovered_mainouturl = 0;
var W = '';
var Ja = '';

for (i=0; i<tester.length; i++ ){
	src = tester[i].src;
	if (src.substring(0, main_out_url.length ) == main_out_url) {
		discovered_mainouturl = src.replace("http://agar.io/","");
	}
}

if(discovered_mainouturl != 0) {
	httpGet(discovered_mainouturl, function(data) {
		gamejs = "window.agariomods = " + data.replace("socket open","socket open (agariomods.com mod in place)");
		gamejs = gamejs.replace(/\n/g, "");
		offset = gamejs.search("..b..src");
		W = gamejs.substr(offset,1);
		offset = gamejs.search("..=\"poland;");
		Ja =  gamejs.substr(offset,2);
		agariomodsRuntimeInjection();
	});
}

// XMLHttp, because apparently raven is doing funky stuff with jQuery
function httpGet(theUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, true);
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			callback(xmlHttp.responseText);
		}
	};
}
function agariomodsRuntimeInjection() {
	var tester = document.getElementsByTagName("html");
	var oldhtml = tester[0].innerHTML;
	var script = document.createElement("script");
	agariomodsRuntimePatches();
	script.innerHTML = gamejs;
	document.head.appendChild(script);
	agariomodsRuntimeHacks();

	window.onbeforeunload = function() {
		return 'Are you sure you want to quit agar.io?';
	};
	// as a trackpad user, this fix should reduce the frequency at which I am killed.
	$("#canvas").on('mousedown', function(event){
		event.preventDefault();
	});
	/* added an advert unit to the landing page as we now have server rental to consider */
	var iframe = document.createElement("iframe");
	iframe.id = "agariomods";
	iframe.style.width = "468px";
	iframe.style.height = "20px";
	iframe.style.zIndex = 3;
	iframe.style.position = "relative";
	iframe.style.padding = "0px";
	iframe.style.margin = "0px";
	iframe.style.left = "0px";
	iframe.style.overflow = "hidden";
        iframe.style.border = "0px";
        iframe.src = "http://agariomods.com/adverts.mod.js.html";
	var overlay = document.getElementById("includedContent");
	overlay.appendChild(iframe);
}
function agariomodsRuntimePatches() {
	//s
	var ourskins = "711;agariomods;bobross;bobsaget;boogie2988;borg;chrome;controless;deathstar;doggie;dong;electronoob;facebook;fishies;fuckfacebook;gimper;github;hitler;hydro;instagram;isis;itchey;itchyfeetleech;klingon;knicks;love;nazi;notch;orange;pepe;pewdiepie;pinkfloyd;pinkstylist;piratebay;quantum leap;rhcp;rockets;rolfharris;slack;snapchat;space;spawn;spurs;uppercase;voyager;white  light;youtube;zoella";
	gamejs = gamejs.replace(';reddit;',';reddit;'+ourskins+';');
	gamejs = gamejs.replace(W + '[b]=new Image,'+W+'[b].src="skins/"+b+".png"',W +'[b]=new Image,'+W+'[b].crossOrigin = "Anonymous",'+W+'[b].src="skins/"+b+".png"');
	gamejs = gamejs.replace('b=this.name.toLowerCase();', 'b=this.name.toLowerCase();var agariomods="";var ourskins = "'+ourskins+'";if((b.length >0) && (ourskins.indexOf(b)>-1)) {agariomods="http://skins.agariomods.com/i/"+b+".png";} else if (b.substring(0, 2) == "i/") {agariomods="http://i.imgur.com/"+this.name.substring(2)+".jpg";} else {agariomods="http://agar.io/skins/" + this.name.toLowerCase() + ".png";}');
	gamejs = gamejs.replace(W +'[b].src="skins/"+b+".png"',W+'[b].src=agariomods');
	gamejs = gamejs.replace("this._stroke&&b.strokeText(c,3,e-g/2);b.fillText(c,3,e-g/2)", "if (String(c).substring(0, 2) != \"i/\") {this._stroke&&b.strokeText(c,3,e-g/2);b.fillText(c,3,e-g/2)}");
	gamejs = gamejs.replace("b=this.name.toLowerCase();", "b=this.name.toLowerCase(); if (b.substring(0, 2) == \"i/\") {" +Ja+ "+=b;} ;");
	//turn on mass by default.
	gamejs = gamejs.replace("wa=!1", "wa=!0"); 
}
function agariomodsRuntimeHacks() {
	jQuery('#helloDialog').css({top: '-100px'});
	jQuery('#helloDialog').css({margin: '5px auto'});
	var nodeDiv = document.createElement("div");
	$( document ).ready(function() {
		hd = document.getElementById("helloDialog");
		cachedhd = hd.innerHTML;
		hd.innerHTML = cachedhd.replace("<center>Hello</center>", "<a target=\"_blank\" style=\"position:absolute; padding-left:335px; top:-10px; z-index: -1; height:200px;\" href=\"https://www.reddit.com/r/Agario/\"><img src=\"http://i.imgur.com/TkTWOrc.png\" height=\"200px\"/></a>");
	});
	document.getElementById("nick").placeholder = "name";
	$( document ).ready(function() {
		nh = document.getElementById("overlays");
		cachednh = nh.innerHTML;
		nh.innerHTML = cachednh.replace("<p>Type your nick or leave it empty:</p>", "<a target=\"_blank\" href='http://skins.agariomods.com'>click here for list of agariomods skins</a>");
	});
	nodeDiv.id = "includedContent";
	nodeDiv.style.width = "700px"
	nodeDiv.style.backgroundColor = "#000000";
	nodeDiv.style.zIndex = 9999999999;
	nodeDiv.style.position = "relative";
	nodeDiv.style.padding = "5px";
	nodeDiv.style.left = "-170px";
	nodeDiv.style.borderRadius = "5px";
	nodeDiv.style.color = "#dddddd";
	nodeDiv.innerHTML = "<small>Version 1.7.6&nbsp;&nbsp;The very best in skin modding</small>";
//	nodeDiv.innerHTML += "<p><a target=\"_blank\" href=\"http://forum.agariomods.com/\"><img width=\"15px\" src=\"http://i.imgur.com/oWFWwDo.png\">&nbsp</a><i>Get your friends using this script so they can see your new avatar too!</i><p><font color=\"yellow\"><b>1:</b> upload pic to imgur.com, <b>2:</b> get the id of img, <b>3:</b> type i/ followed by the id. ex: i/rIWgY2u</font></p>";
	nodeDiv.innerHTML += "<b>connections steps</b>";
	nodeDiv.innerHTML += "\
	<ul>\
		<li>1: Get ip address from friend.</li>\
		<li>2: Put it in text box below.</li>\
		<li>3: Press the swirly icon next to it.</li>\
		<p><b>Note:</b> Check with your friend to see whos #1 on the leaderboard</p>\
	</ul>\
	<div style=\"background-color: #ffffff; color: #000000; padding: 2px; margin: 0px;\">\
		<small><b>Disable ad blockers</b>&nbsp;- They are breaking the game and our modifications in random and unexpected ways.</small>\
	</div>\
	<center><a href=\"http://skins.agariomods.com\" target=\"_blank\"><img src=\"http://i.imgur.com/WvIcNhw.png\"/></a></center>\
	";
	jQuery('#region').parent().get(0).appendChild(document.createElement("br"));
	jQuery('#region').parent().get(0).appendChild(nodeDiv);
	var selector = jQuery('#region');
	var playBtn = jQuery('#playBtn');
	var nodeInput = document.createElement("input");
	var nodeSpan = document.createElement("span");
	var nodeBr = document.createElement("br");
	nodeSpan.className = "glyphicon glyphicon-refresh";
	nodeSpan.style.fontSize = "1.5em";
	nodeSpan.style.cssFloat = "left";
	nodeSpan.style.paddingTop = "5px";
	nodeSpan.style.paddingLeft = "15px";
	nodeSpan.addEventListener("click", function (e) {
		if (modBlocking == false) {
                        //jQuery('#region').style.height = "0px";
                        jQuery('#region').hide();
                        //jQuery('#gamemode').style.height = "0px";
                        jQuery('#gamemode').hide();
			console.log ("clicked refresh");
			var oldregionval = jQuery('#region').val;
			jQuery('#region').val("EU-London");
			jQuery('#region').change();
			jQuery('#region').val("SG-Singapore");
			jQuery('#region').change();
			jQuery('#region').val(oldregionval);
			jQuery('#region').change();
			jQuery('#gamemode').change();
			//jQuery(this).fadeOut(100).fadeIn(100);
		}
	});
	nodeInput.className = "form-control";
	nodeInput.id = "iphack"
	nodeInput.style.width = "85%";
	nodeInput.style.cssFloat = "left";
	nodeInput.style.cssClear = "right";
	nodeInput.style.border = "2px solid green";
	nodeInput.placeholder = "Alternative server ip:port here.";
	jQuery(playBtn).parent().get(0).appendChild(nodeBr);
	jQuery(playBtn).parent().get(0).appendChild(nodeInput);
	jQuery(playBtn).parent().get(0).appendChild(nodeSpan);
	jQuery('#iphack').change(function() {
		if (jQuery('#iphack').val() == "") {
			modBlocking = true;
		}
		modBlocking = false;
	});
	jQuery('#playBtn').off();
	$('.btn-needs-server').prop('disabled', true);
	jQuery('#playBtn').click(function() {
		setNick(document.getElementById('nick').value);
		return false;
	});
}

(function(window) {
	var WebSocket_original = window.WebSocket;
	window.WebSocket_original = WebSocket_original;
	var newWebSocket = 0;
	window.WebSocket = function(data) {
		if (modBlocking == true) {
			newWebSocket = new window.WebSocket_original(data);
			jQuery('#includedContent').html("Here is the IP address of the server you are connected to currently, pass it to your friends for team playing. <h3>" + data.replace('ws://', '') + "</h3>&nbsp;");
		} else {
			console.log("HAXXED: connecting to " + jQuery('#iphack').val() + "(ignoring: " + data + ")");
			newWebSocket = new window.WebSocket_original("ws://" + jQuery('#iphack').val());
			jQuery('#includedContent').html("<h3>Connected to " +  jQuery('#iphack').val() + "</h3><br>Check leaderboard with your friend to ensure you are both on the exact world on the sameserver.<br><br>If you cannot see the same people in the leaderboard as your friend, press the swirly icon next the ip box to try another world on the same game server.");
        	}
        	return newWebSocket;
	};
})(window);
