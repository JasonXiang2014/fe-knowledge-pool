import React, { useState, useEffect, useContext } from 'react';
import Context from '../Context'
const {
	ThemeContext,
	UserContext
} = Context

export default function UseContextPage(props) {
	const themeContext = useContext(ThemeContext)
	const userContext = useContext(UserContext)

	return (
		<div className="border">
			<h3 className={themeContext.themeColor}>UseContextPage</h3>
			<p>{userContext.name}</p>
		</div>
	)
}