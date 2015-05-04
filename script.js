$(document).ready( function(){

  var color = "red";
  var vCounter = 0;
  var hCounter = 0;
  var hStreak = 0;
  var dDownCounter = 0;
  var dUpCounter = 0;
  var gameStop = false;

  // Build reverse method in jQuery
  jQuery.fn.reverse = function() {
    return this.pushStack(this.get().reverse(), arguments);
  };

  // Click event handler
  $(".column").on( "click", function() {
  	if(gameStop === false){
	  	currentColumn = $(this);
	    $(this).children().reverse().each( function(){
	      if( !($(this).children().hasClass( "red" ) || $(this).children().hasClass( "black" ) )) {
	        currentPiece = $(this).children();
	        dropPiece(currentColumn, currentPiece);
	        return false;
	      }
	    })
	}
  })

  // Switch color from red to black, and vice versa
  function colorSwitch() {
    if ( color === "red" ) { color = "black"; }
    else if (color === "black") { color = "red"; }
  }

  // Manages piece-dropping animation, then runs the tests for a winner once the piece is in place
  function dropPiece(currentColumn, currentPiece){
  	var pieces = currentColumn.children().children();
  	var x = 0;
  	var pieceDropInt = setInterval(function(){
  		$(pieces[x-1]).removeClass(color);
  		if(pieces[x] === currentPiece[0]){
  			clearInterval(pieceDropInt);
  			currentPiece.addClass( color );
	        gameStop = false;
  			checkVertical(currentColumn);
	        checkHorizontal(currentPiece);
	        downDiagonal(currentColumn, currentPiece);
	        upDiagonal(currentColumn, currentPiece);
	        colorSwitch();
  		}
  		else {
	  		$(pieces[x]).addClass(color);
  			x++;
  			gameStop = true;
  		}
  	}, 50)
  }

  // Checks for a winner vertically
  function checkVertical(currentColumn) {
  	vCounter = 0;
    currentColumn.children().each(function(){
    	$(this).children().each(function(){
    		if($(this).hasClass(color)){
    			vCounter++;
				if(vCounter >= 4){
					console.log("We have a winner!");
					gameStop = true;
				}
    		}
    		else {
    			vCounter = 0;
    		}
    	})
    })
  }

  // Checks for a winner horizontally
  function checkHorizontal(currentPiece) {
  	hCounter = 0;
  	$("div[cell='" + currentPiece.attr("cell") + "']").each(function(){
    	if($(this).hasClass(color)){
    			hCounter++;
				if(hCounter >= 4){
					console.log("We have a winner!");
					gameStop = true;
				}
    	}
    	else {
    		hCounter = 0;
    	}
	})
  }

  // Checks for a winner in the downward diagonal direction
  function downDiagonal(currentColumn, currentPiece) {
  	var startPiece = currentPiece;
  	var x = 0;
  	var diagArray = [];
  	while($("div[column='" + (parseInt(currentColumn.attr("column")) - x) + "'] div[cell = '" + (parseInt(currentPiece.attr("cell")) - x) + "']").length > 0){
  		startPiece = $("div[column='" + (parseInt(currentColumn.attr("column")) - x) + "'] div[cell = '" + (parseInt(currentPiece.attr("cell")) - x) + "']");
  		startColumn = $("div[column='" + (parseInt(currentColumn.attr("column")) - x) + "']");
  		x++;
  	}
  	x = 0;
  	while($("div[column='" + (parseInt(startColumn.attr("column")) + x) + "'] div[cell = '" + (parseInt(startPiece.attr("cell")) + x) + "']").length > 0){
		var piece = $("div[column='" + (parseInt(startColumn.attr("column")) + x) + "'] div[cell = '" + (parseInt(startPiece.attr("cell")) + x) + "']");
		diagArray.push(piece);
		x++;
	}
	dDownCounter = 0;
	$(diagArray).each(function(){
  		if($(this).hasClass(color)){
    		dDownCounter++;
		    if(dDownCounter >= 4){
				console.log("We have a winner!");
				gameStop = true;
			}
    	}
		else {
			dDownCounter = 0;
		}
    })
  }

  // Checks for a winner in the upward diagonal direction
  function upDiagonal(currentColumn, currentPiece) {
  	var startPiece = currentPiece;
  	var x = 0;
  	var diagArray = [];
  	while($("div[column='" + (parseInt(currentColumn.attr("column")) - x) + "'] div[cell = '" + (parseInt(currentPiece.attr("cell")) + x) + "']").length > 0){
  		startPiece = $("div[column='" + (parseInt(currentColumn.attr("column")) - x) + "'] div[cell = '" + (parseInt(currentPiece.attr("cell")) + x) + "']");
  		startColumn = $("div[column='" + (parseInt(currentColumn.attr("column")) - x) + "']");
  		x++;
  	}
  	x = 0;
  	while($("div[column='" + (parseInt(startColumn.attr("column")) + x) + "'] div[cell = '" + (parseInt(startPiece.attr("cell")) - x) + "']").length > 0){
		var piece = $("div[column='" + (parseInt(startColumn.attr("column")) + x) + "'] div[cell = '" + (parseInt(startPiece.attr("cell")) - x) + "']");
		diagArray.push(piece);
		x++;
	}
	dUpCounter = 0;
	$(diagArray).each(function(){
  		if($(this).hasClass(color)){
    		dUpCounter++;
		    if(dUpCounter >= 4){
				console.log("We have a winner!");
				gameStop = true;
			}
    	}
		else {
			dUpCounter = 0;
		}
    })
  }
})