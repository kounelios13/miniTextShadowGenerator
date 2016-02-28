"use strict";
function TextShadow(host){
	function val(o){
		return $(o).val();
	}
	function abs(a){return Math.abs(a);}
	var self=this;
	self.generator_markup="<div class='text-shadow-container'> <div class='panel panel-primary'> <div class='panel-heading text-center'>Text shadow Generator</div> <div class='panel-body'> <div class='row text-center'> <div class='col-md-4'> <h3 class='text-info'>X-axis</h3> <input type='range' class='text-shadow-sliders x-axis' min='-100' max='150' value=0> </div> <div class='col-md-4'> <h3 class='text-info'>Y-axis</h3> <input type='range' class='text-shadow-sliders y-axis' min='-100' max='150' value=0> </div> <div class='col-md-4'> <h3 class='text-info'>Blur</h3> <input type='range' class='text-shadow-sliders blur' min='0' max='10' step='0.1' value='0'> </div> </div> <div class='row text-center'> <div class='col-md-12'> <h3 class='text-shadow-output'>Shadow is applied here</h3> </div> </div> <div class='row text-center'> <div class='col-md-3'> <h3 class='text-info'>Red</h3> <input type='range' class='text-shadow-color-sliders' min='0' max='255' step='1' value='0'> </div> <div class='col-md-3'> <h3 class='text-info'>Green</h3> <input type='range' class='text-shadow-color-sliders' min='0' max='255' step='1' value='0'> </div> <div class='col-md-3'> <h3 class='text-info'>Blue</h3> <input type='range' class='text-shadow-color-sliders' min='0' max='255' step='1' value='0'> </div> <div class='col-md-3'> <h3 class='text-info'>Opacity</h3> <input type='range' class='text-shadow-color-sliders' min='0' max='1' step='0.1' value='1'> </div> </div><!-- /row --> </div> <!-- /panel-body --> <div class='panel-heading text-center text-shadow-code-output'>Code</div> </div> </div> ";
	self.host_id=host;
	self.shadow_code="none";
	self.content_backup=null;
	self.favourites=[];
	self.getId=function(){
		return self.host_id;
	};
	self.getBackup=function(){
		return self.content_backup;
	}
	self.getCode=function(){
		return self.shadow_code;
	};
	self.activateGenerator=function(){
		var host=self.getId();
		$(function(){
			$(host).on("mousemove touchmove",function(){
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
		});
		return self;
	};
	self.deactivateGenerator=function(){
		$(self.getId()).off();
		return self;
	};
	self.setAxisValues=function(limit,value){
		//more validations to come here
		var sliders=$(self.getId()+" .text-shadow-sliders");
		if(isNaN(value) || !value || !limit)
			throw new Error("An error occured.");
		switch(limit.toUpperCase()){
			value=abs(value);
			/*var max=$(sliders[0]).prop("max");
			var min=$(sliders[0]).prop("min");*/
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
	self.addToFavourites=function(append){
		if(self.favourites.indexOf(self.getCode())== -1 && self.getCode() != "none")
			self.favourites.push(self.getCode());
		return self;
	};
	self.getFavourites=function(){
		return self.favourites;
	};
	self.removeFavourites=function(){
		var del;
		if( del=confirm("Are you sure you want to erase your favourites?"))
			self.favourites.length=0;
	};
	$(function(){
		self.content_backup=$(self.host_id).html();
		$(self.host_id).html(self.generator_markup);
	});
}