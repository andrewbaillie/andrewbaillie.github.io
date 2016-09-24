/*!
 * Portfolio
 * Build date: 2016-09-24 21:29:20 GMT+0100
 */
$( document ).ready(function() {
	
	$('.portfolio').packery({
		 percentPosition: true
	});

	$(document).on( 'click' , '.item' , function(e) {

		e.preventDefault();

		if ( $('.portfolio').hasClass('selected') ) {
			$('.portfolio').removeClass('selected');
			$('.item').removeClass('highlight');
		} else {
			$('.portfolio').addClass('selected');
			$(this).addClass('highlight');
		}

	} );

});