var Popup = new React.createClass({

	propTypes: {
		onUserInput: React.PropTypes.func
	},

	getInitialState: function() {
		return {
            classes: 'md-modal md-effect-18 md-show'
        };
	},

	componentDidMount: function () {

		setTimeout( function() {
			var elem = document.getElementsByTagName("html")[0];
			elem.classList.add("md-perspective");
		}, 25 );
		 		
	},

	handleClick: function () {
		
		ReactDOM.unmountComponentAtNode(document.getElementById('popup'));
		
		var elem = document.getElementsByTagName("html")[0];
		elem.classList.remove("md-perspective");

		if (typeof this.props.onUserInput === 'function') {
			this.props.onUserInput();
		}

	},

	render: function () {
		return (
			<div className={this.state.classes} id="modal-18">
    			<div className="md-content">
    				<h3>Modal Dialog - {this.props.id}</h3>
    				<div>
    					<p>This is a modal window. You can do the following things with it:</p>
    					<p>
    						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    					</p>
    					<button className="md-close" onClick={this.handleClick}>Close</button>
    				</div>
    			</div>
    		</div>
		);
	}

});




var Website = new React.createClass( {

	getInitialState: function () {
		return {
			loaded: false,
			sites: 'Loading',
			portfolioClasses: 'portfolio'    
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

  	handleClick: function ( e ) {

  		e.preventDefault();

  		var id = e.target.getAttribute('data-id');

  		this.setState( { portfolioClasses: 'portfolio selected' } );


  		// $(this).addClass('highlight');

// if ( $('.portfolio').hasClass('selected') ) {
// 		// 	$('.portfolio').removeClass('selected');
// 		// 	$('.item').removeClass('highlight');
// 		// } else {
// 			$('.portfolio').addClass('selected');
// 			$(this).addClass('highlight');
// 		// }



  		ReactDOM.render(
			<Popup id={id} onUserInput={this.popupHasClosed} />,
			document.getElementById('popup')
		);

  		return false;

  	},

  	popupHasClosed: function () {
  		this.setState( { portfolioClasses: 'portfolio' } );
  	},

	render: function () {

		if ( this.state.loaded ) {

			var clickHandler = this.handleClick;

			var siteList = this.state.sites.map(function(site,index) {

				var classList = "item " + site.classes;
				var image = "url('" + site.image + "')"

				return (
					<a onClick={clickHandler} target="_blank" href={ site.url } className={classList} style={{backgroundImage: image}} data-id={ index }>
		    			<div className="inner">
		    				<h3>{ site.title }</h3>
		    				<h4>{ site.tagline }</h4>
		    			</div>
		    		</a>
				);
			});

			return <div className={this.state.portfolioClasses}>{ siteList }</div>;

		} else {

			return <h1>Loading....</h1>;

		}

	}

});


ReactDOM.render(
	<Website />,
	document.getElementById('portfolio')
);