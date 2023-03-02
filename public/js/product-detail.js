const button = document.querySelector(".add-to-cart")
const done = document.querySelector(".done")

let added = false;
button.addEventListener('click',() => {
   if(added){
      done.style.transform = "translate(-110%) skew(-40deg)";
      added = false;
   }
   else{
      done.style.transform = "translate(0px)";
      added = true;
   }
});