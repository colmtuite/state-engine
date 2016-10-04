// Teh codez

$(function() {
    // Initialise CodeMirror on textarea
    var editor = CodeMirror.fromTextArea(document.getElementById("Editor"), {
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

    var initialContent = editor.getValue();
    $('#Player').html(initialContent);


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
            ch: line.length // set the character position to the end of the line
        }
        doc.replaceRange('\n' + data, pos); // adds a new line
    }

    // Library of premade components
    var AssetLibrary = [
        {
            name: "button-flat",
            code: '<button class="display-inlineBlock br-s color-white fw-5 bc-blue pt-s pb-s pl-m pr-m bw-0 fs-m cursor-pointer td-none us-none os-none">Button</button>'
        },
        {
            name: "heading-xxxxl",
            code: '<h1 class="fs-xxxxl lh-xxxxl color-charcoal fw-3 ls-xxs">This is a heading.</h1>'
        },
        {
            name: "heading-xxxl",
            code: '<h1 class="fs-xxxl lh-xxxl color-charcoal fw-3 ls-xs">This is a heading.</h1>'
        },
        {
            name: "heading-xxl",
            code: '<h2 class="fs-xxl lh-xxl color-charcoal fw-3 ls-xs">This is a heading.</h1>'
        },
        {
            name: "heading-xl",
            code: '<h3 class="fs-xl lh-xl color-charcoal fw-3 ls-xs">This is a heading.</h1>'
        },
        {
            name: "heading-l",
            code: '<h4 class="fs-l lh-l color-charcoal fw-3 ls-xs">This is a heading.</h1>'
        },
        {
            name: "paragraph",
            code: '<p class="fs-m lh-m color-charcoal">You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I dunno exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that Im breaking now. We said we say it was the snow that killed the other two, but it wasnt. Nature is lethal but it doesnt hold a candle to man.</p>'
        },
        {
            name: "input",
            code: '<input class="display-inlineBlock br-s bc-white padding-xs bw-1 bs-solid fs-m os-none" placeholder="Type something...">'
        },
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

    $('.js-AssetLibraryTrigger').click(function() {
        $('.js-AssetLibrary').css('bottom', '0');
    });
    $('.js-AssetLibraryClose').click(function() {
        $('.js-AssetLibrary').css('bottom', '-900px');
    });
});
