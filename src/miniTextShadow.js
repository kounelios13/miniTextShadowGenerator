function TextShadow(host){
	this.generator_markup="<div class='text-shadow-container'> <div class='panel panel-primary'> <div class='panel-heading text-center'>Text shadow Generator</div> <div class='panel-body'> <div class='row text-center'> <div class='col-md-4'> <h3 class='text-info'>X-axis</h3> <input type='range' class='text-shadow-sliders x-axis' min='-100' max='150' value=0> </div> <div class='col-md-4'> <h3 class='text-info'>Y-axis</h3> <input type='range' class='text-shadow-sliders y-axis' min='-100' max='150' value=0> </div> <div class='col-md-4'> <h3 class='text-info'>Blur</h3> <input type='range' class='text-shadow-sliders blur' min='0' max='10' step='0.1' value='0'> </div> </div> <div class='row text-center'> <div class='col-md-12'> <h3 class='text-shadow-output'>Shadow is aplied here</h3> </div> </div> <div class='row text-center'> <div class='col-md-3'> <h3 class='text-info'>Red</h3> <input type='range' class='text-shadow-color-sliders' min='0' max='255' step='1' value='0'> </div> <div class='col-md-3'> <h3 class='text-info'>Green</h3> <input type='range' class='text-shadow-color-sliders' min='0' max='255' step='1' value='0'> </div> <div class='col-md-3'> <h3 class='text-info'>Blue</h3> <input type='range' class='text-shadow-color-sliders' min='0' max='255' step='1' value='0'> </div> <div class='col-md-3'> <h3 class='text-info'>Opacity</h3> <input type='range' class='text-shadow-color-sliders' min='0' max='1' step='0.1' value='1'> </div> </div><!-- /row --> </div> <!-- /panel-body --> <div class='panel-heading text-center text-shadow-code-output'>Code</div> </div> </div> ";
	this.host_id=host;
	this.shadow_code="none";
	this.favourites=[];
	this.getId=function(){
		return this.host_id;
	};
	function val(o){
		return $(o).val();
	}
	
	this.getCode=function(){
		return this.shadow_code;
	};
	this.activateGenerator=function(){
		var host=this.getId();
		$(host).on("mousemove touchmove",'input[type=range]',function(){
			var sliders=$(host+" .text-shadow-sliders");
			var color_sliders=$(host+" .text-shadow-color-sliders");
			color=val(color_sliders[3]) != '1'?"rgba("+val(color_sliders[0])+","+val(color_sliders[1])+","+val(color_sliders[2])+","+val(color_sliders[3])+")":"rgb("+val(color_sliders[0])+","+val(color_sliders[1])+","+val(color_sliders[2])+")";
			this.shadow_code=val(sliders[0])+"px "+val(sliders[1])+"px ";
			if(val(sliders[2])!= '0')
				this.shadow_code+=val(sliders[2])+"px ";
			this.shadow_code+=color;
			$(host+ " .text-shadow-code-output").text("text-shadow:"+this.shadow_code+";");
			$(host+ " .text-shadow-output").css("text-shadow:",this.shadow_code);
		});
		return this;
	};
	this.deactivateGenerator=function(){
		$(this.getId()).off();
		return this;
	};
	this.setAxisValues=function(limit,value){
		var sliders=$(this.getId()+" .text-shadow-sliders");
		if(isNaN(value) || !value || !limit)
			throw new Error("An error occured.");
		switch(limit.toUpperCase()){
			case "MIN":
				for(var i=0;i<sliders.length-1;)
					$(sliders[i]).prop("min",abs(value)* -1);
				break;
			default:
				for(var i=0;i<sliders.length-1;)
					$(sliders[i]).prop("min",abs(value));	
		}//switch
		return this;
	}
	$(document).ready(function(){
		$(host).html(this.generator_markup);
		this.activateGenerator();
	});
}