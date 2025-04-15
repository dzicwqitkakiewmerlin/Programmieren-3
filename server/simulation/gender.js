//random return a gender
export function getGender(){
    const genders = ["Male", "Female", "Non-binary", "Genderqueer", "Agender", "Genderfluid"];
    const randomIndex = Math.floor(Math.random() * genders.length);
    return genders[randomIndex];
}

//TEMPLATE
// if(this.gender == "Male"){
//     if(this.counter == 1){
//         this.multiply();
//         this.counter = 0;
//     }
// }else if(this.gender == "Female"){
//     if(this.counter == 2){
//         this.multiply();
//         this.counter = 0;
//     }
// }else if(this.gender == "Non-binary"){
//     if(this.counter == 3){
//         this.multiply();
//         this.counter = 0;
//     }
// }else if(this.gender == "Genderqueer"){
//     if(this.counter == 4){
//         this.multiply();
//         this.counter = 0;
//     }
// }else if(this.gender == "Agender"){
//     if(this.counter == 5){
//         this.multiply();
//         this.counter = 0;
//     }
// }else if(this.gender == "Genderfluid"){
//     if(this.counter == 6){
//         this.multiply();
//         this.counter = 0;
//     }
// }
// this.counter++;
