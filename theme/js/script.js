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

		// if ( $('.portfolio').hasClass('selected') ) {
		// 	$('.portfolio').removeClass('selected');
		// 	$('.item').removeClass('highlight');
		// } else {
			$('.portfolio').addClass('selected');
			$(this).addClass('highlight');
		// }

		$('#modal-18').addClass('md-show');

		setTimeout( function() {
			$('html').addClass( 'md-perspective' );
		}, 25 );

	} );

	$(document).on( 'click' , '.md-modal .md-close' , function() {
		$('.md-modal').removeClass( 'md-show' );
		$('html').removeClass( 'md-perspective' );	

		$('.portfolio').removeClass('selected');
		$('.item').removeClass('highlight');
	});

	
});


