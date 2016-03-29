"use strict";
var generators=[];//Keep track of all TextShadow objects in a page
function isChainable(name){
	name=name[0]=='.'?name.slice(1).split("(")[0]:name.split("(")[0];//remove '.' and "(" and ")"
	var tools={"activateGenerator":true,"deactivateGenerator":true,"setAxisValues":true,"resetGenerator":true,
	"addToFavourites":true,"removeFavourites":true,"getId":false,"getFavourites":false,
	"getAllFavourites":false,"showFavourites":true,"getBackup":false,"restoreBackup":false,"delete":false};
	return tools[name] != undefined ?tools[name]:false;//if the key does not exist in the above dictionary return  false else return its value
}
/**********'/'
Errors to throw:
1.Host is is body
2.Filesaver.js is not present or cannot be used
3.Trying to return $().val() of a number instead of a node that contains a number
4.Invalid host id
5.Invalid destination to restore backup
/**********/
function TextShadow(args,buttons){
	function val(o){
		if(!isNaN(o))
			throw new Error("The item that you passed as argument is a number not a node");
			return $(o).val();
	}
	function abs(a){return Math.abs(a);}
	var self=this;
	var host=null;
	self.host_id=null;
	if(typeof args != 'string' || !args || args[0]=='.' || !args[0]=="#")
		throw new Error("Invalid id!!!"+args);
	else if (args=='body')
		throw new Error("Body can't be used as container!!!");
	else
		self.host_id=host=args;
	var button_list={
		0:"<div class='btn btn-primary activate'>Activate Generator</div>",
		1:"<div class='btn btn-primary deactivate'>Deactivate Generator</div>",
		2:"<div class='btn btn-warning reset'>Reset Generator</div>",
		3:"<div class='btn btn-primary add'>Add to Favourites</div>",
		4:"<div class='btn btn-primary show'>Show Favourites</div>",
		5:"<div class='btn btn-danger remove'>Remove Favourites</div>",
		 //6:"<div class='btn btn-info'></div>"
	};
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
			"</div><!-- /row -->";
			//Let's see if we have to add default buttons.If the user wants to add default
			//buttons they won't have to create extra buttons their own
			if(typeof buttons != 'object' && buttons)
				throw new Error("The list of the default buttons has to be an array not a "+typeof buttons);
			if(buttons && typeof buttons=='object'){
				var custom_btn="<div class='btn-group custom-buttons'>";
				for(var i=0;i<buttons.length;i++){
					var item=buttons[i];
					if(button_list[item])
						custom_btn+=button_list[item]+"\n";
				}
				self.generator_markup+=custom_btn+"</div>";
			}
			self.generator_markup+=""
			+"</div> <!-- /panel-body --> "+
			" <div class='panel-heading text-center text-shadow-code-output'>text-shadow:0px 0px rgb(0,0,0);</div>  "+
		"</div>";
	"</div>";
	var code="none";
	self.content_backup=null;
	self.favourites=[];
	self.getId=function(){
		return self.host_id;
	};
	var render=function(){
		//body can't be used as container
		//because if multiple generators are present
		//we won't be able to properly target the sliders of each generator
		if(host != null && host[0]=='#')
			$(document).on("ready",function(){
				self.content_backup=$(host).html();
				$(host).html(self.generator_markup);
				if(buttons){
					$(host+" .activate").on("click",self.activateGenerator);
					$(host+" .deactivate").on("click",self.deactivateGenerator);
					$(host+" .reset").on("click",self.resetGenerator);
					$(host+" .add").on("click",self.addToFavourites);
					$(host+" .show").on("click",self.showFavourites);
					$(host+" .remove").on("click",self.removeFavourites);
				}
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
			bootbox.confirm("You are going to create duplicates of your backed content.Are you sure you want to continue",function(answer){
				if(answer)
					$(destination).html(backup);
			});
		}
		else
			$(destination).html(backup);
		return self;
	};
	self.getCode=function(){
		return code;
	};
	self.activateGenerator=function(){
		$(document).ready(function(){
			$(host).on("mousemove touchmove","input[type=range]",function(){
				var host=self.getId();
				var sliders=$(host+" .text-shadow-sliders");
				var colors=$(host+" .text-shadow-color-sliders");
				//Create a text shadow code with default color(I think black)
				code=val(sliders[0])+"px "+val(sliders[1])+"px ";
				//Now let's see if the user applied blur
				if(val(sliders[2]) != '0')
					code+=val(sliders[2])+"px ";//leave a whitespace to add the color
				//Determine the color of the shadow_code and its mode(rgb or rgba)
				var isRgba=val(colors[3]) != '1';
				var color=isRgba?"rgba("+val(colors[0])+","+val(colors[1])+","+val(colors[2])+","+val(colors[3])+")":"rgb("+val(colors[0])+","+val(colors[1])+","+val(colors[2])+")";
				code+=color;
				$(host+" .text-shadow-output").css("text-shadow",code);
				$(host+" .text-shadow-code-output").text("text-shadow:"+code+";");
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
		code="0px 0px rgb(0,0,0)";
		$(host+ " .text-shadow-code-output").text("text-shadow:"+code+";");
		$(host+ " .panel .text-shadow-output").css("text-shadow","none");
		return self;
	};
	self.addToFavourites=function(){
		//Checkif the current shadow is in the favourites list
		//If it is not add it
		if(self.favourites.indexOf(code)== -1 && code != "none")
			self.favourites.push(code);
		return self;
	};
	self.getFavourites=function(){
		return self.favourites;
	};
	self.getAllFavourites=function(){
		if(generators.length==1){
			//There is only one TextShadow object so call the getFavourites method of this object
			self.getFavourites();
		}
		else{
			var all_favs=[];
			for(var i=0,max=generators.length;i<max;i++){
				var current_generator_list=generators[i].getFavourites();
				for(var j=0,inner_max=current_generator_list.length;j<inner_max;j++){
					var current_code=current_generator_list[j];
					//Avoid duplicates
					if(all_favs.indexOf(current_code)==-1)
						all_favs.push(current_code);
				}//j
			}//i
			return all_favs;
		}
	};
	self.removeFavourites=function(){
		if(self.favourites.length > 0)
			bootbox.confirm("Are you sure you want to erase your favourites?",function(del){
				if(del)
					self.favourites.length=0;
		});
		else
			bootbox.alert("There are no favourites to remove.");
		return self;
	};
	self.showFavourites=function(){
		var index=10;
		var favourites=self.getFavourites();
		var total=favourites.length;
		if(total<1)
			bootbox.alert("No favourites to show!!!");
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
			$('.modal-body').on("click",".download_button",function(){
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
					//You are here?
					//It's most likely you don't have filesaver support
					var error_markup="<div class='alert alert-danger' role='alert' style='margin-top:8px'><strong>Filesaver</strong> is missing"+
					".Can't download favourites</div><p class='text-warning'>Without Filesaver we are not able to access the filesystem</p>";
					bootbox.alert(error_markup);
				}
			});
			$(".list-group").on("click",".list-group-item",function(){
				$(".list-group li").removeClass('active');
				//Get the selected text shadow
				var current_shadow=$(this).text();
				//Get all the values without "text-shadow:"
				var values=current_shadow.split(":")[1];
				//Now get only the color values
				var colors=values.split("(")[1].split(")")[0].split(',');
				//Get the shadow values without colors (only x,y axis and blur)
				//Split based on the color mode(rgb/rgba)
				var shadow_values=values.split(colors.length==4?"rgba(":"rgb(")[0];
				//Now extract the numbers from the text shadow to set each slider.Match any digits and floating numbers
				shadow_values=shadow_values.split(" ").map(function(i){
					return parseFloat(i);
				});
				var shadow_sliders=$(host+' .text-shadow-sliders');
				var color_sliders=$(host+' .text-shadow-color-sliders');
				for(var i=0;i<shadow_sliders.length;i++)
					$(shadow_sliders[i]).val(parseFloat(shadow_values[i]));
				for(var i=0;i<colors.length;i++)
					$(color_sliders[i]).val(parseFloat(colors[i]));
				$(host+" .text-shadow-code-output").text(current_shadow);
				$(host+" .text-shadow-output").css("text-shadow",values.split(";")[0]);
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
			});
			$(".show_more").on("click",function(){
				"use strict";
				//TODO implement this part with slice
				//Slice the next 10 or less items we want to show from the favourites list
				if(index>=favourites.length)
					return;//max items displayed so exit the function
				var current_list="";
				var total=favourites.length;
				//find how many items there are to display between the current index
				var diff=total-index;
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
	self.delete=function(){
		bootbox.confirm("Are you sure you want to delete the current TextShadow generator?",function(i){
			if(i){
				//Here we are going to delete/remove the current generator
				//First deactivate the generator
				self.deactivateGenerator();
				//Then remove it and restore the contents os the host.
				self.restoreBackup(self.getId());
				//Note that the current object is not deleted from the global generators array just in case we change our mind
			}
			else{
				bootbox.alert("Operation aborted!!!!");
			}
		});

	};
	//We need to keep tack of the TextShadow objects inside the page
	generators.push(self);
	//self.activateGenerator();
	//After everything is ok render the app
	render();
}
