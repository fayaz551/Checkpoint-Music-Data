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

export function calculateStats(listens, getSong) {
    if (!listens || listens.length === 0) return null;

    const songCounts = new Map();
    const songTimes = new Map();
    const artistCounts = new Map();
    const artistTimes = new Map();
    const fridayCounts = new Map();
    const fridayTimes = new Map();
    const genreCounts = new Map();
    const allDays = new Set();
    const songDays = new Map();

    let maxStreak = 0;
    let maxStreakSongs = [];
    let currentSongId = null;
    let currentStreak = 0;

    for (const event of listens) {
        const songId = event.song_id;
        const song = getSong(songId);
        if (!song) continue;

        const duration = song.duration_seconds;
        const artist = song.artist;
        const genre = song.genre;

        songCounts.set(songId, (songCounts.get(songId) || 0) + 1);
        songTimes.set(songId, (songTimes.get(songId) || 0) + duration);

        artistCounts.set(artist, (artistCounts.get(artist) || 0) + 1);
        artistTimes.set(artist, (artistTimes.get(artist) || 0) + duration);

        genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);

        const date = new Date(event.timestamp);
        const dayStr = date.toDateString();
        allDays.add(dayStr);

        if (!songDays.has(songId)) {
            songDays.set(songId, new Set());
        }
        songDays.get(songId).add(dayStr);

        if (isFridayNight(date)) {
            fridayCounts.set(songId, (fridayCounts.get(songId) || 0) + 1);
            fridayTimes.set(songId, (fridayTimes.get(songId) || 0) + duration);
        }

        if (songId === currentSongId) {
            currentStreak++;
        } else {
            if (currentStreak > maxStreak) {
                maxStreak = currentStreak;
                maxStreakSongs = [currentSongId];
            } else if (currentStreak === maxStreak && maxStreak > 0) {
                maxStreakSongs.push(currentSongId);
            }
            currentSongId = songId;
            currentStreak = 1;
        }
    }

    if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
        maxStreakSongs = [currentSongId];
    } else if (currentStreak === maxStreak && maxStreak > 0) {
        maxStreakSongs.push(currentSongId);
    }

    const everyDaySongIds = [];
    for (const [songId, days] of songDays.entries()) {
        if (days.size === allDays.size) {
            everyDaySongIds.push(songId);
        }
    }

    const sortedGenres = [...genreCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);

    return {
        topSongCount: getSong(getTopKey(songCounts)),
        topSongTime: getSong(getTopKey(songTimes)),
        topArtistCount: getTopKey(artistCounts),
        topArtistTime: getTopKey(artistTimes),
        topFridayCount: getSong(getTopKey(fridayCounts)),
        topFridayTime: getSong(getTopKey(fridayTimes)),
        maxStreak,
        streakSongs: [...new Set(maxStreakSongs)].map(id => getSong(id)),
        everyDaySongs: everyDaySongIds.map(id => getSong(id)),
        topGenres: sortedGenres
    };
}