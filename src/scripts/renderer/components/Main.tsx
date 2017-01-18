import * as React from "react";
import {remote} from "electron";
import {observable} from "mobx";
import {observer} from "mobx-react";
import ConfigStore from "../../stores/config";
import UiStore from "../../stores/ui";
import ScenesStore from "../../stores/scenes";
import * as styles from "../../../styles/main.scss";
import Sources from "./Sources";
import Dragger from "./Dragger";

const configStore = new ConfigStore();
const uiStore = new UiStore();
const scenesStore = new ScenesStore();

function saveStores()
{
	configStore.saveSync();
	uiStore.saveSync();
	scenesStore.saveSync();
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
		(window as any)["save"] = saveStores;

		remote.app.on("before-quit", saveStores);
	}

	componentWillUnmount()
	{
		remote.app.removeListener("before-quit", saveStores);
	}

	render()
	{
		return this.loaded ? (
			<div className={styles.container}>
				<section className={styles.preview}>

				</section>
				<footer className={styles.footer} ref={e => (this.refs["dragger"] as any).setElement(e)}>
					<Dragger ref="dragger" uiStore={uiStore}
						property="height" min={200} max={window.innerHeight - 100} />

					<Sources uiStore={uiStore} scenesStore={scenesStore} />
				</footer>
			</div>
		) : (
			<div style={{display: "flex", height: "100%"}}>
				{/* TODO: loading screen? */}
			</div>
		);
	}
}
