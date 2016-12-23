import installExtension, {REACT_DEVELOPER_TOOLS} from "electron-devtools-installer";

function installExtensions(): Promise<void>
{
	return installExtension(REACT_DEVELOPER_TOOLS)
		.then(name => console.log(`Installed extension: ${name}`))
		.catch(err => console.log(`Error installing extension: ${err}`));
}

export function init()
{
	installExtensions();
}
