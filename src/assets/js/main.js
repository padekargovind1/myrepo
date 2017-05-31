jQuery(document).ready(function($) {

	 /* $('#calendar').fullCalendar({
        dayClick: function() {
            $('#appointment').modal('show');
        },
		header: {
			left: '',
			center: 'prev title next',
			right: 'today agendaDay,agendaWeek,month'
		}
	});*/

	$('#rootwizard').bootstrapWizard();

	$('.filter-holder').on('click', function() {
		$('.advance-filter').toggleClass('open');
		$('.main').toggleClass('open');
		$('.ad-holder').toggleClass('hide');
		$('.survey-holder').toggleClass('hide');
	});

	// $('#cmn-toggle-1').change(function() {
		
	// 	if($(this).is(':checked')){
	//         $('#filter-popup').modal('show');
	//     } 
	// });

	 $('.school-item').lazyload({
	     threshold : 200,
	     effect: "fadeIn"
	 });

	$('#filter-popup').on('hide.bs.modal', function (e) {
	  $('.link-btn').removeClass('hide');
	 // $('.popup-btn').addClass('hide');
	});

	$('.advance-filter a').on('click', function(e) {
		e.preventDefault();

		$(this).siblings('ul').toggleClass('fadeIn open');
	});

	/*$('#test1').click(function() { 
		
		if($(this).is(':checked')){ console.log('checked');
	        for (var i = 1; i <= 13; i++) { 
	        	$('#school-' + i).attr('checked', 'checked');
	        }
	    } else { console.log('unchecked');
	    	for (var i = 1; i <= 13; i++) { 
	        	$('#school-' + i).removeAttr('checked');
	        }
	    } 
	});*/

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

	$('.multiselect').select2({
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
	});


	$('.datepicker').datetimepicker({		
		format: 'DD/MM/YYYY'
	});

});