A Bookmarklet to Extend Blogger's Rich Text Editor
==================================================

- Author: Ats Oka
- mailto: oka.ats@gmail.com

--------------------------------------------------
### Abstract

This is a bookmarklet to extend Blogger's rich text editor.


This bookmarklet effectively add some functions to the Blogger's default editor as below :

- Add some functions to manipulate HTML without entering HTML editor mode :
    - Show HTML code of current selection and edit it.
    - Insert specific HTML code .
    - Apply arbitrary block tag to the selection.
    - Insert `<br/>` and `<hr/>` tag

- Add some keyboard shortcuts to frequently used functions.
- Disable some keyboard shortcuts such as F5/CTRL+R to prevend lost data by
  accidental reload.
  
--------------------------------------------------
### The Bookmarklet

The icon below is the bookmarklet.

<center style="margin:30px 00px;">
<a href="__src__"><img src="http://2.bp.blogspot.com/-zMNlXDR9uco/Ug8Ko-UBdKI/AAAAAAAAElU/pJd6kpO8k_A/s1600/blogger-editor-extension.png"/></a>
</center>
 
Right click this icon and save its link to your bookmark to accomplish our goal.

--------------------------------------------------
### How to Start the Extension

Open Blogger's text editor and click the previously saved bookmark on your bookmark collection, as below :

<div style="clear: both; text-align: center;margin:20px 0px;">
<a target="_blank" href="http://2.bp.blogspot.com/-IxwHLSchhK0/Ug8Tap-ReCI/AAAAAAAAEl4/QOx-GsYc1sg/s1600/blogger-editor-extension-descjp-02.jpeg" imageanchor="1" >
<img border="0" height="207" src="http://2.bp.blogspot.com/-IxwHLSchhK0/Ug8Tap-ReCI/AAAAAAAAEl4/QOx-GsYc1sg/s320/blogger-editor-extension-descjp-02.jpeg" width="320" /></a>
</div>

When it runs correctly, some **additional buttons** will appear on the toolbar.
<div style="clear: both; text-align: center;margin:20px 0px;">
<a target="_blank" href="http://3.bp.blogspot.com/-wQVtHmxwOTY/Ug8TYidwoqI/AAAAAAAAElw/mfWCbsaoJmM/s1600/blogger-editor-extension-descjp-03.jpeg" imageanchor="1" >
<img border="0" height="198" src="http://3.bp.blogspot.com/-wQVtHmxwOTY/Ug8TYidwoqI/AAAAAAAAElw/mfWCbsaoJmM/s320/blogger-editor-extension-descjp-03.jpeg" width="320" /></a>
</div>
<br />

--------------------------------------------------
### How to Use These Buttons

Click these newly introduced buttons to call the functions.

#### `HR` buton
Insert `<hr/>` tag on the current selection. `SHIFT+M`

#### `BR` button
Insert `<br/>` tag on the current selection. `SHIFT+CTRL+M`

#### `TAG` button
Show raw HTML string of the current selection and edit it. 
When nothing is selected, it simply inserts arbitrary tag.  `CTRL+T`


#### `APL` button
Apply arbitraly block tag on the current selection. Use `CNF` button to configure 
the block tag to apply. `CTRL+E`


#### `CNF` button
Configure the block tag to apply when `APL` is invoked. `CTRL+Y`

#### `END` button
Unload the extension.


--------------------------------------------------
### Other Keyboard Shortcuts

#### `CTRL+H` -> `1` ~ `5` <br/> `CTRL+H` -> `F1` ~ `F5` <br/> `CTRL+H` -> `H` `J` `K` `L` `;`
Apply the corresponding heading block tag : `<h1></h1>` ~ `<h5></h5>` on the current selection.

#### `CTRL+G`
Switch displaying Rich Editor and HTML editor .

#### `CTRL+R` `F5` `CTRL+F5`
Switch displaying Rich Editor and HTML editor .

--------------------------------------------------
### Support

github
https://github.com/ats4u/blogger-editor-extension




--------------------------------------------------
### Licence

Public Domain or BSD licence



















<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


