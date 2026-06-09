import { getUserIDs } from "./data.mjs";

export const countUsers = () => getUserIDs().length;

export function getTopKey(map) {
    let maxVal = -1;
    let topKey = null;
    for (const [key, val] of map.entries()) {
        if (val > maxVal) {
            maxVal = val;
            topKey = key;
        }
    }
    return topKey;
}

export function isFridayNight(date) {
    const day = date.getDay();
    const hour = date.getHours();
    if (day === 5 && hour >= 17) return true;
    if (day === 6 && hour < 4) return true;
    return false;
}

