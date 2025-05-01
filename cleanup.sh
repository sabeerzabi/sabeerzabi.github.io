#!/bin/bash
# Enable extended globbing to include hidden files in pattern matching
shopt -s extglob dotglob

# Remove all files and directories except the allowed ones.
rm -rf -- !("cleanup.sh"|"Backup"|"dist"|".gitignore"|".git"|"node_modules"|"music")

# If the 'dist' directory exists, move all its files to the current directory
if [ -d "dist" ]; then
  mv dist/* ./
fi

php -S localhost:8034