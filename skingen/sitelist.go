package main

import(
 "path/filepath"
 "fmt"
 "strings"	
)
var path = "i/";

func main() {
	fmt.Print(`




<html>
	<head>
		<title>AGARIOMODS - SKINS</title>
		<link rel="shortcut icon" href="http://www.iconj.com/ico/o/x/oxfb9bqt6o.ico" type="image/x-icon" />
		<meta charset="utf-8">
  		<meta name="viewport" content="width=device-width, initial-scale=1">
  		<link href='http://fonts.googleapis.com/css?family=Ubuntu:700' rel='stylesheet' type='text/css'>
  		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
		<!--WEBSITE STYLES-->
			<style>
				/* BODY STYLE */
				body {
					background: rgba(16, 16, 16, 1);
					font-family: 'Ubuntu', sans-serif;
					padding: 10px;
					margin: 0px;
					background-image: url("http://i.imgur.com/rgXlmkc.png");
				}
				/* CONTENT STYLE */
				main {
					background: rgba(0, 0, 0, .6);
					color: rgba(218, 218, 218, 1);
					font-family: 'Ubuntu', sans-serif;
					padding: 0px;
					margin-left: auto;
					margin-right: auto;
					margin-bottom: auto;
					padding-left: 20px;
					max-width: 1000px;
				}
				.navigate{
					background: linear-gradient(rgba(215, 18, 162, 1),  rgba(76, 0, 153, 1));
				}
				#logo {
					vertical-align: middle;
					height: 30px;
				}
				/* INSTALL BUTTON STYLE */
				#ScriptButton {
					background-color: rgba(255, 140, 0, 0.3);
					border-radius: 25px;
					border: 5px solid rgba(255, 165, 0, 1);
					padding: 10px;
					color: rgba(255, 255, 255, 1);
					font-weight: 900;
					text-decoration: none;
				}
				#ScriptButton:hover {
					background-color: rgba(255, 215, 0, 0.7);
					border-radius: 25px;
					padding: 10px;
				}
				/* TEMPORARY FIX */
				#information {
					padding-top: 35px;
				}
				/* skins */
				div.skins { margin-top: 20px; }
				span.skins { font-size: 3em; margin-left: 30px;}
			</style>
		</head>
		<!--DIVISION MARKER: HEAD - BODY-->
		<body>
			<!--Navigation Links-->
			<nav class="navbar navbar-inverse navbar-fixed-top navigate">
			  <div class="container-fluid">
			    <div class="navbar-header">
				 <button type="button" class="navbar-toggle navbar-right btn-lg " data-toggle="collapse" data-target="#myNavbar" style="background-color: rgba(128, 128, 128, .75)">
				   <span class="icon-bar"></span>
				   <span class="icon-bar"></span>
				   <span class="icon-bar"></span>
				 </button>
				 <a class="navbar-brand"><img id="logo" src="http://i.imgur.com/vUa6ZqF.png"></a>
			    </div>
			    <div class="collapse navbar-collapse" id="myNavbar">
				 <ul class="nav navbar-nav">
				   <li><a href="http://agariomods.com/index.html">Home</a></li>
				   <li><a href="http://agariomods.com/mumble.html">Mumble</a></li>
				   <li><a href="http://agariomods.com/about.html">About</a></li> 
				   <li><a href="http://agariomods.com/links.html">Links</a></li> 
				  <li class="active"><a href="http://skins.agariomods.com">Skins</a></li>
				 </ul>
			    </div>
			  </div>
			</nav>
			<main id="information">
				<div id="information">


<h1>agariomods.com skin server</h1>
<p><em>Thank you for using agariomods.</em></p>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- skins -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6274246726682904"
     data-ad-slot="9200688950"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
`);
	files, _ := filepath.Glob(path + "*")
	for _,basename := range files {
		name := strings.TrimSuffix(basename, filepath.Ext(basename))
		name = strings.Replace(name, path, "", -1)
		namenbsp := strings.Replace(name, " ", "&nbsp", -1)
		if ((name != "dong") && (name != "fuckfacebook")) {
			fmt.Println("<div class=\"skins\"><img width=\"20%\" src=\"i/" +name+ ".png\" alt=\"" +  name+ "\"/><span class=\"skins\">",namenbsp,"</span></div>");
		}
	}

	fmt.Print(`
<div class="hidden-xs hidden-sm">
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- skins -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6274246726682904"
     data-ad-slot="9200688950"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>

				</div>
			</main>
		</body>
	</html>
`);

}
