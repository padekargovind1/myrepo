jQuery(document).ready(function($) {


	//window.setTimeout(hideAd, 3000);

    /*function hideAd() {
        // console.log('time is up');
        // $('body').hover(function() {
            $('.popup-ad-holder').delay(3000).addClass('fadeOutDown');
            $('.from-popup').delay(6000).removeClass('hidden').addClass('fadeInDown animated');//.delay(16000).removeClass('fadeInDown').addClass('fadeOutDown');
        // });
    }*/

    //window.setTimeout(hideSideAd, 13000);

    function hideSideAd() {
        $('.from-popup').delay(13000).removeClass('fadeInDown').addClass('fadeOutDown');
        $('.fixed-ad').delay(26000).removeClass('hidden').addClass('fadeIn animated');
    }

    $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 500) {
            $('.footer-ads').removeClass('fadeOutDown hidden').addClass('fadeInUp');
        } else {
            $('.footer-ads').removeClass('fadeInUp').addClass('fadeOutDown');
        }
    });

	
	$('#rootwizard').bootstrapWizard();

	/*$('.filter-holder').on('click', function() {
		$('.advance-filter').toggleClass('open');
		
	});*/


	$('[data-toggle="tooltip"]').tooltip();

	$('.compare-holder').hover(function() {
		$(this).find('.popup-compare').toggleClass('fadeIn fadeOut');
	});

	

	$('.advance-filter a').on('click', function(e) {
		if ($(this).hasClass('open')) {
			$(this).siblings('ul').toggleClass('fadeIn open');
			$(this).removeClass('open');
		} else {
			$('.advance-filter a.open').removeClass('open').siblings('ul').removeClass('fadeIn open');
			$(this).siblings('ul').toggleClass('fadeIn open');
			$(this).addClass('open');
		}
	});

	$('#test1').click(function() { 
		
		if($(this).is(':checked')){
	        for (var i = 1; i <= 13; i++) { 
	        	$('#school-' + i).attr('checked', 'checked');
	        }
	    } else { console.log('unchecked');
	    	for (var i = 1; i <= 13; i++) { 
	        	$('#school-' + i).removeAttr('checked');
	        }
	    } 
	});

	$('.close-class').on('click', function() {
		$('#apply-popup').modal('hide');
		$('#confirm-popup').modal('show');
	});

	$('.close-download').on('click', function() {
		$('#download-popup').modal('hide');
		$('#download-file').modal('show');
	});

	$('#scolaire-filter').on('click', function() {
		if($(this).is(':checked')) { console.log('clicked');
			$('.dans-quelles').toggleClass('hidden');
		} else {
			$('.dans-quelles').toggleClass('hidden');
		}
	});

	/*$('.multiselect').select2({
		placeholder: 'Dans quelles matières'
	});
	$('.strong').select2({
		placeholder: 'Matières fortes'
	});
	$('.low').select2({
		placeholder: 'Matières faibles'
	});
	$('.matery').select2({
		placeholder: 'Votre goût pour les matières'
	});*/


	/*$('.datepicker').datetimepicker({
		locale: 'fr',
		format: 'DD/MM/YYYY'
	});*/


	$('.slickjs').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        // centerMode: true
    });

  /*$('.school-carousel').slick({
    	infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        variableWidth: true
    });*/

    $('.upload-button').on('click', function() {
    	$('.school-mark').click();
    });


    $('#applyInstitution, #wizard').on('submit', function(e) {
    	e.preventDefault();

    	swal({
    		title: '',
    		html: "Votre dossier vient d'être envoyé au Lycee Saint-Charles - Lycee d'enseignement general Prive Catholique Sous contrat d'association. <br /> Lycee Saint-Charles reviendra vers vous très prochainement.",
    	});
    });


    $('.top-compare-table .close').on('click', function() {
    	$(this).parent().parent().remove();
    });


   /* $('.select-all-advisor').on('click', function(e) {
    	e.preventDefault();

    	$('.checkbox.filled-in').prop('checked', function(idx, oldProp) {
            return true
        });

    });*/

   /* $('.deselect-all-advisor').on('click', function(e) {
    	e.preventDefault();

    	$('.checkbox.filled-in').prop('checked', function(idx, oldProp) {
            return false
        });

    });*/


    // Responsive tabs
   // fakewaffle.responsiveTabs( [ 'xs', 'sm' ] );

    cube = $('.cube-wrapper');

    var arrayCube = [];
    
    for (var i = 1; i <= cube.length; i++) {

        arrayCube[i] = $('.cube-' + i).cubeBox({
            'speed':400,
            'width': 300,
            'height': 400,
            'opacity': 1,
            'activeOpacity':1,
            'drag':false,
            'autoPlay':false
        });

    }

    var goto='';
    $('.btns a').on('click', function(event) {

        var el = $(this).parent().parent();
        var page = el.data('page');
        var cubeNumber = el.data('cube');

        if ($(this).hasClass('next')) {
            var showPage = page;
            if (page === 4) {
                showPage = 1;
                el.data('page', showPage);
            } else {
                showPage = page + 1;
                el.data('page', page + 1);
            }

            switch (showPage) {
                case 1 : goto = 'show-front'; break;
                case 2 : goto = 'show-right'; break;
                case 3 : goto = 'show-back'; break;
                case 4 : goto = 'show-left'; break;
            }
            arrayCube[cubeNumber].goTo(goto);

        } else if ($(this).hasClass('prev')) {
            var showPage = page;
            if (page === 1) {
                showPage = 4;
                el.data('page', showPage);
            } else {
                showPage = page - 1;
                el.data('page', showPage);
            }

            switch (showPage) {
                case 1 : goto = 'show-front'; break;
                case 2 : goto = 'show-right'; break;
                case 3 : goto = 'show-back'; break;
                case 4 : goto = 'show-left'; break;
            }
            arrayCube[cubeNumber].goTo(goto);
        }
    }); // button click


    
});
