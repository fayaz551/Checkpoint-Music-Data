# Test Documentation

This document explains how each core feature and rubric item of the music data project was tested and verified for accuracy.

## Rubric Item 1: Populate User Selection Dropdown
* **Requirement:** The dashboard must dynamically populate the selection menu with all available user IDs loaded from the data module.
* **Testing Method:** Manual Verification
* **Steps Taken:** 
  1. Launched the application via a local development server.
  2. Verified that the drop-down menu initializes with the standard placeholder.
  3. Checked that the element correctly pulls and displays the 4 active IDs `["1", "2", "3", "4"]`.

---

## Rubric Item 2: User Validation and Counting
* **Requirement:** The system must accurately determine the total number of users present in the system dataset.
* **Testing Method:** Unit tests in `common.test.mjs`
* **Details:** The automated test suite validates the counting behavior:
* Test case `"User count is correct"` ensures `countUsers()` correctly processes the system data array and evaluates to exactly `4`.

---

## Rubric Item 3: Friday Night Timeframe Identification
* **Requirement:** The application must accurately flag whether a specific listen event occurred within the target Friday night window.
* **Testing Method:** Unit tests in `common.test.mjs`
* **Details:** The automated test suite validates boundary dates using native Node assertions:
* Test case `"isFridayNight correctly identifies windows"` passes edge-case `Date` objects to ensure true positives and true negatives are handled correctly near boundaries.

---

## Rubric Item 4: Top Key Extraction Logic
* **Requirement:** The system must evaluate a calculated Map of items and return the key with the maximum frequency or time value.
* **Testing Method:** Unit tests in `common.test.mjs`
* **Details:** Automated logical checks verify map sorting calculations:
* Test case `"getTopKey returns correct key"` mocks an out-of-order dataset (`Map([['A', 10], ['B', 50], ['C', 20]])`) and asserts that `'B'` is correctly selected as the maximum element.



## Rubric Item 5: Empty Metric Calculations
* **Requirement:** The computation algorithms must gracefully handle scenarios where a user has zero recorded history or empty datasets.
* **Testing Method:** Unit tests in `common.test.mjs`
* **Details:** Boundary handling is covered within the automated suite:
* Test case `"calculateStats returns null for empty data"` passes an empty array `[]` into the calculator and asserts that the program returns `null` safely rather than crashing.

---

## Rubric Item 6: Metric Cards Layout and Visuals
* **Requirement:** The dashboard grid and metric cards (Count, Time, Friday Night Favorites) must match styling requirements and stack correctly.
* **Testing Method:** Browser UI Inspection
* **Steps Taken:** 
  1. Opened Google Chrome Developer Tools.
  2. Inspected the grid structure defined in `style.css` to verify box sizing and item placement.
  3. Switched between mobile and desktop viewport profiles to guarantee that grid elements break cleanly onto new rows without clipping text.