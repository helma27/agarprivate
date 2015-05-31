var ourskins = "1up;8ball;LLhyy5H;agariomods.com;albania;android;anonymous;apple;atari;awesome;baka;bandaid;bane;baseball;basketball;batman;beats;bender;bert;bitcoin;blobfish;bobross;bobsaget;boo;boogie2988;borg;bp;breakfast;buckballs;burgundy;butters;byzantium;charmander;chechenya;chickfila;chocolate;chrome;cj;coca cola;cokacola;controless;converse;cornella;creeper;cyprus;czechrepublic;deadpool;deal with it;deathstar;derp;dickbutt;doge;doggie;dolan;domo;domokun;dong;donut;dreamcast;ebin;egg;egoraptor;egypt;epicface;expand;eye;facebook;fast forward;fastforward;fbi;fidel;finn;firefox;fishies;flash;florida;freeman;freemason;friesland;frogout;fuckfacebook;gaben;garfield;gaston;getinmybelly;getinthebox;gimper;github;giygas;gnomechild;gonzo;grayhat;halflife;halflife3;halo;handicapped;hap;hatty;hebrew;heisenburg;helix;hipsterwhale;hitler;honeycomb;hydro;iceland;ie;illuminati;imgur;imperial japan;imperialjapan;instagram;isaac;isis;isreal;itchyfeetleech;ivysaur;james bond;java;jew;jewnose;jimmies;kappa;kenny;kingdomoffrance;kingjoffrey;kirby;klingon;knightstemplar;knowyourmeme;kyle;ladle;lenny;lgbt;libertyy;liechtenstien;linux;love;luigi;macedonia;malta;mario;mars;maryland;masterball;mastercheif;mcdonalds;meatboy;meatwad;megamilk;mike tyson;mlg;moldova;mortalkombat;mr burns;mr.bean;mr.popo;n64;nasa;nazi;nick;nickelodeon;nipple;northbrabant;nosmoking;notch;nsa;obey;osu;ouch;pandaexpress;pedo;pedobear;peka;pepe;pepsi;pewdiepie;pi;pig;piggy;pika;pinkfloyd;pinkstylist;piratebay;pizza;playstation;poop;potato;quantum leap;rageface;rewind;rockstar;rolfharris;rss;satan;serbia;shell;shine;shrek;sinistar;sir;skull;skype;skyrim;slack;slovakia;slovenia;slowpoke;smash;snafu;snapchat;soccer;soliare;solomid;somalia;space;spawn;spiderman;spongegar;spore;spy;squirtle;starbucks;starrynight;stitch;stupid;superman;taco;teamfortress;tintin;transformers;triforce;trollface;tubbymcfatfuck;turkey;twitch;twitter;ukip;uppercase;uruguay;utorrent;voyager;wakawaka;wewlad;white  light;windows;wwf;wykop;yinyang;ylilauta;yourmom;youtube;zoella;zoidberg;kitty;electrokitty";

var gamejs = "", modBlocking = true;
var tester = document.getElementsByTagName("script");
var i = 0, main_out_url = "http://agar.io/main_out.js", discovered_mainouturl = 0;
var W = '';
var Ja = '';
var b = '';
var c3eg2 = '';

/* lets start to deal with regressions */
var test = 0;
var passed = 0;
var failed = 0;

/* begin folding in mike's code for mass graph */
var chart_update_interval = 10;
var chart = null;
var chart_data = [];
var chart_counter = 0;
var chart_s = '';
var chart_m = '';
var chart_G = '';
var chart_Na= '';
var chart_k = '';


