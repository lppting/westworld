$(function(){
	function setTime(){
    var d = new Date();
    var H = d.getHours();
    var M = d.getMinutes();
    var S = d.getSeconds();
    if(H <= 9){
	    H = "0" + H;
    }

    if(M <= 9){
	    M = "0" + M;
    }

    if(S <= 9){
	    S = "0" + S;
    }
    timer.innerHTML=H+':'+M+':'+S;
    }
    $(setTime)
    setInterval(setTime,1000);
})
