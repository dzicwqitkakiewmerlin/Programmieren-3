const month = new Date().getUTCMonth();
export let season = 0; // 0 = winter, 1 = spring, 2 = summer, 3 = autumn
export function nowmonth(){
    //winter
    if(month <= 2){
        return season = 0;
    //spring
    }else if(month <= 5){
        return season = 1;
    //summer
    }else if(month <= 8){
        return season = 2;
    //autumn
    }else if(month <= 11){
        return season= 3;
    }
}