import React, { Component } from 'react';
import Context from '../Context'
import ContextTypePage from './ContextTypePage'
import ConsumerPage from './ConsumerPage'
import UseContextPage from './UseContextPage'

const {
	ThemeContext,
	UserContext
} = Context

export default class ContextPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			theme: {
				themeColor: 'green',
				changeColor: this.changeColor,
			},
			user: {
				name: 'xj'
			},
		}
	}

	changeColor = () => {
		this.setState(state => ({
			theme: {
				...state.theme,
				themeColor: state.theme.themeColor === 'green' ? 'red' : 'green',
			}
		}), () => {
			console.log(this.state.theme);
		})
	}

	render() {
		const { theme, user } = this.state
		return (
			<div>
				<h3>contextPage</h3>
				<button onClick={this.changeColor}>change Color</button>
				<ThemeContext.Provider value={theme} >
					<UserContext.Provider value={user}>
						<ContextTypePage></ContextTypePage>
						<ConsumerPage></ConsumerPage>
						<UseContextPage></UseContextPage>
					</UserContext.Provider>
				</ThemeContext.Provider>

			</div>
		);
	}
}