import {observable, action} from "mobx";
import t from "../i18n";
import Storage, {serializeWith} from "../storage";

export default class ScenesStore extends Storage<ScenesStore>
{
	@serializeWith<ScenesStore>(
		arr => arr.map((s: any) => {
			const scene = new Scene();
			Object.assign(scene, s);
			return scene;
		})
	)
	@observable scenes: Scene[] = [new Scene()];

	constructor()
	{
		super("scenes.json");
	}

	@action
	async init()
	{
		const data = await this.load(ScenesStore);
		Object.assign(this, data);
	}

	@action.bound
	addScene(scene: Scene)
	{
		this.scenes.push(scene);
	}
}

export class Scene
{
	@observable name: string = t("scenes.defaultName");
	@observable sources: Source[] = [];

	@action.bound
	addSource(source: Source)
	{
		this.sources.push(source);
	}
}

export class Source
{
	@observable name: string = "";
}
