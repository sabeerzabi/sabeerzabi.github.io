#!/bin/bash

# converting JPEG images
find $1 -type f -and \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) \
-exec bash -c '
webp_path=$(sed 's/\.[^.]*$/.webp/' <<< "$0");
if [ ! -f "$webp_path" ]; then
  cwebp -quiet -q 90 "$0" -o "$webp_path";
fi;' {} \;

# converting PNG images lossless, lossy
find $1 -type f -and -iname "*.png" \
-exec bash -c '
webp_path=$(sed 's/\.[^.]*$/.webp/' <<< "$0");
if [ ! -f "$webp_path" ]; then
  cwebp -quiet -lossy "$0" -o "$webp_path";
fi;' {} \;