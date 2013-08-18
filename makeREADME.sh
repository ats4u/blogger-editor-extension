#!/bin/bash

cat README.markdown.src | sed "s/__SRC__/$(cat blogger-editor-ext-bookmarklet.txt)/g" > README.markdown
echo "done."
