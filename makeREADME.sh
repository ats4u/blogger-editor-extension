#!/bin/bash

cat README.src.markdown | sed "s/__SRC__/$(cat blogger-editor-ext-bookmarklet.txt)/g" > README.markdown
echo "Generating README.markdown done."

cat README.markdown | markdown README.markdown  | sed 's/<p>/<div class="par">/g' | sed 's/<\/p>/<\/div>/g' > README.blogger.html
echo -n -e "<style>\n.par{\nmargin:10px 0px;\n}\n</style>\n\n" >> README.blogger.html
echo "Generating README.blogger.html done."

cat blogger-editor-ext-bookmarklet.src.html | sed "s/__SRC__/$(cat blogger-editor-ext-bookmarklet.txt)/g" > blogger-editor-ext-bookmarklet.html
echo "Generating blogger-editor-ext-bookmarklet.html done."
