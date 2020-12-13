import React from "react";

const ThemeContext = React.createContext({ themeColor: "pink", changeColor: () => { } });
const UserContext = React.createContext();

const contextObj = {
	ThemeContext,
	UserContext,
}
export default contextObj