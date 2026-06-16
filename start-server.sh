#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"
while true; do
  node node_modules/next/dist/bin/next dev -p 3000 -H 0.0.0.0
  echo "Server exited, restarting..." >> "$SCRIPT_DIR/dev.log"
  sleep 3
done
