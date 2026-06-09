import assert from "node:assert";
import test from "node:test";
import { countUsers, isFridayNight, getTopKey, calculateStats } from "./common.mjs";

test("User count is correct", () => {
  assert.equal(countUsers(), 4);
});

test("isFridayNight correctly identifies windows", () => {
    assert.strictEqual(isFridayNight(new Date("2024-08-02T17:00:00")), true);
    assert.strictEqual(isFridayNight(new Date("2024-08-03T03:59:59")), true);
    assert.strictEqual(isFridayNight(new Date("2024-08-02T16:59:59")), false);
    assert.strictEqual(isFridayNight(new Date("2024-08-03T04:00:00")), false);
});

test("getTopKey returns correct key", () => {
    const sample = new Map([['A', 10], ['B', 50], ['C', 20]]);
    assert.strictEqual(getTopKey(sample), 'B');
});

test("calculateStats returns null for empty data", () => {
    const result = calculateStats([], () => null);
    assert.strictEqual(result, null);
});

test("calculateStats returns null for no listen events", () => {
    const result = calculateStats(null, () => null);
    assert.strictEqual(result, null);
});

test("calculateStats calculates top song by count correctly", () => {
    const mockSongs = {
        "song-1": { id: "song-1", artist: "Artist A", title: "Song 1", duration_seconds: 180, genre: "Pop" },
        "song-2": { id: "song-2", artist: "Artist B", title: "Song 2", duration_seconds: 200, genre: "Rock" }
    };
    
    const listens = [
        { timestamp: "2024-08-01T10:00:00", song_id: "song-1" },
        { timestamp: "2024-08-01T11:00:00", song_id: "song-1" },
        { timestamp: "2024-08-01T12:00:00", song_id: "song-2" }
    ];
    
    const getSongMock = (id) => mockSongs[id];
    const result = calculateStats(listens, getSongMock);
    
    assert.strictEqual(result.topSongCount.id, "song-1", "Top song by count should be song-1");
    assert.strictEqual(result.topSongTime.id, "song-1", "Top song by time should be song-1");
});

test("calculateStats tracks longest listen streak", () => {
    const mockSongs = {
        "song-1": { id: "song-1", artist: "Artist A", title: "Song 1", duration_seconds: 180, genre: "Pop" },
        "song-2": { id: "song-2", artist: "Artist B", title: "Song 2", duration_seconds: 200, genre: "Rock" }
    };
    
    const listens = [
        { timestamp: "2024-08-01T10:00:00", song_id: "song-1" },
        { timestamp: "2024-08-01T11:00:00", song_id: "song-1" },
        { timestamp: "2024-08-01T12:00:00", song_id: "song-1" },
        { timestamp: "2024-08-01T13:00:00", song_id: "song-2" },
        { timestamp: "2024-08-01T14:00:00", song_id: "song-2" }
    ];
    
    const getSongMock = (id) => mockSongs[id];
    const result = calculateStats(listens, getSongMock);
    
    assert.strictEqual(result.maxStreak, 3, "Max streak should be 3");
});

test("calculateStats identifies every day songs", () => {
    const mockSongs = {
        "song-1": { id: "song-1", artist: "Artist A", title: "Song 1", duration_seconds: 180, genre: "Pop" }
    };
    
    const listens = [
        { timestamp: "2024-08-01T10:00:00", song_id: "song-1" },
        { timestamp: "2024-08-02T10:00:00", song_id: "song-1" },
        { timestamp: "2024-08-03T10:00:00", song_id: "song-1" }
    ];
    
    const getSongMock = (id) => mockSongs[id];
    const result = calculateStats(listens, getSongMock);
    
    assert.strictEqual(result.everyDaySongs.length, 1, "Should have one every-day song");
    assert.strictEqual(result.everyDaySongs[0].id, "song-1");
});
