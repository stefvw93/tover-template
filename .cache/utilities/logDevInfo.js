import { styleController } from "../style/styleController";
const devInfoKey = "__devInfoLogsAmount__";
export function logDevInfo() {
    if (process.env.NODE_ENV === "development") {
        window[devInfoKey] = window[devInfoKey] || 0;
        if (window[devInfoKey] === 0) {
            const infoTag = "Afbouwkeur development 🔧 by Hulan 🦡";
            const apiURL = process.env.API_URL;
            const name = process.env.NAME;
            console.groupCollapsed("%c" + infoTag, "color: lightgreen;");
            console.log("App general info:", {
                apiURL,
                name,
                styleController
            });
            console.groupEnd();
            window[devInfoKey]++;
        }
    }
}
