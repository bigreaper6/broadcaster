import {remote, app} from "electron";
import {join} from "path";
import {writeFile, writeFileSync, readFile} from "mz/fs";

function replacer(key: string, value: string)
{
	if (key.startsWith("_")) return;
	else return value;
}

export default class Storage<T>
{
	private _isWriting: boolean;
	private _path: string;

	constructor(...fileName: string[])
	{
		this._path = join((app || remote.app).getPath("userData"), ...fileName);
	}

	async load(data: {new(): T}): Promise<T>
	{
		try
		{
			const data = await readFile(this._path, "utf8");
			return JSON.parse(data);
		}
		catch (e)
		{
			if (e.code == "ENOENT") return new data();
			else throw e;
		}
	}

	async save(data: T)
	{
		if (this._isWriting) return;

		this._isWriting = true;
		await writeFile(this._path, JSON.stringify(data, replacer));
		this._isWriting = false;
	}

	saveSync(data: T)
	{
		if (this._isWriting) return;

		this._isWriting = true;
		writeFileSync(this._path, JSON.stringify(data, replacer));
		this._isWriting = false;
	}
}
