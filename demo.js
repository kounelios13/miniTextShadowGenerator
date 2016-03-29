	var gen=new TextShadow("#sample",[0,1,2,3,4,5]).activateGenerator();
	//var a=new TextShadow("#sample_2",[0,2,4,3,5]);
	var userGenerator;
	var btns;
	$(function(){
		$("#button").on("click",function(){
		var text="<h3 class='text-primary text-center'>text-shadow:"+gen.getCode()+";</h3>";
			bootbox.alert(text);
		});
		$(document).on("click",".row .btn",function(){
			$(this).closest(".col-md-4 .btn").toggleClass("selected-button");
		});
		$("#createGenerator").on("click",function(){
			var id=null;

			function create(options){
				options=options || [0,1,2];
				userGenerator=new TextShadow("#sample",options);
			}
			function step1(callback){
				bootbox.prompt("Step 1.Create a container.Give an id for your container",function(answer){
				if(answer != null && answer.length>0){
					if(answer[0]=='.'||!(isNaN(answer[0]))){
						bootbox.alert("Invalid id try again!!!");
						//User entered an invalid id so exit
						return;
					}
					id=answer;
				}
				//execute callback only when the previous function is completed
				callback();
				});
			}
			function step2(callback){
				bootbox.confirm("Do you want to add default buttons in the generator?If you don't you will have to create your own buttons to implement the basic functionality.",function(ans){
					if(ans && ans != " "){
						var markup=""
						+"<div class='row'><div class='col-md-12 text-center'>Choose your default buttons</div></div>"
						+"<div class='row text-center'>"
							+"<div class='col-md-4 center-block'><div class='btn btn-primary' data-order='0'>Activate Generator</div><div class='checkbox'></div></div>"
							+"<div class='col-md-4 center-block'><div class='btn btn-primary' data-order='1'>Deactivate Generator</div><div class='checkbox'></div></div>"
							+"<div class='col-md-4 center-block'><div class='btn btn-warning' data-order='2'>Reset Generator</div><div class='checkbox'></div></div>"
						+"</div>"
						+"<div class='row text-center'>"+
							"<div class='col-md-4 center-block'><div class='btn btn-primary' data-order='3'>Add to favourites</div><div class='checkbox'></div></div>"+
							"<div class='col-md-4 center-block'><div class='btn btn-primary' data-order='4'>Show Favourites</div><div class='checkbox'></div></div>"+
							"<div class='col-md-4 center-block'><div class='btn btn-warning' data-order='5'>Remove Favourites</div><div class='checkbox'></div></div>"+
						"</div>";
						bootbox.alert(markup,function(){
							btns=$('.selected-button');

							id=id[0]!="#"?"#"+id:id;
							bootbox.alert("Code to enter in your script:\nvar generator=new TextShadow('"+id+"',"+btns.map(function(i){return i}).toString()+");");
						});
					}
					//callback();
				});
			}//step2

			step1(step2);

		});
	});
