import React, { Component } from 'react';
class Title extends Component {
	render() {
		return (
			<div className="p-2 text-center bg-light">
				<h1 className="m-3">{this.props.title}</h1>
			</div>
		)
	}
}
export default Title;