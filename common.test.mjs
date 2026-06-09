import assert from "node:assert";
import test from "node:test";
import { countUsers, isFridayNight, getTopKey } from "./common.mjs";

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
