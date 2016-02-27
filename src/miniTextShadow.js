/*document.addEventListener("DOMContentLoaded", function(event) { 
    //your code to run since DOM is loaded and ready
});*/
function TextShadow(host){
	this.generator_markup="";//the html markup to create the generator
	function $(item){
		return item[0]=='#'?document.getElementById(item):item[0]=='.'?document.getElementsByClassName(item):document.getElementsByTagName(item);
	}
	function val(item){
		return $(item).value;
	}
	this.host_id=host;

}