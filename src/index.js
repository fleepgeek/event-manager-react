import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { IconContext } from "react-icons";
import store from "./store";
import theme from "./styles/theme";
import "./index.scss";
import GlobalStyle from "./styles/globalStyle";

export default ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				{/* We use a Fragment because ThemeProvider returns its children 
				when rendering, so it must only wrap a single child node  */}
				<>
					<IconContext.Provider value={{ className: "react-icons" }}>
						<App />
						<GlobalStyle />
					</IconContext.Provider>
				</>
			</ThemeProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root") || document.createElement("div")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
