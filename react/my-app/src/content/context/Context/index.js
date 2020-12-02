import React from "react";

const ThemeContext = React.createContext({ themeColor: "pink", changeColor: () => { } });
const UserContext = React.createContext();

export default {
	ThemeContext,
	UserContext,
}