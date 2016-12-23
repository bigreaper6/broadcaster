import * as React from "react";
import {remote} from "electron";
import {ProgressBar, Layout, Panel} from "react-toolbox";
import {observable} from "mobx";
import {observer} from "mobx-react";
import Sources from "./Sources";
import * as styles from "../../../styles/main.scss";
import ConfigStore from "../../stores/config";
import UiStore from "../../stores/ui";
import ScenesStore from "../../stores/scenes";

const configStore = new ConfigStore();
const uiStore = new UiStore();
const scenesStore = new ScenesStore();

function saveStores()
{
	configStore.saveSync(configStore);
	uiStore.saveSync(uiStore);
	scenesStore.saveSync(scenesStore);
}

@observer
export default class Main extends React.Component<any, any>
{
	@observable loaded = false;

	async componentDidMount()
	{
		await configStore.init();
		await uiStore.init();
		await scenesStore.init();
		this.loaded = true;

		remote.app.on("before-quit", saveStores);
		console.log(this.context);
	}

	componentWillUnmount()
	{
		remote.app.removeListener("before-quit", saveStores);
	}

	render()
	{
		return this.loaded ? (
			<Layout>
				<Panel>
					<div className={styles.panelContent}>

					</div>
					<footer className={styles.footer}>
						<Sources scenesStore={scenesStore} />
					</footer>
				</Panel>
			</Layout>
		) : (
			<div style={{display: "flex", height: "100%"}}>
				<ProgressBar className={styles.progressBar} type="circular" mode="indeterminate" />
			</div>
		);
	}
}
