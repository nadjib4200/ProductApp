$(document)
.ready(
	function() {
			$( ".burger" ).on( "click", function(event) {
			tabDeskV = $(".sidebar").width();
		  		if (tabDeskV < 85) { 
				  	$(".sidebar").stop().animate({width :"284px"}, 100, "linear");
				  }
				  else
				  {
				  	$(".sidebar").stop().animate({width :"84px"}, 100, "linear");
				  }
				  $(".sidebar span").toggle();
				});
		}

/*
				
		  $( ".burger" ).on( "click", function(event) {
			tabDeskV = $(".tabdesk").position();
		  		if (tabDeskV.left < 84) { 
				  	$(".tabdesk").stop().animate({left :"84px"}, 100, "linear");
				  	console.log(tabDeskV.left);
				  }
				  else
				  {
				  	$(".tabdesk").stop().animate({left :"-200px"}, 100, "linear");
				  	console.log(tabDeskV.left);
				  }


				});
		}
		*/
);