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


    // window.setTimeout(showAdMobile, 5000);

    // function showAdMobile() {
    //     $('.popup-ad-holder-mobile').delay(5000).addClass('fadeIn');
    // }


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


    // Call calendar and give data to it
	$('#calendar').fullCalendar({
		locale: 'fr',
        eventClick: function() {
            $('#appointment').modal('show');
        },
		header: {
			left: '',
			center: 'prev title next',
			right: 'today agendaDay,agendaWeek,month'
		},
		events: [
			{
				title: 'Disponible',
				start: '2017-06-01 10:00:00',
				end: '2017-06-01 11:00:00'
			},
			{
				title: 'Disponible',
				start: '2017-06-07 08:00:00',
				end: '2017-06-07 09:00:00'
			},
			{
				title: 'Disponible',
				start: '2017-06-07 09:00:00',
				end: '2017-06-07 10:00:00'
			},
			{
				title: 'Disponible',
				start: '2017-06-07 10:00:00',
				end: '2017-06-07 11:00:00'
			},
			{
				title: 'Disponible',
				start: '2017-06-07 11:00:00',
				end: '2017-06-07 12:00:00'
			},
			{
				title: 'Disponible',
				start: '2017-06-07 12:00:00',
				end: '2017-06-07 13:00:00'
			},
			{
				title: 'Disponible',
				start: '2017-06-07 13:00:00',
				end: '2017-06-07 14:00:00'
			},
			{
				title: 'Disponible',
				start: '2017-06-07 14:00:00',
				end: '2017-06-07 15:00:00'
			},
			{
				title: 'Disponible',
				start: '2017-06-08 13:00:00',
				end: '2017-06-08 14:00:00'
			},
			{
				title: 'Disponible',
				start: '2017-06-09 12:00:00',
				end: '2017-06-09 13:00:00'
			},
			{
				title: 'Disponible',
				start: '2017-06-10 14:00:00',
				end: '2017-06-10 15:00:00'
			},
			{
				title: 'Disponible',
				start: '2017-06-10 13:00:00',
				end: '2017-06-10 14:00:00'
			}
		]
	});


    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

        $('#calendar-detail-school').fullCalendar({
            locale: 'fr',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            }
        });
    });

	// Initiate tabs wizard
    // $('#rootwizard').bootstrapWizard();


    // Toggle advance filter
	$('.filter-holder').on('click', function() {
		$('.advance-filter').toggleClass('open');
		// $('.main').toggleClass('open');
		// $('.ad-holder').toggleClass('hide');
		// $('.survey-holder').toggleClass('hide');
	});
    $('#filter-trigger').on('change', function() {
        // console.log();
        if ($(this).prop('checked')) {
            $('.advance-filter').toggleClass('open');
        } else {
            $('.advance-filter').toggleClass('open');
        }
    });


    // Initiate tooltip
	$('[data-toggle="tooltip"]').tooltip();


    // Show tooltip on compare button on school list
	$('.compare-holder').hover(function() {
		$(this).find('.popup-compare').toggleClass('fadeIn fadeOut');
	});

	// $('#cmn-toggle-1').change(function() {
		
	// 	if($(this).is(':checked')){
	//         $('#filter-popup').modal('show');
	//     } 
	// });

	// $('.school-item').lazyload({
	//     threshold : 200,
	//     effect: "fadeIn"
	// });

	// $('#filter-popup').on('hide.bs.modal', function (e) {
	//   $('.link-btn').removeClass('hide');
	//   $('.popup-btn').addClass('hide');
	// });



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

	// $('#test1').click(function() { 
		
	// 	if($(this).is(':checked')){
	//         for (var i = 1; i <= 13; i++) { 
	
 //            	$('#school-' + i).attr('checked', 'checked');
	//         }
	//     } else { console.log('unchecked');
	//     	for (var i = 1; i <= 13; i++) { 
	//         	$('#school-' + i).removeAttr('checked');
	//         }
	//     } 
	// });

    // listen modal after finish some action it show a confirmation modal
	// $('.close-class').on('click', function() {
	// 	$('#apply-popup').modal('hide');
	// 	$('#confirm-popup').modal('show');
	// });

    // listen modal after finish some action it show a confirmation modal
	// $('.close-download').on('click', function() {
	// 	$('#download-popup').modal('hide');
	// 	$('#download-file').modal('show');
	// });

	// $('#scolaire-filter').on('click', function() {
	// 	if($(this).is(':checked')) { console.log('clicked');
	// 		$('.dans-quelles').toggleClass('hidden');
	// 	} else {
	// 		$('.dans-quelles').toggleClass('hidden');
	// 	}
	// });


    // For multiselect
	// $('.multiselect').select2({
	// 	placeholder: 'Dans quelles matières'
	// });
	// $('.strong').select2({
	// 	placeholder: 'Matières fortes'
	// });
	// $('.low').select2({
	// 	placeholder: 'Matières faibles'
	// });
	// $('.matery').select2({
	// 	placeholder: 'Votre goût pour les matières'
	// });


    // Call date picker
	// $('.datepicker').datetimepicker({
	// 	locale: 'fr',
	// 	format: 'DD/MM/YYYY'
	// });


    // Carousel
	$('.slickjs').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        // centerMode: true
        responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
        ]
    });

    $('.school-carousel').slick({
    	infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        variableWidth: true
    });

    // triggering upload button
    $('.upload-button').on('click', function() {
    	$('.school-mark').click();
    });

    // Sweet alert for apply to institution
    // $('#applyInstitution').on('submit', function(e) {
    // 	e.preventDefault();

    // 	swal({
    // 		title: '',
    // 		html: "Votre dossier vient d'être envoyé au Lycee Saint-Charles - Lycee d'enseignement general Prive Catholique Sous contrat d'association. <br /> Lycee Saint-Charles reviendra vers vous très prochainement.",
    // 	});
    // });


    // Sweet alert for submiting form on booking appointment wizard
 //    $('#wizard').on('submit', function(e) {
 //    	e.preventDefault();

 //    	swal({
 //    		title: '',
 //            type: 'success',
 //    		html: "Un mail de confirmation vient de vous être adressé pour votre rdv du 00/00/00 à 00h00 avec M. xxxx. <br />A bientôt. <br />L'équipe du CIDE",
	// 	});

	// });


    $('.top-compare-table .close').on('click', function() {
    	$(this).parent().parent().remove();
    });

    // Select all advisor
    // $('.select-all-advisor').on('click', function(e) {
    // 	e.preventDefault();

    // 	$('.checkbox.filled-in').prop('checked', function(idx, oldProp) {
    //         return true
    //     });

    // });

    // Deselect all advisor
    // $('.deselect-all-advisor').on('click', function(e) {
    // 	e.preventDefault();

    // 	$('.checkbox.filled-in').prop('checked', function(idx, oldProp) {
    //         return false
    //     });

    // });


    // Advance filter
    // $('#confessionel').on('change', function(e) {
    // 	if ( $(this).prop('checked') === false ) {
    // 		$('.collapse').collapse('hide');
    // 	} else {
    // 		$('.collapse').collapse('show');
    // 	}
    // });


    // Responsive tabs, it turn collapse in mobile
    // fakewaffle.responsiveTabs( [ 'xs', 'sm' ] );

    /**
     * The cube for school agenda
     *
     *
     */
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

    if(cube.length !== 0) {
        // Rotate the cube to notice user first come to the page
        window.setTimeout(function() { rotateMiddleCube('show-right'); }, 1000);
        window.setTimeout(function() { rotateMiddleCube('show-back'); }, 2000);
        window.setTimeout(function() { rotateMiddleCube('show-left'); }, 3000);
        window.setTimeout(function() { rotateMiddleCube('show-front'); }, 4000);
    }

    function rotateMiddleCube(direction) {
        arrayCube[2].goTo(direction);
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



    // Limit comparing school, minimum 2 and maximum 4
    $('.school-checkbox').on('click', function(e) {
        // e.preventDefault();

        // console.log($(this).prop('checked'));
        var count = 0;
        $('.school-checkbox').each(function(index, el) {
            
            if ($(el).prop('checked') === true && count <= 4 ) {
                count++;

            } else if (count > 4) {
                e.preventDefault();
                swal({
                    title: '',
                    type: 'warning',
                    html: "Vous ne pouvez comparer plus de 4 école à la fois",
                });
            }

        });

        if (count >= 2 && count <= 5) {
            $('.btn-compare').prop('disabled', false)
        } else {
            $('.btn-compare').prop('disabled', true)
        }
        // console.log(count);
    });

    // triggering compare object on popup, if user not choose anything they can't go to compare page
    $('.compare-checkbox').on('click', function(e) {

        var count = 0;
        $('.compare-checkbox').each(function(index, el) {
            
            if ($(el).prop('checked') === true ) {
                count++;
            }

        });

        if (count >= 1) {
            $('.btn-compare-popup').removeAttr('disabled');
        } else {
            $('.btn-compare-popup').attr('disabled', true);
        }
        // console.log(count);
    });


    // Reset landing page form showing
    $('html').click(function() {

        $('.landingpage__additional-content').css('z-index', 0);
        $('.landingpage__additional-content .form-wrap').removeClass('fadeIn').addClass('fadeOut');
        $('body .main').css({'background-image':''});

        // $('.login').hide();
    });

    //Show search form when the box hover
    $('.landingpage__additional-content').on('mouseover', function() {

        $('.landingpage__additional-content .form-wrap').removeClass('fadeIn').addClass('fadeOut');
        $('.landingpage__additional-content').css('z-index', 0);
        
        $(this).css('z-index', 10);
        $(this).find('.form-wrap').removeClass('fadeOut').addClass('fadeIn');
        var img = $(this).data('background'); console.log(img);

        $('body .main').css({ 'background-image': 'url(' + img + ')', 'background-size': 'cover'});
    });


    // $('.mobile-login .fa-user').on('click', function() {
    //     $('.login').toggle('slow');
    // });
-

    // $('.booking-appointment .offcanvas-link').on('click', function(e) {
    //     e.preventDefault();
        
    //     $('.advisors-wrap').toggleClass('open');  
    //     $('.calendar-content').toggleClass('open');
    // });


    function detectmob() {
        if( navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)
         ){
            return true;
        }
        else {
            return false;
        }
    }

    // var checkMobile = detectmob();
    

    // if (checkMobile) {
        
    //     $('.select-all-advisor').on('click', function() {
    //         $(this).hide();
    //         $('.deselect-all-advisor').show();
    //     });
    //     $('.deselect-all-advisor').on('click', function() {
    //         $(this).hide();
    //         $('.select-all-advisor').show();
    //     });
    // }


    // $('.advisors-wrap .mobile-close').on('click', function(e) {
    //     e.preventDefault();
    //     $('.advisors-wrap').toggleClass('open');
    // });


    // $('#tab-wrapper').responsiveTabs({
    //     startCollapsed: 'accordion'
    // });

});
