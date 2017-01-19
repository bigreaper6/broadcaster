import * as React from "react";
import {observer} from "mobx-react";
import t from "../../i18n";
import UiStore from "../../stores/ui";
import {Source} from "../../stores/scenes";
import {List, ListItem} from "./List";

interface SourcesProps
{
	uiStore: UiStore;
}

@observer
export default class Sources extends React.Component<SourcesProps, any>
{
	addSource = () => {
		const {currentScene} = this.props.uiStore;
		const source = new Source();
		source.name = "Source " + (currentScene.sources.length + 1);
		currentScene.addSource(source);
	}

	render()
	{
		const {currentScene} = this.props.uiStore;
		return (
			<div style={{flex: 1}}>
				<p>{currentScene.name} - {t("sources.listTitle")}</p>
				<button onClick={this.addSource}>Add Source</button>
				<List>
					{currentScene.sources.map(s =>
						<ListItem key={s.name} name={s.name} />)}
				</List>
			</div>
		);
	}
}
