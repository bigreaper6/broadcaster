import {observable, computed, action} from "mobx";
import Storage from "../storage";

export default class ScenesStore extends Storage<ScenesStore>
{
	@observable _currentScene: string = "Scene";
	@observable scenes: Scene[] = [new Scene()];

	constructor()
	{
		super("scenes.json");
	}

	@computed
	get currentScene(): Scene
	{
		return this.scenes.find(s => s.name == this._currentScene) as Scene;
	}

	@action
	async init()
	{
		const data = await this.load(ScenesStore);
		Object.assign(this, data);
		this.scenes = [];
		data.scenes.forEach(s => this.scenes.push(new Scene(s)));
	}

	@action
	addScene(scene: Scene)
	{
		this.scenes.push(scene);
	}

}

export class Scene
{
	@observable name: string = "Scene";
	@observable sources: Source[] = [];

	constructor(data?: Scene)
	{
		if (!data) return;

		Object.assign(this, data);
		this.sources = [];
		data.sources.forEach(s => this.sources.push(new Source(s)));
	}
}

export class Source
{
	@observable name: string = "";

	constructor(data?: Source)
	{
		if (!data) return;

		Object.assign(this, data);
	}
}
