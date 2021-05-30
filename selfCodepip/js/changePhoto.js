var i = 0;
function nextImg(){
    if(i==5){
        i=1;}
    i++;
    var next = document.getElementById("nImg");
    next.src = "images/"+i+".jpg";
}
function lastImg(){
    if(i==0){
        i=6;
    }
    i--; 
    var last = document.getElementById("nImg");
    last.src = "images/"+i+".jpg";
}