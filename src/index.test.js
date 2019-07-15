// import React from "react";
// import ReactDOM from "react-dom";
// import { App } from "./App";

import Index from "./index";

const getCircularReplacer = () => {
	const seen = new WeakSet();
	return (key, value) => {
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) {
				return;
			}
			seen.add(value);
		}
		return value;
	};
};

it("renders without crashing", () => {
	// const div = document.createElement("div");
	// ReactDOM.render(<App />, div);
	// ReactDOM.unmountComponentAtNode(div);
	// console.log(Index);
	// JSON.stringify(
	//   Object.assign({}, Index, { _reactInternalInstance: "censored" })
	// )
	expect(JSON.stringify(Index, getCircularReplacer())).toMatchSnapshot();
});
