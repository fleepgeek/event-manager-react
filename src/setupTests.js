import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";

// if (!window.localStorage) {
// 	window.localStorage = {};
// 	Object.assign(window.localStorage, {
// 		removeItem: function removeItem(key) {
// 			delete this[key];
// 		}.bind(window.localStorage),
// 		setItem: function setItem(key, val) {
// 			this[key] = String(val);
// 		}.bind(window.localStorage),
// 		getItem: function getItem(key) {
// 			return this[key] + "yes";
// 		}.bind(window.localStorage)
// 	});
// }

// const localStorageMock = {
// 	getItem: jest.fn(),
// 	setItem: jest.fn(),
// 	removeItem: jest.fn(),
// 	clear: jest.fn()
// };
// global.localStorage = localStorageMock;
