import {action, observable} from "mobx";
import Storage, {noSerialize, serializeWith} from "../storage";
import ScenesStore, {Scene} from "./scenes";

export default class UiStore extends Storage<UiStore>
{
	@noSerialize _scenesStore: ScenesStore;
	@serializeWith<UiStore>(
		(name, self) => self._scenesStore.scenes.filter((s: any) => s.name == name)[0],
		s => s.name
	)
	@observable currentScene: Scene = "Scene" as any;
	@observable footerHeight: number = 250;

	constructor(scenesStore: ScenesStore)
	{
		super("ui.json");
		this._scenesStore = scenesStore;
	}

	@action
	async init()
	{
		const data = await this.load(UiStore);
		Object.assign(this, data);
	}
}
