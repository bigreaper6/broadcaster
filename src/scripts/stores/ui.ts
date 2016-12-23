import {action} from "mobx";
import Storage from "../storage";

export default class UiStore extends Storage<UiStore>
{
	constructor()
	{
		super("ui.json");
	}

	@action
	async init()
	{
		const data = await this.load(UiStore);
		Object.assign(this, data);
	}
}