$(document).ready(function() {
    $('body').append('\
<div id="chart-container" style="position:absolute; height:176px; width:300px; left:10px; bottom:34px"></div>\
<div id="chart-container-agariomods" style="position:absolute; height:20px; width:300px; left:10px; bottom:200px;">&nbsp;agariomods.com - modding <b>without</b> cheating</div>\
');
});
function ResetChart(){
    chart = null;
    chart_data.length = 0;
    chart_counter = 0;
    jQuery('#chart-container').empty();     
}
function GetRgba(hex_color, opacity){
    var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
    var matches = patt.exec(hex_color);
    return "rgba("+parseInt(matches[1], 16)+","+parseInt(matches[2], 16)+","+parseInt(matches[3], 16)+","+opacity+")";
}
function UpdateChart(mass, color)
{
    chart_counter++;
    if (chart_counter%chart_update_interval > 0) return;
        
    if (chart === null){
        chart = new CanvasJS.Chart("chart-container",{
            interactivityEnabled: false,
            title: null,
            axisX:{      
                valueFormatString: " ",
                lineThickness: 0,
                tickLength: 0
            },
            axisY:{
                lineThickness: 0,
                tickLength: 0,
                gridThickness: 2,
                gridColor: "white",
                labelFontColor: "white"
            },
            backgroundColor: "rgba(0,0,0,0.2)",
            data: [{
                type: "area",
                color: color,
                dataPoints: chart_data 
            }]
        });
    }
    chart_data.push({
        x: chart_counter,
        y: mass
    });
    chart.render();
    // Sorry but the CanvasJS is intrusive to gameplay. Developers will view source anyway.
    jQuery('.canvasjs-chart-credit').hide();
}

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
		offset = gamejs.search("..=\"poland;");
		Ja =  gamejs.substr(offset,2);
		offset = gamejs.search(".....src=\"skins");
		b = gamejs.substr(offset+2,1);
		offset = gamejs.search(".."+b+"..src");
		W = gamejs.substr(offset,1);
		var components = /strokeText\((.{1,14})\);/.exec(gamejs);
		c3eg2 = components[1];
		var components = /\((.)\=..x,.\=..y\)/.exec(gamejs);		
		chart_s = components[1];
		var components = /\(.\=(.).x,.\=..y\)/.exec(gamejs);
		chart_m = components[1];
		var components = /(.)\=Math.max\(.,..\(\)\);/.exec(gamejs);
		chart_G = components[1];
		var components = /.\=Math.max\(.,(..)\(\)\);/.exec(gamejs);
		chart_Na = components[1];
		var components = /(.)\[0\]\.name\&\&\(/.exec(gamejs);
		chart_k = components[1];
		console.log ("chartmod info: chart_m = "+chart_m+";  chart_s = "+chart_s+"; chart_G = "+chart_G+"; chart_Na = "+chart_Na+"; chart_k = "+chart_k);
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
	var script = document.createElement("script");
	script.src='//cdnjs.cloudflare.com/ajax/libs/canvasjs/1.4.1/canvas.min.js';
        document.head.appendChild(script);
	var tester = document.getElementsByTagName("head");
	var oldhtml = tester[0].innerHTML;
	oldhtml = oldhtml.replace('width:350px;', '');
	//	oldhtml = oldhtml.replace('top:50%;margin-right:-50%;transform:translate(-50%,-50%);', 'width:650px;');
	oldhtml = oldhtml.replace('-webkit-transform:translate(-50%,-50%);', '');
	oldhtml = oldhtml.replace('-ms-transform:translate(-50%,-50%);', '');
	oldhtml = oldhtml.replace('transform:translate(-50%,-50%);', '');
	oldhtml = oldhtml.replace('top:50%;left:50%;','margin:10px;');
	tester[0].innerHTML = oldhtml;
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
        $("#chart-container").on('mousedown', function(event){
                event.preventDefault();
        });
        $("#chart-container-agariomods").on('mousedown', function(event){
                event.preventDefault();
        });

}
function agariomodsRuntimePatches() {
        gamejs = gamejs.replace(';reddit;',';reddit;'+ourskins+';');
        gamejs = gamejs.replace(b+'=this.name.toLowerCase();', b+'=this.name.toLowerCase();var agariomods="";var ourskins = "'+ourskins+'";if(('+b+'.length >0) && (ourskins.split(";").indexOf('+b+')>-1)) {agariomods="http://skins.agariomods.com/i/"+'+b+'+".png";} else if ('+b+'.substring(0, 2) == "i/") {agariomods="http://i.imgur.com/"+this.name.substring(2)+".jpg";} else {agariomods="http://agar.io/skins/" + this.name.toLowerCase() + ".png";}');
        gamejs = gamejs.replace(W +'['+b+'].src="skins/"+'+b+'+".png"',W+'['+b+'].src=agariomods');
        gamejs = gamejs.replace("this._stroke&&b.strokeText("+c3eg2+");b.fillText("+c3eg2+")", "if (String(c).substring(0, 2) != \"i/\") {this._stroke&&b.strokeText("+c3eg2+");b.fillText("+c3eg2+")}");
        gamejs = gamejs.replace(b+"=this.name.toLowerCase();", b+"=this.name.toLowerCase(); if ("+b+".substring(0, 2) == \"i/\") {" +Ja+ "+="+b+";} ;");
	gamejs = gamejs.replace('('+chart_s+'='+chart_m+'.x', '(ResetChart(), '+chart_s+'='+chart_m+'.x');
	gamejs = gamejs.replace(chart_G+'=Math.max('+chart_G+','+chart_Na+'());', 'var current = '+chart_Na+'();'+chart_G+' = Math.max('+chart_G+', current);');
	gamejs = gamejs.replace('setValue("Score:','setValue("Current: " + ~~(current / 100) + "  High:');
	gamejs = gamejs.replace('24-10,b+10,34),','24, 300, 24),');
	gamejs = gamejs.replace('10-24-5));','10-24-5), ('+chart_k+' && '+chart_k+'[0] && UpdateChart(current/100, GetRgba('+chart_k+'[0].color, 0.4))));');
	console.log ("Begin regression testing of agariomods.com userscript.");
	testCondition((-1 != gamejs.indexOf(';reddit;'+ourskins)), test++, "add our skinlist to the original game skinlist.");
	testCondition((-1 != gamejs.indexOf('var agariomods="";var ourskins'  )), test++, "add check for which skin mode we are in. be it no skin, default skin, imgur skin, or an agariomods skin.");
	testCondition((-1 != gamejs.indexOf('else if ('+b+'.substring(0, 2) == "i/") {agariomods' )),test++,"add imgur check #1");
	testCondition((-1 != gamejs.indexOf( b+"=this.name.toLowerCase(); if ("+b+".substring(0, 2) == \"i/\") {" +Ja+ "+="+b+";} ;"  )), test++, "add imgur check #2.");
	testCondition((-1 != gamejs.indexOf(W+'['+b+'].src=agariomods')), test++, "add agariomods variable to replace src of image");
	testCondition((-1 != gamejs.indexOf("if (String(c).substring(0, 2) != \"i/\") {this._stroke")), test++, "add imgur check for hiding username when using imgur id");
	testCondition((-1 != gamejs.indexOf('(ResetChart(), '+chart_s+'='+chart_m+'.x')), test++, "add mikes call to resetchart");
	testCondition((-1 != gamejs.indexOf('var current = '+chart_Na+'();'+chart_G+' = Math.max('+chart_G+', current);')),  test++, "add mikes current score buffer");
	testCondition((-1 != gamejs.indexOf('setValue("Current: " + ~~(current / 100) + "  High:')),  test++, "add mikes current and high score cosmetics");
	testCondition((-1 != gamejs.indexOf('24, 300, 24),')),  test++, "add mikes resized score rectangle");
	testCondition((-1 != gamejs.indexOf('10-24-5), ('+chart_k+' && '+chart_k+'[0] && UpdateChart(current/100, GetRgba('+chart_k+'[0].color, 0.4))));')),  test++, "add mikes chart update and colour setting");
	console.log ("Testing complete, "+passed+" units passed and "+failed+" units failed.");
}
function testCondition (condition, id, comment) {
        if(condition) {
                console.log("test: #"+id+" PASSED - "+ comment);
                passed++;
        } else {
                console.log("test: #"+id+" FAILED - "+ comment);
		failed++;
        }
}


