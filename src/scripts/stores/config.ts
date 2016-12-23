import {action} from "mobx";
import Storage from "../storage";

export default class ConfigStore extends Storage<ConfigStore>
{
	constructor()
	{
		super("config.json");
	}

	@action
	async init()
	{
		const data = await this.load(ConfigStore);
		Object.assign(this, data);
	}
}
