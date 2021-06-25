document.querySelector(".comp").style.height= screen.height*0.4+"px";
document.querySelector(".comp").style.width= screen.width*0.4+"px";
document.querySelector(".code").style.height=screen.height*0.3+"px";
document.querySelector(".code").style.width= screen.width*0.85+"px";
function compile() {
	document.querySelector(".comp").srcdoc=document.querySelector(".code").value+"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
}
