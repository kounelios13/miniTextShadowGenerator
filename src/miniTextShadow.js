"use strict";
var __version__='1.0.1';
function isChainable(name){
	name=name[0]=='.'?name.slice(1).split("(")[0]:name.split("(")[0];//remove '.' and "(" and ")"
	var tools={"activateGenerator":true,"deactivateGenerator":true,"setAxisValues":true,"resetGenerator":true,"addToFavourites":true,"removeFavourites":true,"getId":false,"getFavourites":false,
	"getBackup":false,"restoreBackup":false};
	return tools[name] != undefined ?tools[name]:false;//if the key does not exist in the above dictionary return  false else return its value
}
function TextShadow(args){
	function val(o){return $(o).val();}
	function abs(a){return Math.abs(a);}
	function bind(container,evnt,item,fn){
		$(function(){
			if(item)
				$(container).on(evnt,item,fn);
			else
				$(container).on(evnt,fn);	
		});
	}
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
	"</div> ";
	self.host_id=null;
	if(typeof args != 'string' || !args || args[0]=='.' || !args[0]=="#"){
		throw new Error("Invalid id!!!"+args);
	}
	else
		self.host_id=host=args;
	self.shadow_code="none";
	self.content_backup=null;
	self.favourites=[];
	for(var i=1;i<=30;i++)self.favourites.push(i);
	self.getId=function(){
		return self.host_id;
	};
	var render=function(){
		if(host != null && host[0]=='#')
			bind(document,"ready",null,function(){
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
		var code=self.getCode();
		bind(host,"mousemove touchmove",null,function(){
			var sliders=$(host+" .panel-body .text-shadow-sliders");
			var color_sliders=$(host+" .panel-body .text-shadow-color-sliders");
			var color=val(color_sliders[3]) != '1'?"rgba("+val(color_sliders[0])+","+val(color_sliders[1])+","+val(color_sliders[2])+","+val(color_sliders[3])+")":"rgb("+val(color_sliders[0])+","+val(color_sliders[1])+","+val(color_sliders[2])+")";
			self.shadow_code=val(sliders[0])+"px "+val(sliders[1])+"px ";
			if(val(sliders[2])!= '0')
				self.shadow_code+=val(sliders[2])+"px ";
			self.shadow_code+=color;
			$(host+ " .text-shadow-code-output").text("text-shadow:"+self.shadow_code+";");
			$(host+ " .panel .text-shadow-output").css("text-shadow",self.shadow_code);
		});
		return self;
	};
	self.deactivateGenerator=function(){
		$(host).off();
		return self;
	};
	self.setAxisValues=function(limit,value){
		//more validations to come here
		var sliders=$(host+" .text-shadow-sliders");
		if(isNaN(value) || !value || !limit)
			throw new Error("An error occured.");
		var value=abs(value);
		switch(limit.toUpperCase()){	
			//we use for loop because we do not want to target every single slider
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
	self.showFavourites=function(){
		var error="Function has not been implemented yet and it is not part of the public API!!!!";
		var index=10;
		/*try{
			bootbox.alert("<h1 class='text-info text-center'>"+error+"</h1>");	
		}
		catch(e){
			setTimeout(function(){
				console.warning(error);
			},3000);
		}*/
		var favourites=self.getFavourites();
		var total=favourites.length;
		if(favourites.length<1)
			bootbox.alert("No favourites  to show!!!");
		else{
			var list_items;
			function renderlist(){				
				var ul="<ul class='list-group fix'>";
				var carrets="<div class='row'><div class='col-md-6'><span class='glyphicon glyphicon-chevron-up pull-left show_less'></span></div>"
				+"<div class='col-md-6'><span class='glyphicon glyphicon-chevron-down pull-right show_more'></span></div></div>";
				for(var i=0;i<10;i++)
					ul+="<li class='list-group-item favourite_item'>text-shadow:"+favourites[i]+";</li>";
				ul+="</ul>"+carrets;
				list_items=$(".favourite_item");
				return ul;	
			}
			bootbox.alert(renderlist());
			bind(".list-group","click",".list-group-item",function(){
				$(".list-group li").removeClass('active');
				$(this).addClass('active');
			}); 
			bind(".show_less","click",null,function(){
				console.log("Total:"+favourites.length);
			});
			bind(".show_more","click",null,function(){
				if(index>=favourites.length)
					return;//max items displayed so exit the function
				var current_list="";
				var total=favourites.length;
				var diff=total-index;
				var end;
				if(diff > 9)
					end=index+10;
				else
					end=index+diff;
				for(var i=index;i<end;i++)
					current_list+="<li class='list-group-item'>text-shadow:"+favourites[i]+";</li>";
				if(diff>9)
					index+=10
				else
					index+=diff
				$(".fix").html(current_list);
				//console.log(current_list);
			});
		}
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
	render();
}