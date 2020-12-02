import React, { Component } from 'react';
import Context from '../Context'
const {
	ThemeContext,
	UserContext
} = Context

export default class ConsumerPage extends Component {
	render() {
		return (
			<div className="border">
				<ThemeContext.Consumer>
					{
						themeContext => (
							<>
								{/* <h3 className={themeContext.themeColor}>ConsumerPage</h3> */}
								<button onClick={themeContext.changeColor}>在嵌套组件中更新 Context</button>
								<UserContext.Consumer>
									{
										userContext => (
											<HandleUserContext {...userContext} {...themeContext}></HandleUserContext>
										)
									}
								</UserContext.Consumer>
							</>
						)
					}
				</ThemeContext.Consumer>
			</div>
		);
	}
}

function HandleUserContext(props) {
	return <div>
		{props.name}
		<h3 className={props.themeColor}>ConsumerPage</h3>
	</div>
}