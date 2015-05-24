package main

import(
 "path/filepath"
 "fmt"
 "strings"	
)
var path = "i/";

func main() {
	fmt.Print(`
<!DOCTYPE html>
<html>
<head>
<title>agariomods.com skin server</title>
<link href='http://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: 'Pacifico', cursive;
	font-size: 1.2em;
    }
    div {
        font-family: 'Montserrat', sans-serif;
	box-shadow: 0px 0px 5px #888888;
	padding: 20px;	
	margin-top: 20px;
    }
    span {
	font-size: 3em;
    }
    h1 {
        font-family: 'Montserrat', sans-serif;
    }

</style>
</head>
<body>
<h1>agariomods.com skin server</h1>
<p><em>Thank you for using agariomods.</em></p>
<br><hr>
`);
	files, _ := filepath.Glob(path + "*")
	for _,basename := range files {
		name := strings.TrimSuffix(basename, filepath.Ext(basename))
		name = strings.Replace(name, path, "", -1)
		namenbsp := strings.Replace(name, " ", "&nbsp", -1)		
		fmt.Println("<div><img width=\"20%\" src=\"i/" +name+ ".png\" alt=\"" +  name+ "\"/><span>",namenbsp,"</span></div>");
	}

	fmt.Print(`
</body>
</html>
`);

}
