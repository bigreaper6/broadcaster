import * as React from "react";
import {observable} from "mobx";
import {observer} from "mobx-react";
import UiStore from "../../stores/ui";
import styles from "../../../styles/dragger.scss";

interface DraggerProps
{
	uiStore: UiStore;
	property: "width" | "height";
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

		// get client(x/y) and movement(x/y) depending on property
		const client = this.props.property == "height" ? e.clientY : e.clientX;
		const movement = this.props.property == "height" ? e.movementY : e.movementX;
		// get the left or right bound
		const rect = this.element.getBoundingClientRect();
		const bound = this.props.property == "height" ? rect.top : rect.right;
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

		const style = window.getComputedStyle(this.element);
		this.updateProp(parseInt(style[this.props.property] as string));
	};

	componentDidMount()
	{
		document.addEventListener("mousemove", this.onMouseMove);
		document.addEventListener("mouseup", this.onMouseUp);
	}

	updateProp(prop: number)
	{
		this.props.uiStore.footerHeight = prop;
		(this.element as HTMLElement).style[this.props.property] = prop + "px";
	}

	render()
	{
		return (
			<div className={styles.dragger}
				onMouseDown={this.onMouseDown} />
		);
	}
}
