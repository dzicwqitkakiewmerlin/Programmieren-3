var os = require("os");
var Message = "Die Plattform ist :";

function main(){
    console.log(Message + os.platform())
}
main();