#!/bin/bash

cat README.src.markdown | sed "s/__SRC__/$(cat blogger-editor-ext-bookmarklet.txt)/g" > README.markdown

echo "Generatin README.markdown done."
