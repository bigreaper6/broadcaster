import * as React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import {ThemeProvider} from "react-css-themr";
import theme from "./theme";
import "../../styles/index.scss";

const el = document.getElementById("app");

function renderApp()
{
	const routes = require("./routes").default;
	render(process.env.NODE_ENV == "production"
	? routes
	: (
		<AppContainer>
			<ThemeProvider theme={theme}>
				{routes}
			</ThemeProvider>
		</AppContainer>
	), el);
}

renderApp();

// hot reloading in dev
if ((module as any)["hot"])
{
	(module as any)["hot"].accept("./routes", () => {
		renderApp();
	});
}
