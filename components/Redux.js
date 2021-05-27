import { createStore, compose } from "redux"
import { Provider, connect } from 'react-redux'
import { createContext } from 'react'

let reduxAccountContext = createContext();
let reduxListContext = createContext();

let reduxAccount = {
	logged: false,
	fname: "john",
	lname: "smith",
	bday: "2000-01-01",
	gender: "male",
};

let reduxList = {
	list: [
		{
			fname: "adam",
			lname: "watson",
			bday: "2001-01-01",
			gender: "male",
			id: Math.random().toString(36).substring(7)
		},
		{
			fname: "jane",
			lname: "doe",
			bday: "2002-02-02",
			gender: "female",
			id: Math.random().toString(36).substring(7)
		},
		{
			fname: "peter",
			lname: "jackson",
			bday: "2003-03-03",
			gender: "male",
			id: Math.random().toString(36).substring(7)
		},
	]
}

let reduxAccountReducer = (state = reduxAccount, { type, payload }) => {
	switch (type) {
		case "ACCOUNT_SET":
			let newState = { ...state }
			Object.keys(payload).forEach(x => newState[x] = payload[x])
			return newState;
		default: return state;
	}
}

let reduxListReducer = (state = reduxList, { type, payload }) => {
	switch (type) {
		case "LIST_ADD":
			let newList = [...state.list, payload];
			return { ...state, list: newList };
		case "LIST_DELETE":
			let newlist = [];
			state.list.forEach(x => x.id != payload.id && newlist.push(x));
			// console.log(newlist);
			// return state;
			return { ...state, list: newlist };
		default: return state;
	}
}


let reduxAccountStore = createStore(reduxAccountReducer);
let reduxListStore = createStore(reduxListReducer);

let reduxAccountState = state => {
	return { accountState: state };
}

let reduxListState = state => {
	return { listState: state };
}

let reduxAccountDispatch = dispatch => {
	return {
		accountSetter: {
			accountSet: data => { dispatch({ type: "ACCOUNT_SET", payload: data }) }
		}
	}
}

let reduxListDispatch = dispatch => {
	return {
		listSetter: {
			listAdd: data => { dispatch({ type: "LIST_ADD", payload: data }) },
			listDelete: data => { dispatch({ type: "LIST_DELETE", payload: data }) }
		}
	}
}


let withConnect = Component => {

	Component = compose(
		connect(reduxAccountState, reduxAccountDispatch, null, { context: reduxAccountContext }),
		connect(reduxListState, reduxListDispatch, null, { context: reduxListContext })
	)(Component)


	return Component;

}

export { withConnect, reduxAccountStore, reduxListStore, reduxAccountContext, reduxListContext }


