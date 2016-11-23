var Website = new React.createClass( {

	getInitialState: function () {
		return {
			loaded: false,
			sites: 'Loading'    
		};
	},

	componentDidMount: function () {
		axios.get('/data/portfolio.json')
			.then(res => {
				var sites = res.data.portfolio.map(obj => obj);
				this.setState({ sites });
				this.setState( { loaded: true } );
			});
  	},

  	componentDidUpdate: function () {

  		if ( this.state.loaded ) {

	  		var pckry = new Packery( '.portfolio', {
			 	percentPosition: true
			});

		}

  	},

	render: function () {

		if ( this.state.loaded ) {

			var siteList = this.state.sites.map(function(site) {

				var classList = "item " + site.classes;
				var image = "url('" + site.image + "')"

				return (
					<a target="_blank" href={ site.url } className={classList} style={{backgroundImage: image}}>
		    			<div className="inner">
		    				<h3>{ site.title }</h3>
		    				<h4>{ site.tagline }</h4>
		    			</div>
		    		</a>
				);
			});

			return <div className="portfolio">{ siteList }</div>;

		} else {

			return <h1>Loading....</h1>;

		}

	}

});


ReactDOM.render(
	<Website />,
	document.getElementById('portfolio')
);


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


