import * as React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import "../../styles/index.scss";

const el = document.getElementById("app");
function renderApp()
{
	const routes = require("./routes").default;
	render(process.env.NODE_ENV == "production"
	? routes
	: (
		<AppContainer>
			{routes}
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
