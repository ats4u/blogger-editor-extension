#!/bin/bash

cat README.src.markdown | sed "s/__SRC__/$(cat blogger-editor-ext-bookmarklet.txt)/g" > README.markdown
echo "Generating README.markdown done."

cat blogger-editor-ext-bookmarklet.src.html | sed "s/__SRC__/$(cat blogger-editor-ext-bookmarklet.txt)/g" > blogger-editor-ext-bookmarklet.html
echo "Generating blogger-editor-ext-bookmarklet.html done."
