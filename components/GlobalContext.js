import React, { createContext } from 'react'
import moment from 'moment'

let GlobalContext = createContext();

let GlobalProvider = ({ children }) => {

	let randColor = () => "hsl(" + Math.random() * 360 + ", 60%, 65%)";

	let fieldChange = (field, value, state) => {

		return { ...state, [field]: value }
	}

	let capitalize = value => {

		let newValue = [];

		value.split(" ").forEach(x => {
			newValue.push(x.charAt(0).toUpperCase() + x.slice(1));
		})

		// console.log(newValue)
		return newValue.join(" ");
	}

	let date = value => moment(value).format("MMM D, YYYY")

	return (
		<GlobalContext.Provider value={{ fieldChange, capitalize, date, randColor }}>
			{ children}
		</GlobalContext.Provider>

	)
}

export { GlobalContext, GlobalProvider }