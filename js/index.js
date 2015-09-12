var ready1 = function() {
    var $el, leftPos, newWidth,
        $mainNav = $(".navigation");

    if($("#magic-line").length){

    }
    else{
    	$mainNav.append("<span id='magic-line'></span>");
    }

    var $magicLine = $("#magic-line");
    
    $magicLine
        .width($(".current_page_item").width())
        .css("left", $(".current_page_item a").parent().position().left)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());
        
    $(".navigation span a").hover(function() {
        $el = $(this);
        leftPos = $el.parent().position().left;
        newWidth = $el.parent().width();
        $magicLine.stop().animate({
            left: leftPos,
            width: newWidth
        },200);
    }, function() {
        $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
        },200);
    });
};

var resizeWindow = function() {
	//adjusting the body size dynamically
	var $headerfooter=$("header").height()+$("footer").height();
	var $bodyheight=$(window).height()-$headerfooter;
	$(".body").css("height",$bodyheight);


	//adjusting position of wrapper dynamically
	$("#wrapper").css("top",(.1*$bodyheight));
	var $wrapperheight = .8*$bodyheight;
	$("#wrapper").css("height",$wrapperheight);
};

$(document).ready(ready1);
$(document).ready(resizeWindow);


$(window).resize(ready1);
$(window).resize(resizeWindow);