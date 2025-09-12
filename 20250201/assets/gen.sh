#!/bin/bash
set -euo pipefail

# Find the web.*.js file (should only be one)
webfile=$(ls web.*.js)

# Extract and rewrite asset paths from the web.*.js file
grep -oE '["'\''"]/assets/[^"'\'' ]+' "$webfile" \
  | sed -E 's@["'\'']?/assets/@https://canary.discord.com/assets/@' \
  > assetslist

# Extract and rewrite asset paths from all other .js files (excluding web.*.js)
grep -h -oE '["'\''"]/assets/[^"'\'' ]+' $(ls *.js | grep -v "^$webfile$") \
  | sed -E 's@["'\'']?/assets/@https://canary.discord.com/assets/@' \
  > assetslist2

# Extract chunk hex hashes only (16–32 chars, must contain at least one a–f)
grep -hoE '"[0-9]+":"[0-9a-f]{16,32}"' *.js \
  | grep -E '[a-f]' \
  | sed -E 's/"[0-9]+":"([0-9a-f]{16,32})"/https:\/\/canary.discord.com\/assets\/\1.js/' \
  | sort -u \
  > assetslist3