function agariomodsRuntimeHacks() {
//	jQuery('#helloDialog').css({left: 'auto;'});
	jQuery('#helloDialog').css({margin: '0px'});
	jQuery('#helloDialog').css({marginLeft: 'auto'});
	jQuery('#helloDialog').css({marginRight: 'auto'});
	var nodeDiv = document.createElement("div");
	$( document ).ready(function() {
		hd = document.getElementById("helloDialog");
		cachedhd = hd.innerHTML;
		hd.innerHTML = cachedhd.replace("<center>Agar.io</center>", "<a target=\"_blank\" style=\"position:absolute; padding-left:520px;top:-10px; z-index: -1; height:200px;\" href=\"https://www.reddit.com/r/Agario/\"><img src=\"http://i.imgur.com/TkTWOrc.png\" height=\"200px\"/></a>");
	});
	document.getElementById("nick").placeholder = "agariomods.com";
	nodeDiv.id = "includedContent";
	nodeDiv.style.width = "500px"
	nodeDiv.style.backgroundColor = "#000000";
	nodeDiv.style.zIndex = 9999999999;
	nodeDiv.style.position = "relative";
	nodeDiv.style.padding = "8px";
	nodeDiv.style.borderRadius = "5px";
	nodeDiv.style.color = "#dddddd";
	nodeDiv.style.margin = "10px";
	nodeDiv.innerHTML += "\
	";
	jQuery('#region').parent().get(0).appendChild(document.createElement("br"));
	jQuery('#region').parent().get(0).appendChild(nodeDiv);
	var selector = jQuery('#region');
	var playBtn = jQuery('#playBtn');
	var nodeInput = document.createElement("input");
	var nodeSpan = document.createElement("span");
	var nodeBr = document.createElement("br");
	var nodeLinks = document.createElement("div");
	nodeLinks.innerHTML = "Our <a href='http://skins.agariomods.com' target='_blank'>Skins browser</a> - <a href='http://forum.agariomods.com' target='_blank'>NEW forum</a> - <a href='http://chat.agariomods.com' target='_blank'>Chatroom</a> - <a href='http://agariomods.com/mumble.html' target='_blank'>Mumble</a> - <a href='http://agariomods.com' target='_blank'>Website</a> - <a href='http://agariomods.com/help.html' target='_blank'>Help me!</a>";
	nodeLinks.style.position = "absolute";
	nodeLinks.style.top = "5em";

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
	jQuery(playBtn).parent().get(0).appendChild(nodeLinks);
	jQuery(playBtn).parent().get(0).appendChild(nodeInput);
	jQuery(playBtn).parent().get(0).appendChild(nodeSpan);
	jQuery(playBtn).parent().get(0).appendChild(nodeBr);
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
			jQuery('#includedContent').html("v1.8.1: <font color=\"yellow\">Thanks to intel and forzero for merging in 250 skins from reddit. We must also thank the excellent <a target=\"_blank\" href=\"https://www.reddit.com/r/Agario/comments/37vc98/i_added_a_realtime_graph_of_mass_over_time_i/\">/u/mikeyk730</a>  for allowing us to merge in this brilliant mass-graph mod!</font>\
<br><br>Here is the IP address of the server you are connected to currently, pass it to your friends for team playing.<h1>" + data.replace('ws://', '') + "</h1>\
                Get IP from friend.\
                Put in box below.\
                Press the swirly icon.\
                <br><b>Note:</b> Check with your friend to see whos #1 on the leaderboard\
        <div style=\"background-color: #ffffff; color: #000000; padding: 2px; margin: 0px;\">\
                <small><b>Disable ad blockers</b>&nbsp;- They are breaking the game and our modifications in random and unexpected ways.</small>\
        </div>\
");
		} else {
			console.log("HAXXED: connecting to " + jQuery('#iphack').val() + "(ignoring: " + data + ")");
			newWebSocket = new window.WebSocket_original("ws://" + jQuery('#iphack').val());
			jQuery('#includedContent').html("<h3>Connected to " +  jQuery('#iphack').val() + "</h3><br>Check leaderboard with your friend to ensure you are both on the exact world on the sameserver.<br><br>If you cannot see the same people in the leaderboard as your friend, press the swirly icon next the ip box to try another world on the same game server.");
        	}
        	return newWebSocket;
	};
})(window);
