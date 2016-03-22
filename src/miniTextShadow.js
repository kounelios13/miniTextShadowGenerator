"use strict";
var __version__='1.0.1';
function isChainable(name){
	name=name[0]=='.'?name.slice(1).split("(")[0]:name.split("(")[0];//remove '.' and "(" and ")"
	var tools={"activateGenerator":true,"deactivateGenerator":true,"setAxisValues":true,"resetGenerator":true,"addToFavourites":true,"removeFavourites":true,"getId":false,"getFavourites":false,
	"showFavourites":true,"getBackup":false,"restoreBackup":false};
	return tools[name] != undefined ?tools[name]:false;//if the key does not exist in the above dictionary return  false else return its value
}
function TextShadow(args){
	function val(o){return $(o).val();}
	function abs(a){return Math.abs(a);}
	var self=this;
	var host=null;
	self.generator_markup=""+
	"<div class='text-shadow-container'> "+
		"<div class='panel panel-primary'>"+
			"<div class='panel-heading text-center'>Text shadow Generator</div>"+
			"<div class='panel-body'>"+
			"<div class='row text-center'> "+
				"<div class='col-md-4'> "+
					"<h3 class='text-info'>X-axis</h3> "+
					"<input type='range' class='text-shadow-sliders x-axis' min='-100' max='150' value=0>"+
				"</div> "+
				"<div class='col-md-4'>"+
					" <h3 class='text-info'>Y-axis</h3> "+
					"<input type='range' class='text-shadow-sliders y-axis' min='-100' max='150' value=0> "
				+"</div>"
				+"<div class='col-md-4'>"+
					"<h3 class='text-info'>Blur</h3>"+
					"<input type='range' class='text-shadow-sliders blur' min='0' max='10' step='0.1' value='0'> "+
				"</div>"+
			"</div>"+
			" <div class='row text-center'> <div class='col-md-12'> <h3 class='text-shadow-output'>Shadow is applied here</h3> </div> </div> "+
			"<div class='row text-center'> "+
			"<div class='col-md-3'>"+
				"<h3 class='text-info'>Red</h3> "+
				"<input type='range' class='text-shadow-color-sliders' min='0' max='255' step='1' value='0'> "+
			" </div>"+
			"<div class='col-md-3'> "+
				" <h3 class='text-info'>Green</h3> "+
				" <input type='range' class='text-shadow-color-sliders' min='0' max='255' step='1' value='0'>"+
			" </div> "+
			" <div class='col-md-3'> "+
				"<h3 class='text-info'>Blue</h3> "+
				" <input type='range' class='text-shadow-color-sliders' min='0' max='255' step='1' value='0'> "+
			" </div> "+
			"<div class='col-md-3'> "+
				" <h3 class='text-info'>Opacity</h3> "+
				"<input type='range' class='text-shadow-color-sliders opacity' min='0' max='1' step='0.1' value='1'> "+
			"</div>"+
			"</div><!-- /row -->"+
		" </div> <!-- /panel-body --> "+
			" <div class='panel-heading text-center text-shadow-code-output'>text-shadow:0px 0px rgb(0,0,0);</div>  "+
		"</div>"+
	"</div>";
	self.host_id=null;
	if(typeof args != 'string' || !args || args[0]=='.' || !args[0]=="#")
		throw new Error("Invalid id!!!"+args);
	else
		self.host_id=host=args;
	self.shadow_code="none";
	self.content_backup=null;
	self.favourites=[];
	self.getId=function(){
		return self.host_id;
	};
	var render=function(){
		if(host != null && host[0]=='#')
			$(document).on("ready",function(){
				self.content_backup=$(host).html();
				$(host).html(self.generator_markup);
			});
		return self;
	};
	self.getBackup=function(){
		return self.content_backup;
	}
	self.restoreBackup=function(destination){
		var backup=self.getBackup();
		if(!destination)
			throw new Error("Wrong destination");
		//Detect if the user wants to restore the backup into multiple positions in the page
		var isClass=destination[0]=='.';
		if(isClass){
			var answer=confirm("You are going to create duplicates of your backed content.Are you sure you want to continue");
			if(answer)
				$(destination).html(backup);
		}
		else
			$(destination).html(backup);
		return self;
	};
	self.getCode=function(){
		return self.shadow_code;
	};
	self.activateGenerator=function(){
		$(document).ready(function(){
			$(host).on("mousemove touchmove","input[type=range]",function(){
				var sliders=$(".text-shadow-sliders");
				var colors=$(".text-shadow-color-sliders");
				//Create a text shadow code with default color(I think black)
				var code=val(sliders[0])+"px "+val(sliders[1])+"px ";
				//Now let's see if the user applied blur
				if(val(sliders[2]) != '0')
					code+=val(sliders[2])+"px ";//leave a whitespace to add the color
				//Determine the color of the shadow_code and its mode(rgb or rgba)
				var isRgba=val(colors[3]) != '1';
				var color=isRgba?"rgba("+val(colors[0])+","+val(colors[1])+","+val(colors[2])+","+val(colors[3])+")":"rgb("+val(colors[0])+","+val(colors[1])+","+val(colors[2])+")";
				code+=color;
				self.shadow_code=code;
				$(".text-shadow-output").css("text-shadow",code);
				$(".text-shadow-code-output").text("text-shadow:"+code+";");
			});
		});
		return self;
	};
	self.deactivateGenerator=function(){
		$(host).off();
		return self;
	};
	self.setAxisValues=function(limit,value){
		var sliders=$(host+" .text-shadow-sliders");
		if(isNaN(value) || !value || !limit)
			throw new Error("An error occured.");
		var value=abs(value);
		switch(limit.toUpperCase()){
			//we use for loop because we do not want to select every single slider
			case "MIN":
				for(var i=0;i<sliders.length-1;i++)
					$(sliders[i]).prop("min",value * -1);
				break;
			default:
				for(var i=0;i<sliders.length-1;i++)
					$(sliders[i]).prop("max",value);
		}//switch
		return self;
	};
	self.resetGenerator=function(){
		$(host+" .text-shadow-sliders").val(0);
		$(host+" .text-shadow-color-sliders").val(0);
		$(host+" .opacity").val(1);
		self.shadow_code="0px 0px rgb(0,0,0)";
		$(host+ " .text-shadow-code-output").text("text-shadow:"+self.shadow_code+";");
		$(host+ " .panel .text-shadow-output").css("text-shadow","none");
		return self;
	};
	self.addToFavourites=function(append){
		var code=self.getCode();
		//Checkif the current shadow is in the favourites list
		//If it is not add it
		if(self.favourites.indexOf(code)== -1 && code != "none")
			self.favourites.push(code);
		return self;
	};
	self.getFavourites=function(){
		return self.favourites;
	};
	self.removeFavourites=function(){
		var del;
		if( del=confirm("Are you sure you want to erase your favourites?"))
			self.favourites.length=0;
		return self;
	};
	self.downloadFavourites=function(){
		var file="/********\n";
		var items=self.getFavourites();
		if(items.length<1)
			return "No favourites found";
		for(var i=0;i<items.length;i++)
			file+="text-shadow:"+items[i]+";\n";
		file+="**************\n";
		try{
			saveAs(new Blob([file], {type: "text/plain;charset=utf-8"}),"favourites.css");
		}
		catch(e){
			alert("Filesaver is missing!!!");
		}
	};
	self.showFavourites=function(){
		var index=10;
		var favourites=self.getFavourites();
		var total=favourites.length;
		if(total<1)
			bootbox.alert("No favourites  to show!!!");
		else{
			function renderlist(){
				var ul="<ul class='list-group fix'>";
				var carrets="<div class='col-md-12 text-center'><div class='btn-group'>"
				+"<div class='btn btn-info show_less'>Show less</div>"
				+"<div class='btn btn-success download_button'>Download Favourites"
				+"<span class='pull-right glyphicon glyphicon-download-alt' style='margin-left:4px'></span></div>"
				+"<div class='btn btn-info show_more'>Show more</div>"
				+"</div></div>";
				var max_items=total > 9?10:total;//Wanna show the first 10 items.If there are less than 10 don't show the first 10
				for(var i=0;i<max_items;i++)
					ul+="<li class='list-group-item favourite_item'>text-shadow:"+favourites[i]+";</li>";
				ul+="</ul>"+carrets;
				return ul;
			}
			bootbox.alert(renderlist());
			$('.modal-body').on("click",".download_button",self.downloadFavourites);
			$(".list-group").on("click",".list-group-item",function(){
				$(".list-group li").removeClass('active');
				//in progress.............................
				var current_shadow=$(this).text();
				var values=current_shadow.split(":")[1];
				var colors=values.split("(")[1].split(")")[0];
				var shadow_values=values.split("(")[0];
				shadow_values=shadow_values.match(/\d+/g);
				var shadow_sliders=$('.text-shadow-sliders');
				for(var i=0;i<shadow_sliders.length;i++)
					$(shadow_sliders[i]).val(shadow_values[i]);
				$(this).addClass('active');
			});
			$(".show_less").on("click",function(){
				"use strict";
				if(index==0)
					return;
				var min_value=index>9?index-10:0;
				var selected_items=favourites.slice(min_value,index);
				var list="";
				for(var i=0,max=selected_items.length;i<max;i++)
					list+="<li class='list-group-item'>text-shadow:"+selected_items[i]+";</li>";
				index=min_value;
				$('.fix').html(list);
				console.log(selected_items);
			});
			$(".show_more").on("click",function(){
				"use strict";
				if(index>=favourites.length)
					return;//max items displayed so exit the function
				var current_list="";
				var total=favourites.length;
				var diff=total-index;//find how many items there are to display between the current index
				//and the total amount of favourites
				var end;//the item to stop at
				if(diff > 9)
					end=index+10;
				else
					end=index+diff;
				for(var i=index;i<end;i++)
					current_list+="<li class='list-group-item'>text-shadow:"+favourites[i]+";</li>";
				index=end;//The index to begin display more/less from
				$(".fix").html(current_list);
			});
		}
		return self;
	};
	//After everything is ok render the app
	render();
}
