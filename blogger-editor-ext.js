if ( window.__blogspotExt ) {
    throw 'ALREADY INITIALIZED';
}
window.__blogspotExt = true;

init();
function init() {
    // -- ABOUT VIRTUAL KEYCODE --
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
    
    // -- REPLACE SELECTION WITH HTML --
    // this code snipet is taken from URL below:
    // http://stackoverflow.com/questions/6251937/how-to-get-selecteduser-highlighted-text-in-contenteditable-element-and-replac
    function replaceSelectionWithHtml( window, document, html) {
        var range, html;
        if (window.getSelection && window.getSelection().getRangeAt) {
            range = window.getSelection().getRangeAt(0);
            range.deleteContents();
            var div = document.createElement("div");
            div.innerHTML = html;
            var frag = document.createDocumentFragment(), child;
            while ( (child = div.firstChild) ) {
                frag.appendChild(child);
            }
            range.insertNode(frag);
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            html = (node.nodeType == 3) ? node.data : node.outerHTML;
            range.pasteHTML(html);
        }
    }
    
    function getSelectionHtml(window, document) {
        var html = "";
        if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            if (sel.rangeCount) {
                var container = document.createElement("div");
                for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                    container.appendChild(sel.getRangeAt(i).cloneContents());
                }
                html = container.innerHTML;
            }
        } else if (typeof document.selection != "undefined") {
            if (document.selection.type == "Text") {
                html = document.selection.createRange().htmlText;
            }
        }
        return html;
    } 

    var ITEM_APPLY = 'ats4u.blogspot.ext.apply';
    var ITEM_EDIT = 'ats4u.blogspot.ext.edit';

    var actions = [];
    var nextButton= document.getElementById("+more");
    function createButton( caption, key, proc ) {
        var elem;
        if ( caption != null ) {
            elem = document.createElement("span");
            elem.style.width = "auto";
            elem.style.height = "20px";
            elem.paddinLeft = '2px';
            elem.paddinRight = '2px';
            elem.style.display = "inline-block";
            elem.style.textAlign= "center";
            elem.style.fontSize= "xx-small";
            elem.innerHTML = "<b style='border:1px solid silver; padding:2px;background-color:#fff;'>"+caption+"</b>";
            elem.addEventListener( "click", proc );
            nextButton.parentNode.insertBefore( elem, nextButton.nextSibling );
            nextButton=elem;
        } else {
            elem =null;
        }
        actions.push( {
            elem:elem,
            proc:proc,
            key:key,
        });
    }
    
    createButton( "HR", function(e){ return e.shiftKey &&  e.ctrlKey && e.keyCode == 0x4D /*M*/ }, function() {
        var b = document.getElementById( "postingComposeBox" ).contentDocument;
        b.execCommand('insertHorizontalRule', false, null);
    });

    createButton( "BR",function(e){ return e.ctrlKey && e.keyCode == 0x4D /*M*/ }, function() {
        var b = document.getElementById( "postingComposeBox" ).contentDocument;
        var e = document.getElementById( "postingComposeBox" );
        replaceSelectionWithHtml( e.contentWindow, e.contentDocument, "<br/>" );
    });
    
    createButton( "TAG",function(e){ return e.ctrlKey && e.keyCode == 0x54 /*T*/ }, function() {
        var e = document.getElementById( "postingComposeBox" );
        var s = getSelectionHtml( e.contentWindow, e.contentDocument ).trim();
        if ( s == '' ) {
            s = sessionStorage.getItem( ITEM_EDIT );
            if ( s==null ) {
                s="<br/>";
            }
        }
        var ss = prompt( "INPUT A REPLACEMENT FOR THE CURRENT SELECTED HTML", s );
        if ( ss != null ) {
            replaceSelectionWithHtml( e.contentWindow, e.contentDocument, ss );
            sessionStorage.setItem( ITEM_EDIT,ss );
        } 
    });
    
    createButton( "APL",function(e){ return e.ctrlKey && e.keyCode == 0x45 /*E*/ }, function() {
        // replaceSelectionWithHtml( "<b>hello</b>" );
        var e = document.getElementById( "postingComposeBox" );
        var se = getSelectionHtml( e.contentWindow, e.contentDocument );
        se = se.trim();
        if ( se == '' ) {
            alert( 'found no selection' );
        } else {
            var s = sessionStorage.getItem( ITEM_APPLY );
            se = s.replace( /%s/, se );
            replaceSelectionWithHtml( e.contentWindow, e.contentDocument, se );
        }
    });

    createButton( "CNF",function(e){ return e.ctrlKey && e.keyCode == 0x59 /*Y*/ }, function() {
        var s = sessionStorage.getItem( ITEM_APPLY );
        if ( s == null ) {
            s = '<span style="color:red;">%s</span>';
        }
        var ss = prompt( "Enter a Template String (%s will be replaced with the current selected string.)", s );
        if ( ss != null ) {
            s = ss;
        }
        sessionStorage.setItem( ITEM_APPLY, s );
    });
    
    createButton( "END", function(e){ return false }, function() {
        window.__blogspotExt = false;
        var o= document.getElementById("+more").parentNode;
        for ( var i=0; i<actions.length; i++ ) {
            if ( actions[i].elem != null ) {
                o.removeChild( actions[i].elem );
            }
        }
        document.getElementById( "postingComposeBox" ).contentDocument.removeEventListener( 'keydown', doc_keyUp, true );
        document.getElementById( "postingHtmlBox" ).removeEventListener( 'keydown', doc_keyUpHtml, true );
    });

    createButton( null, function(e){ return e.ctrlKey && e.keyCode == 0x4A /*J*/  }, function() {
    });
    createButton( null, function(e){ return e.ctrlKey && e.keyCode == 0x47 /*G*/  }, function() {
        document.getElementsByClassName("blogg-collapse-left" )[0].click();
    });
    createButton( null, function(e){ return e.ctrlKey && e.keyCode == 0x52 /*R*/  }, function() {
        // do nothing
    });
    createButton( null, function(e){ return e.ctrlKey && e.keyCode == 0x74 /*CTRL+F5*/   }, function() {
        // do nothing
    });
    createButton( null, function(e){ return e.keyCode == 0x74 /*F5*/   }, function() {
        // do nothing
    });


    var currentHook = null;
    createButton( null, function(e){ return e.ctrlKey && e.keyCode == 0x48 /*H*/ }, function() {
        currentHook = function(e) {
            var elem = document.getElementById( "postingComposeBox" );
            var se = getSelectionHtml( elem.contentWindow, elem.contentDocument );
            se = se.trim();
            if ( se == '' ) {
                alert( 'found no selection' );
            } else {
                if ( false ) {
                } else if ( e.keyCode == 0x31 || e.keyCode == 0x70 || e.keyCode == 0x48 /*H*/ ) {
                    se = "<h1>"+ se + "</h1>";
                } else if ( e.keyCode == 0x32 || e.keyCode == 0x71 || e.keyCode == 0x4A /*J*/ ) {
                    se = "<h2>"+ se + "</h2>";
                } else if ( e.keyCode == 0x33 || e.keyCode == 0x72 || e.keyCode == 0x4B /*K*/ ) {
                    se = "<h3>"+ se + "</h3>";
                } else if ( e.keyCode == 0x34 || e.keyCode == 0x73 || e.keyCode == 0x4C /*L*/ ) {
                    se = "<h4>"+ se + "</h4>";
                } else if ( e.keyCode == 0x35 || e.keyCode == 0x74 || e.keyCode == 0x3B /*;*/ ) {
                    se = "<h5>"+ se + "</h5>";
                } else {
                    // console.log( e );
                    // alert("eer" + e.keyCode );
                    return false;
                }
                replaceSelectionWithHtml( elem.contentWindow, elem.contentDocument, se );
            }
            return false;
        }
    });
    // createButton( null, function(e){ return /* e.ctrlKey && */ e.keyCode == 0x61 /*H*/ }, function() {
    // });
    // createButton( null, function(e){ return /* e.ctrlKey && */ e.keyCode == 0x62 /*H*/ }, function() {
    // });
    // createButton( null, function(e){ return /* e.ctrlKey && */ e.keyCode == 0x63 /*H*/ }, function() {
    // });
    // createButton( null, function(e){ return /* e.ctrlKey && */ e.keyCode == 0x64 /*H*/ }, function() {
    // });
    // createButton( null, function(e){ return /* e.ctrlKey && */ e.keyCode == 0x65 /*H*/ }, function() {
    // });
    
    // define a handler
    function doc_keyUp(e) {
        if ( currentHook != null ) {
            var f= currentHook;
            currentHook = null;
            e.stopPropagation();
            e.preventDefault();
            if ( ! f(e) ) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
        } else {
            for ( var i=0; i<actions.length; i++ ) {
                if ( actions[i].key( e ) ) {
                    if ( ! actions[i].proc() ) {
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    }
                }
            }
        }
    }
    
    // register the handler 
    document.getElementById( "postingComposeBox" ).contentDocument.addEventListener('keydown', doc_keyUp, true);

    // define a handler
    function doc_keyUpHtml(e) {
        if ( e.ctrlKey && e.keyCode == 0x47 /*CTRL+G*/) {
            document.getElementsByClassName("blogg-collapse-right" )[0].click();
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
    }
    
    // register the handler for HTML BOX
    document.getElementById( "postingHtmlBox" ).addEventListener('keydown', doc_keyUpHtml, true);
}


