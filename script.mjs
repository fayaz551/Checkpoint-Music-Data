import { getUserIDs, getListenEvents, getSong } from "./data.mjs";
import { calculateStats } from "./common.mjs";

const picker = document.getElementById("user-picker");
const display = document.getElementById("stats-display");

getUserIDs().forEach(id => {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = `User ${id}`;
    picker.appendChild(opt);
});