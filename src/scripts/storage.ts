import {remote, app} from "electron";
import {join} from "path";
import {writeFile, writeFileSync, readFile} from "mz/fs";

function replacer(storage: any, key: string, value: string)
{
	if (storage._noSerialize.includes(key)) return;
	else return value;
}

export default class Storage<T extends Storage<any>>
{
	@noSerialize private _args: any[];
	@noSerialize private _isWriting: boolean;
	@noSerialize private _path: string;
	@noSerialize _noSerialize: string[];
	@noSerialize _serializeWith: Map<string, [Function, Function | undefined]>;

	constructor(fileName: string, ...args: any[])
	{
		this._args = args;
		this._path = join((app || remote.app).getPath("userData"), fileName);
	}

	private deserialize(data: any)
	{
		if (!this._serializeWith) return data;
		for (let entry of this._serializeWith.entries())
		{
			const name = entry[0];
			const deserialize = entry[1][0];
			data[name] = deserialize(data[name], this);
		}

		return data;
	}

	private serialize(data: any)
	{
		if (!this._serializeWith) return data;
		for (let entry of this._serializeWith.entries())
		{
			const name = entry[0];
			const serialize = entry[1][1];
			if (!serialize) break;

			data[name] = serialize(data[name], this);
		}

		return data;
	}

	async load(data: {new(..._: any[]): T}): Promise<T>
	{
		try
		{
			const data = await readFile(this._path, "utf8");
			return this.deserialize(JSON.parse(data));
		}
		catch (e)
		{
			if (e.code == "ENOENT") return this.deserialize(new data(this._args));
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
	if (!target._noSerialize) target._noSerialize = ["_blocked"];
	target._noSerialize.push(key);
}

export function serializeWith<T extends Storage<any>>(deserialize: (obj: any, self: T) => any, serialize?: (obj: any, self: T) => any)
{
	return (target: Storage<T>, key: string) => {
		if (!target._serializeWith) target._serializeWith = new Map();
		target._serializeWith.set(key, [deserialize, serialize]);
	}
}
