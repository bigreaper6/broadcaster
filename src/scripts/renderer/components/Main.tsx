import * as React from "react";
import {remote} from "electron";
import {observable} from "mobx";
import {observer} from "mobx-react";
import ConfigStore from "../../stores/config";
import ScenesStore from "../../stores/scenes";
import UiStore from "../../stores/ui";
import * as styles from "../../../styles/main.scss";
import Sources from "./Sources";
import Dragger from "./Dragger";

const configStore = new ConfigStore();
const scenesStore = new ScenesStore();
const uiStore = new UiStore(scenesStore);

function saveStores()
{
	configStore.saveSync();
	scenesStore.saveSync();
	uiStore.saveSync();
}

@observer
export default class Main extends React.Component<any, any>
{
	@observable loaded = false;

	async componentDidMount()
	{
		await configStore.init();
		await scenesStore.init();
		await uiStore.init();
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
						min={200} max={window.innerHeight - 100} />

					<Sources uiStore={uiStore} />
				</footer>
			</div>
		) : (
			<div style={{display: "flex", height: "100%"}}>
				{/* TODO: loading screen? */}
			</div>
		);
	}
}
