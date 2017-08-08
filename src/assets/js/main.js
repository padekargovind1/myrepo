jQuery(document).ready(function($) {

    /**
     * Show ads bases on delay time
     *
     */
	window.setTimeout(hideAd, 3000);

    function hideAd() {
        // console.log('time is up');
        // $('body').hover(function() {
            $('.popup-ad-holder').delay(3000).addClass('fadeOutDown');
            $('.from-popup').delay(6000).removeClass('hidden').addClass('fadeInDown animated');//.delay(16000).removeClass('fadeInDown').addClass('fadeOutDown');
        // });
    }

    window.setTimeout(hideSideAd, 13000);

    function hideSideAd() {
        $('.from-popup').delay(13000).removeClass('fadeInDown').addClass('fadeOutDown');
        $('.fixed-ad').delay(26000).removeClass('hidden').addClass('fadeIn animated');
    }


    $('.popup-ad-holder-mobile .close, .from-popup .close').on('click', function() { $(this).parent().addClass('fadeOutDown'); });


    // listen scrolling, in 500 px height will show footer ads
    $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 500) {
            $('.footer-ads').removeClass('fadeOutDown hidden').addClass('fadeInUp');
        } else {
            $('.footer-ads').removeClass('fadeInUp').addClass('fadeOutDown');
        }
    });

    $('.school-carousel').slick();
	
	$(".mat-tab-label-container .mat-tab-label").click(function(){
		if($(".mat-tab-body-wrapper >.mat-tab-body-active").find(".select-custom-multiple select").length>0)
		{
			$(".mat-tab-body-wrapper >.mat-tab-body-active").find(".select-custom-multiple select").select2({
				placeholder: 'Matières fortes'
			});
		}
	});

});
