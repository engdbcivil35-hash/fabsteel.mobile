FabSteel installable PWA. Free community release. Dedicated to the engineering community of Iran. See README-FA.md for setup and limitations.


## Section area calculation update

The app now accumulates verified cross-sectional area as per-piece area multiplied by quantity. Plate area is thickness × width. IPE / HEA / HEB / UPN and rebar values are selected from embedded nominal section tables; angle selections use a limited EN 10056-1:2017 equal-leg table. Cold-formed welded box sections and circular hollow sections use the corresponding equations in EN 10219-2:2019 Annex A. Z sections require the actual catalogue area rather than a guessed value. Existing local rows are re-evaluated where their dimensions or profile designation are recoverable; incomplete legacy rows are flagged and excluded from the verified total until corrected.

All features in this release are free, without a trial period or licence gate.

Note: The embedded IPE/HEA/HEB/UPN size list uses common sizes from DIN EN 10365:2017-05. DIN EN 10365:2026-09 supersedes that edition and adds dimensions. Enter the catalogue cross-sectional area A and exact designation for any newer or unlisted size; the app does not guess missing values.
