#!/bin/bash

echo -n 'javascript:' > tmp01.txt
cat blogger-editor-ext.js | jsmin  | tr -t '\n' ';' | xxd -plain | tr -d '\n'  | sed 's/\(..\)/%\1/g' > tmp02.txt
cat tmp01.txt tmp02.txt > blogger-editor-ext-bookmarklet.txt
rm tmp01.txt tmp02.txt
echo "done."
