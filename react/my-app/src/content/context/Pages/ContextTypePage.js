import React, { Component } from "react";
import Context from '../Context'

const {
	ThemeContext,
	UserContext
} = Context

export default class ContextTypePage extends Component {
	// static contextType = ThemeContext;
	//你只通过该 API 订阅单一 context
	// static contextType = UserContext;

	render() {
		const { themeColor, name } = this.context;
		return (
			<div className="border">
				<h3 className={themeColor}>ContextTypePage</h3>
				<p>{name}</p>
			</div>
		);
	}
}
//Class.contextType
ContextTypePage.contextType = ThemeContext
