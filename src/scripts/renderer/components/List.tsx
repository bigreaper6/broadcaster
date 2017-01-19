import * as React from "react";
import styles from "../../../styles/list.scss";

export class List extends React.Component<any, any>
{
	render()
	{
		return (
			<ul className={styles.list}>{this.props.children}</ul>
		);
	}
}

interface ListItemProps
{
	name: string;
}

export class ListItem extends React.Component<ListItemProps, any>
{
	render()
	{
		return (
			<li className={styles.item}>{this.props.name}</li>
		);
	}
}

