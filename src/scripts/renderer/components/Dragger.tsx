import * as React from "react";
import {observable} from "mobx";
import {observer} from "mobx-react";
import UiStore from "../../stores/ui";
import styles from "../../../styles/dragger.scss";

interface DraggerProps
{
	uiStore: UiStore;
	min: number;
	max: number;
}

@observer
export default class Dragger extends React.Component<DraggerProps, any>
{
	@observable element: HTMLElement;
	@observable dragging = false;

	onMouseDown = () => {
		this.dragging = true;
		document.documentElement.style.cursor = "ns-resize";
	};

	onMouseMove = (e: MouseEvent) => {
		if (!this.dragging) return;

		const client = e.clientY;
		const movement = e.movementY;
		// get the top bound
		const rect = this.element.getBoundingClientRect();
		const bound = rect.top;
		// don't resize if mouse is not at edge of element
		if ((movement < 0 && client > bound) || (movement > 0 && client < bound)) return;

		this.updateProp(Math.max(
			this.props.min,
			Math.min(
				this.props.uiStore.footerHeight - movement,
				this.props.max
			)
		));
	};

	onMouseUp = () => {
		this.dragging = false;
		document.documentElement.style.cursor = null;
	};

	setElement = (el: any) => {
		this.element = el;
		this.updateProp(this.props.uiStore.footerHeight);
	};

	componentDidMount()
	{
		document.addEventListener("mousemove", this.onMouseMove);
		document.addEventListener("mouseup", this.onMouseUp);
	}

	updateProp(prop: number)
	{
		this.props.uiStore.footerHeight = prop;
		(this.element as HTMLElement).style.height = prop + "px";
	}

	render()
	{
		return (
			<div className={styles.dragger}
				onMouseDown={this.onMouseDown} />
		);
	}
}
