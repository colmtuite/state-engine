// Teh codez

$(function() {
    // Initialise CodeMirror on textarea
    var editor = CodeMirror.fromTextArea(document.getElementById("Editor"), {
        value: "hello",
        mode: "xml",
        htmlMode: true,
        lineNumbers: true,
        theme: "neo",
        autofocus: true,
        indentUnit: 4,
        lineWrapping: true,
        scrollBarStyle: "simple",
        autoCloseBrackets: true,
        autoCloseTags: true,
        keyMap: "sublime",

    });

    // Set initial text editor content
    editor.getDoc().setValue('<div class="bc-snow padding-l">\r    <div class="mb-m">\r        <h1 class="fs-xxxl lh-xxxl color-charcoal fw-3 ls-xs">Design with just html.</h1>\r    </div>\r    <h2 class="fs-xl lh-xxl color-steel fw-3 ls-xs">Edit the html and it updates in real-time. Edit the classes to tweak the design. Add components from the menu below.</h2>\r</div>');

    // Update preview pane when text editor changes
    editor.on("change", function(cm, change) {
        var editorOutput = cm.getValue();
        $('#Player').html(editorOutput);
    });

    // Set the position in text editor to append components
    function updateCodeMirror(data){
        var cm = $('.CodeMirror')[0].CodeMirror;
        var doc = cm.getDoc();
        var cursor = doc.getCursor(); // gets the line number in the cursor position
        var line = doc.getLine(cursor.line); // get the line contents
        var pos = { // create a new object to avoid mutation of the original selection
            line: cursor.line,
            ch: line.length - 1 // set the character position to the end of the line
        }
        doc.replaceRange(data, pos); // adds a new line
    }

    // Library of premade components
    var AssetLibrary = [
        {
            name: "button",
            code: '<button class="display-inlineBlock br-s color-white fw-5 bc-pink pt-s pb-s pl-m pr-m bw-0 fs-m cursor-pointer td-none us-none os-none">Button</button>'
        },
        {
            name: "heading",
            code: '<h1 class="fs-xxxl lh-xxxl fw-3">Heading</h1>'
        }
    ]

    // Append component to text editor when clicked
    $('.js-asset').click(function() {
        var assetName = $(this).data("name");
        var result = AssetLibrary.filter(function (obj) {
            return obj.name === assetName;
        })[0];
        updateCodeMirror(result.code);
    });

    // Lock window scroll when scrolling containers
    $.fn.scrollGuard = function() {
      return this
        .on( 'wheel', function ( e ) {
          var $this = $(this);
          if (e.originalEvent.deltaY < 0) {
            /* scrolling up */
            return ($this.scrollTop() > 0);
          } else {
            /* scrolling down */
            return ($this.scrollTop() + $this.innerHeight() < $this[0].scrollHeight);
          }
        })
      ;
    };

    // Call scroll lock function
    $(function(){
        $( '.js-ScrollGuard' ).scrollGuard();
    });

    // Close tab warning
    window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = "\o/";

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage;                            //Webkit, Safari, Chrome
    });
});
