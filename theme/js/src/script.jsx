var Popup = new React.createClass({

	propTypes: {
		id: React.PropTypes.int,
		siteData: React.PropTypes.object,
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

		console.log( this.props.siteData );

		return (
			<div className={this.state.classes} id="modal-18">
    			<div className="md-content">
    				<h3>{ this.props.siteData.title }</h3>
    				<a href="{ this.props.siteData.url }" className="md-visit">{ this.props.siteData.url }</a>
    				<div>
	    				<div className="md-description" dangerouslySetInnerHTML={ {__html: this.props.siteData.description} }></div>
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

  		ReactDOM.render(
			<Popup id={id} siteData={this.state.sites[id]} onUserInput={this.popupHasClosed} />,
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