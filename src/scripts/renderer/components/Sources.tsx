import * as React from "react";
import {computed} from "mobx";
import {observer} from "mobx-react";
import t from "../../i18n";
import ScenesStore from "../../stores/scenes";
import UiStore from "../../stores/ui";
import {Scene, Source} from "../../stores/scenes";
import * as styles from "../../../styles/sources.scss";

interface SourcesProps
{
	scenesStore: ScenesStore;
	uiStore: UiStore;
}

@observer
export default class Sources extends React.Component<SourcesProps, any>
{
	@computed
	get currentScene(): Scene
	{
		return this.props.scenesStore.scenes
			.find(s => s.name == this.props.uiStore.currentScene) as Scene;
	}

	onSceneChange(scene: Scene)
	{
		this.props.uiStore.currentScene = scene.name;
	}

	render()
	{
		return (
			<div>
				<p>Sources</p>
				<ul>
					{this.currentScene.sources.map(source =>
						<SourceItem source={source} />)}
				</ul>
			</div>
		);
	}
}

interface SourceItemProps
{
	source: Source
}

@observer
class SourceItem extends React.Component<SourceItemProps, any>
{
	render()
	{
		return (
			<li>Item</li>
		);
	}
}
