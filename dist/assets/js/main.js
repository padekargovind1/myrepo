jQuery(document).ready(function($) {
    $('.school-carousel').slick();
	$(document).on('click', ".mat-tab-label-container .mat-tab-label", function(){
		if($(".mat-tab-body-wrapper >.mat-tab-body-active").find(".select-custom-multiple-forte select").length>0)
		{
			$(".mat-tab-body-wrapper >.mat-tab-body-active").find(".select-custom-multiple-forte select").select2({
				placeholder: 'Matières fortes'
			});
		}
		if($(".mat-tab-body-wrapper >.mat-tab-body-active").find(".select-custom-multiple-faible select").length>0)
		{
			$(".mat-tab-body-wrapper >.mat-tab-body-active").find(".select-custom-multiple-faible select").select2({
				placeholder: 'Matières faibles'
			});
		}
		if($(".mat-tab-body-wrapper >.mat-tab-body-active").find(".select-custom-multiple-gout select").length>0)
		{
			$(".mat-tab-body-wrapper >.mat-tab-body-active").find(".select-custom-multiple-gout select").select2({
				placeholder: 'Vos goût pour les matières'
			});
		}else if($(".mat-tab-body-wrapper >.mat-tab-body-active").find("#txtAge").length>0)
		{
			console.log("Test 2");
			var txtAge = $(".mat-tab-body-wrapper >.mat-tab-body-active").find("#txtAge");
			// Listen for input event on numInput.
			txtAge[0].onkeydown = function(e) {
							
				if(!((e.keyCode > 95 && e.keyCode < 106)
				  || (e.keyCode > 47 && e.keyCode < 58) 
				  || e.keyCode == 8)) {
					return false;
				}
			}
		}
	});
	
});
function hideAd() {
	// console.log('time is up');
	// $('body').hover(function() {
		$('.popup-ad-holder').delay(3000).addClass('fadeOutDown');
		$('.from-popup').delay(6000).removeClass('hidden').addClass('fadeInDown animated');//.delay(16000).removeClass('fadeInDown').addClass('fadeOutDown');
	// });
}

function hideSideAd() {
	$('.from-popup').delay(13000).removeClass('fadeInDown').addClass('fadeOutDown');
	$('.fixed-ad').delay(26000).removeClass('hidden').addClass('fadeIn animated');
}

window.onload= function() { 
	jQuery(function($) {
		// listen scrolling, in 500 px height will show footer ads
		$(document).scroll(function() {
			var y = $(this).scrollTop();
			if (y > 500) {
				$('.footer-ads').removeClass('fadeOutDown hidden').addClass('fadeInUp');
			} else {
				$('.footer-ads').removeClass('fadeInUp').addClass('fadeOutDown');
			}
		});
	});
};