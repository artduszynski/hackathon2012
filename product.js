var sys = require("sys"),  
    http = require("http"),  
    url = require("url"),  
    path = require("path"),  
    fs = require("fs");  
http.createServer(function(request, res) {  
    var uri = url.parse(request.url).pathname;  
    var filename = path.join(process.cwd(), uri);  
    fs.exists(filename, function(exists) {  
        if(!exists) {  
            res.sendHeader(404, {"Content-Type": "text/plain"});  
            res.write("404 Not Found\n");  
            res.close();  
            return;  
        }  
        fs.readFile(filename, "binary", function(err, file) {  
            if(err) {  
                res.sendHeader(500, {"Content-Type": "text/plain"});  
                res.write(err + "\n");  
                res.close();  
                return;  
            }  
            res.sendHeader(200);  
            res.write(file, "binary");  
            res.close();  
        });  
    });  
}).listen(1337, "127.0.0.1");
sys.puts("Server running at http://localhost:1337/");