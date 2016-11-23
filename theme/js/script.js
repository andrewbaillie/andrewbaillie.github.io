'use strict';

var Website = new React.createClass({

	getInitialState: function getInitialState() {
		return {
			loaded: false,
			sites: 'Loading'
		};
	},

	componentDidMount: function componentDidMount() {
		var _this = this;

		axios.get('/data/portfolio.json').then(function (res) {
			var sites = res.data.portfolio.map(function (obj) {
				return obj;
			});
			_this.setState({ sites: sites });
			_this.setState({ loaded: true });
		});
	},

	render: function render() {

		if (this.state.loaded) {

			var siteList = this.state.sites.map(function (site) {

				var classList = "item " + site.classes;
				var image = "url('" + site.image + "')";

				return React.createElement(
					'a',
					{ target: '_blank', href: site.url, className: classList, style: { backgroundImage: image } },
					React.createElement(
						'div',
						{ className: 'inner' },
						React.createElement(
							'h3',
							null,
							site.title
						),
						React.createElement(
							'h4',
							null,
							site.tagline
						)
					)
				);
			});

			return React.createElement(
				'div',
				null,
				siteList
			);
		} else {

			return React.createElement(
				'h1',
				null,
				'Loading....'
			);
		}
	}

});

ReactDOM.render(React.createElement(Website, null), document.getElementById('portfolio'));

// $( document ).ready(function() {

// 	$('.portfolio').packery({
// 		 percentPosition: true
// 	});

// 	$(document).on( 'click' , '.item' , function(e) {

// 		e.preventDefault();

// 		// if ( $('.portfolio').hasClass('selected') ) {
// 		// 	$('.portfolio').removeClass('selected');
// 		// 	$('.item').removeClass('highlight');
// 		// } else {
// 			$('.portfolio').addClass('selected');
// 			$(this).addClass('highlight');
// 		// }

// 		$('#modal-18').addClass('md-show');

// 		setTimeout( function() {
// 			$('html').addClass( 'md-perspective' );
// 		}, 25 );

// 	} );

// 	$(document).on( 'click' , '.md-modal .md-close' , function() {
// 		$('.md-modal').removeClass( 'md-show' );
// 		$('html').removeClass( 'md-perspective' );	

// 		$('.portfolio').removeClass('selected');
// 		$('.item').removeClass('highlight');
// 	});


// });