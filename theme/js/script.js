"use strict";

var Popup = new React.createClass({

	propTypes: {
		onUserInput: React.PropTypes.func
	},

	getInitialState: function getInitialState() {
		return {
			classes: 'md-modal md-effect-18 md-show'
		};
	},

	componentDidMount: function componentDidMount() {

		setTimeout(function () {
			var elem = document.getElementsByTagName("html")[0];
			elem.classList.add("md-perspective");
		}, 25);
	},

	handleClick: function handleClick() {

		ReactDOM.unmountComponentAtNode(document.getElementById('popup'));

		var elem = document.getElementsByTagName("html")[0];
		elem.classList.remove("md-perspective");

		if (typeof this.props.onUserInput === 'function') {
			this.props.onUserInput();
		}
	},

	render: function render() {
		return React.createElement(
			"div",
			{ className: this.state.classes, id: "modal-18" },
			React.createElement(
				"div",
				{ className: "md-content" },
				React.createElement(
					"h3",
					null,
					"Modal Dialog - ",
					this.props.id
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"p",
						null,
						"This is a modal window. You can do the following things with it:"
					),
					React.createElement(
						"p",
						null,
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
					),
					React.createElement(
						"button",
						{ className: "md-close", onClick: this.handleClick },
						"Close"
					)
				)
			)
		);
	}

});

var Website = new React.createClass({

	getInitialState: function getInitialState() {
		return {
			loaded: false,
			sites: 'Loading',
			portfolioClasses: 'portfolio'
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

	componentDidUpdate: function componentDidUpdate() {

		if (this.state.loaded) {

			var pckry = new Packery('.portfolio', {
				percentPosition: true
			});
		}
	},

	handleClick: function handleClick(e) {

		e.preventDefault();

		var id = e.target.getAttribute('data-id');

		this.setState({ portfolioClasses: 'portfolio selected' });

		// $(this).addClass('highlight');

		// if ( $('.portfolio').hasClass('selected') ) {
		// 		// 	$('.portfolio').removeClass('selected');
		// 		// 	$('.item').removeClass('highlight');
		// 		// } else {
		// 			$('.portfolio').addClass('selected');
		// 			$(this).addClass('highlight');
		// 		// }


		ReactDOM.render(React.createElement(Popup, { id: id, onUserInput: this.popupHasClosed }), document.getElementById('popup'));

		return false;
	},

	popupHasClosed: function popupHasClosed() {
		this.setState({ portfolioClasses: 'portfolio' });
	},

	render: function render() {

		if (this.state.loaded) {

			var clickHandler = this.handleClick;

			var siteList = this.state.sites.map(function (site, index) {

				var classList = "item " + site.classes;
				var image = "url('" + site.image + "')";

				return React.createElement(
					"a",
					{ onClick: clickHandler, target: "_blank", href: site.url, className: classList, style: { backgroundImage: image }, "data-id": index },
					React.createElement(
						"div",
						{ className: "inner" },
						React.createElement(
							"h3",
							null,
							site.title
						),
						React.createElement(
							"h4",
							null,
							site.tagline
						)
					)
				);
			});

			return React.createElement(
				"div",
				{ className: this.state.portfolioClasses },
				siteList
			);
		} else {

			return React.createElement(
				"h1",
				null,
				"Loading...."
			);
		}
	}

});

ReactDOM.render(React.createElement(Website, null), document.getElementById('portfolio'));