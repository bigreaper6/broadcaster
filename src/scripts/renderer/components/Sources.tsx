import * as React from "react";
import {Button, Card, CardTitle, CardActions, Dropdown, List, ListItem} from "react-toolbox";
import {computed, observable} from "mobx";
import {observer} from "mobx-react";
import t from "../../i18n";
import * as cardStyles from "../../../styles/themes/card.scss";
import * as styles from "../../../styles/sources.scss";
import ScenesStore from "../../stores/scenes";
import {Scene, Source} from "../../stores/scenes";

interface SourcesProps
{
	scenesStore: ScenesStore
}

@observer
export default class Sources extends React.Component<SourcesProps, any>
{
	@observable scene: Scene;

	componentWillMount()
	{

	}


	@computed
	get dropdownSource()
	{
		return this.props.scenesStore.scenes
			.map(s => ({
				value: s,
				label: s.name
			}));
	}

	onSceneChange(scene: Scene)
	{
		this.scene = scene;
	}

	render()
	{
		return (
			<Card className={styles.card}>
				<CardTitle className={cardStyles.small}>
					<Dropdown onChange={this.onSceneChange.bind(this)} label={t("scenes.current")} source={this.dropdownSource} value={this.scene.name} />
				</CardTitle>

				<CardActions>
					<Button icon="add" onMouseDown={() => {
						this.scene.sources.push({name: "Source X"});
					}}/>
					<List selectable>
						{this.scene.sources.map(source =>
							<SourceItem source={source} />)}
					</List>
				</CardActions>
			</Card>
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
			<ListItem
				caption={this.props.source.name}
				leftIcon="visibility"
				rightIcon="close" />
		);
	}
}
