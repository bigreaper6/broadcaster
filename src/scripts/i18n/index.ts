import {remote, app} from "electron";

import i18next from "i18next";

let t;
i18next
	.use({
		init: () => {},
		type: "languageDetector",
		detect: () => (app || remote.app).getLocale(),
		cacheUserLanguage: () => {}
	})
	.init({
		resources: {
			"en-US": {
				translation: require("./translations/en-US.json")
			}
		}
	}, (_, _t) => t = _t);

export default t as any as i18next.TranslationFunction;
