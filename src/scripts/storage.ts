import {remote, app} from "electron";
import {join} from "path";
import {writeFile, writeFileSync, readFile} from "mz/fs";

function replacer(storage: any, key: string, value: string)
{
	if (storage._blocked.includes(key)) return;
	else return value;
}

export default class Storage<T>
{
	@noSerialize private _isWriting: boolean;
	@noSerialize private _path: string;

	constructor(...fileName: string[])
	{
		this._path = join((app || remote.app).getPath("userData"), ...fileName);
	}

	deserialize(data: any): any
	{
		return data;
	}

	serialize(data: any): any
	{
		return data;
	}

	async load(data: {new(): T}): Promise<T>
	{
		try
		{
			const data = await readFile(this._path, "utf8");
			return JSON.parse(this.deserialize(data));
		}
		catch (e)
		{
			if (e.code == "ENOENT") return new data();
			else throw e;
		}
	}

	async save()
	{
		if (this._isWriting) return;

		this._isWriting = true;
		await writeFile(this._path, JSON.stringify(this.serialize(this), replacer.bind(null, this)));
		this._isWriting = false;
	}

	saveSync()
	{
		if (this._isWriting) return;

		this._isWriting = true;
		writeFileSync(this._path, JSON.stringify(this.serialize(this), replacer.bind(null, this)));
		this._isWriting = false;
	}
}

export function noSerialize(target: any, key: string)
{
	if (!target._blocked) target._blocked = ["_blocked"];
	target._blocked.push(key);
}
