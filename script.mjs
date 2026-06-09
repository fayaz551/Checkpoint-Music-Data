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

picker.addEventListener("change", (e) => {
    const userId = e.target.value;
    if (!userId) {
        display.hidden = true;
        return;
    }

    const eventsData = getListenEvents(userId);
    const listens = eventsData[userId];
    const stats = calculateStats(listens, getSong);

    if (!stats) {
        display.hidden = true;
        return;
    }

    display.hidden = false;

    updateUI("q-song-count", "val-song-count", stats.topSongCount ? `${stats.topSongCount.artist} - ${stats.topSongCount.title}` : null);
    updateUI("q-song-time", "val-song-time", stats.topSongTime ? `${stats.topSongTime.artist} - ${stats.topSongTime.title}` : null);
    updateUI("q-artist-count", "val-artist-count", stats.topArtistCount);
    updateUI("q-artist-time", "val-artist-time", stats.topArtistTime);
    updateUI("q-friday-count", "val-friday-count", stats.topFridayCount ? `${stats.topFridayCount.artist} - ${stats.topFridayCount.title}` : null);
    updateUI("q-friday-time", "val-friday-time", stats.topFridayTime ? `${stats.topFridayTime.artist} - ${stats.topFridayTime.title}` : null);
    
    const streakInfo = stats.maxStreak > 0 ? `${stats.streakSongs.map(s => s.title).join(", ")} (${stats.maxStreak} in a row)` : null;
    updateUI("q-streak", "val-streak", streakInfo);

    const everyDayInfo = stats.everyDaySongs.length > 0 ? stats.everyDaySongs.map(s => s.title).join(", ") : null;
    updateUI("q-everyday", "val-everyday", everyDayInfo);

    if (stats.topGenres.length > 0) {
        const n = Math.min(stats.topGenres.length, 3);
        const titles = { 1: "Top Genre", 2: "Top Two Genres", 3: "Top Three Genres" };
        document.getElementById("genre-title").textContent = titles[n];
        updateUI("q-genres", "val-genres", stats.topGenres.slice(0, n).join(", "));
    } else {
        updateUI("q-genres", "val-genres", null);
    }
});