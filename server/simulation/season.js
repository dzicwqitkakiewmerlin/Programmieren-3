const month = new Date().getUTCMonth();
function month(){
    if(month <= 2){
        return 0;
    }else if(month <= 5){
        return 1;
    }else if(month <= 8){
        return 2;
    }else if(month <= 11){
        return 3;
    }
}