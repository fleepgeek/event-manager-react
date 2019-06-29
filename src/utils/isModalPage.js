import queryString from "query-string";

const isModalPage = (location, history, path, action) => {
	const { state = {} } = location;
	const { modal } = state;
	const values = queryString.parse(location.search);
	if (location.pathname === path || modal === undefined) {
		history.replace(path, { modal: false });
	} else {
		if (values.action === action && modal === true) {
			if (values.id) {
				history.replace(`?action=${action}&id=${values.id}`);
			} else {
				history.replace(`?action=${action}`);
			}
		} else {
			history.replace(path, { modal: false });
		}
	}
	return modal;
};

export default isModalPage;
