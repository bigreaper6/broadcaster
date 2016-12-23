import {app, BrowserWindow} from "electron";
import ConfigStore from "../stores/config";
import Storage from "../storage";
import {init as initDev} from "./dev";

export let window: Electron.BrowserWindow | null;

const dev = process.env.NODE_ENV != "production";

app.on("ready", init);
app.disableHardwareAcceleration();

async function init()
{
	const data = await new Storage<ConfigStore>("config.json").load(ConfigStore);
	data;

	// init development if in dev mode
	if (dev) await initDev();

	createWindow();

	app.on("window-all-closed", () => app.quit());

	function createWindow()
	{
		window = new BrowserWindow({
			width: 800,
			height: 600,
			// hidden by default to wait for event
			show: false
		});
		window.loadURL(dev
			? "http://localhost:3000"
			: `file://${__dirname}/../../index.html`);

		// once window is ready, show it
		window.on("ready-to-show", () => window && window.show());
		window.on("closed", () => window = null);
	}
}
