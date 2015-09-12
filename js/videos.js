var videoResize = function(){
	//adjusting position of video dynamically
	var $headerfooter=$("header").height()+$("footer").height();
	var $bodyheight=$(window).height()-$headerfooter;
	var $wrapperheight = .8*$bodyheight;
	var $videopos = .1*$wrapperheight;
	$(".video").css("top",$videopos);
	var $videoheight = ($wrapperheight-(2*$videopos));
	$(".video").children().css("height",$videoheight);
	var $videowidth = (4/3)*$videoheight;
	$(".video").children().css("width", $videowidth);

	//attempting to center the video (doesn't work yet)
	var $bodywidth = $(window).width();
	var $videowidth = parseInt($(".video").children().css("width"));
	var $videopadding = ($bodywidth/2)-($videowidth/2);
	$(".video #current_video").css("padding-left",$videopadding);
};

$(document).ready(videoResize);
$(window).resize(videoResize);