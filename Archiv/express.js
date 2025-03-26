const express = require("Express");
const app = express();
app.use(express.static("main"));
app.get("/", function(req, res){
   // res.send("Hello world");
   res.redirect("index.html");
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});

// app.get("/name/:name", function(req, res){
//    const name = req.params.name;
//    res.send("<h1>Hello " + name +"</h1>");
// });

// app.get("/google", function(req, res){
//    res.redirect('https://google.com')
// });

// app.get("/google/:search", function(req, res){
//    const research = req.params.search;
//     res.redirect('https://google.com/search?q=' + research);
// });

// app.get("/404", function(req, res){
//    res.send('<h1>404' + "<h2>Fehler, nicht gefunden")
// });


// app.get("/live", function(req, res){
//    res.redirect("index.html");
// });

// app.get("/*", function(req, res){
//    res.redirect('./404')
// });
