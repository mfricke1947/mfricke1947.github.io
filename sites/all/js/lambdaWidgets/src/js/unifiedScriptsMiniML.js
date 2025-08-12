// 7/29/21 adding parseMiniML

// 7/23/21 adding constraintsJHM

// 5/4/21
//10/17/19 6:25 am Previous
// the editor global is 'editor'
// the dataGrid globals are 'eGridDiv' and 'gridOptions'
function initializeEditorAndGrid(editor, gridOptions, initialText) {
    bindEvent(window, 'message', function (e) {
        var msg = e.data;
       // alert ("bindEditorAndGrid " +e.data); //debugging
        if (msg.length > 2 && msg.charAt(0) == ':') {
            var selectedText = editor.selection.getHTML(); //existing selection prior to processing
            switch (msg.charAt(1)) {
                case 'a': //applicative order reduction
                    var newData = JSON.parse(msg.slice(2));
                    gridOptions.api.setRowData(newData);

                    gridOptions.columnApi.autoSizeColumns();
                    break;
                case 'c': //constraints
                    editor.selection.insertHTML(selectedText + "<mark>&nbsp;" + msg.slice(2) + "&nbsp;</mark>"); //editor is a global
                    break;
                case 'd': //constraints
                    var newData = JSON.parse(msg.slice(2));
                    gridOptions.api.setRowData(newData);
                    gridOptions.columnApi.autoSizeColumns();
                    break;
                case 'i': // insert text replacing all
                    editor.value = msg.slice(2);
                    break;
                case 'm':
                    editor.selection.insertHTML(selectedText + " " + msg.slice(2) + " "); //editor is a global
                    break;
                case 'n': //normal order reduction
                    var newData = JSON.parse(msg.slice(2));
                    gridOptions.api.setRowData(newData);
                    gridOptions.columnApi.autoSizeColumns();
                    break;
                case 'q':
                    editor.selection.insertHTML(selectedText + "<mark>&nbsp;" + msg.slice(2) + "&nbsp;</mark>"); //editor is a global
                    break;
                case 's': //normal order reduction
                    var newData = JSON.parse(msg.slice(2));
                    gridOptions.api.setRowData(newData);
                    gridOptions.columnApi.autoSizeColumns();
                    break;
                case 't': //nor order reduction with type
                    var newData = JSON.parse(msg.slice(2));
                    gridOptions.api.setRowData(newData);
                    gridOptions.columnApi.autoSizeColumns();
                    break;
                case 'u': //aor order reduction with type
                    var newData = JSON.parse(msg.slice(2));
                    gridOptions.api.setRowData(newData);
                    gridOptions.columnApi.autoSizeColumns();
                    break;
                case 'x':
                    editor.selection.insertHTML(selectedText + "<mark>&nbsp;" + msg.slice(2) + "&nbsp;</mark>"); //editor is a global
                    break;
                case 'r':
                    //   alert ('R msg: ' + msg.slice(2));
                    // editor.selection.insertHTML(selectedText+ " " + msg.slice(2) + " ")  //editor is a global. don't want it to write back
                    var newData = JSON.parse(msg.slice(2));
                    gridOptions.api.setRowData(newData);
                    gridOptions.columnApi.autoSizeColumns();
                    break;
                case 'y':
                    { }
                    break;
                default:
                    {
                        alert("Editor and grid default");
                    }
            }
        }
    });
    editor.value = initialText;
}
;
function initializeEditorOnly(editor, initialText) {
    bindEvent(window, 'message', function (e) {
        var msg = e.data;
         //alert ("bindEditorOnly" +editor.value); //debugging
        if (msg.length > 2 && msg.charAt(0) == ':') {
            var selectedText = editor.selection.getHTML(); //existing selection prior to processing
            switch (msg.charAt(1)) {
                case 'c': //constraints
                    editor.selection.insertHTML(selectedText + "<mark>&nbsp;" + msg.slice(2) + "&nbsp;</mark>"); //editor is a global
                    break;
                case 'd': //constraintsJHM
               // alert("constraintsJHM called");
                                    break;
                case 'i': // insert text replacing all
                    editor.value = msg.slice(2);
                    break;
                case 'm':
                    editor.selection.insertHTML(selectedText + " " + msg.slice(2) + " "); //editor is a global
                    break;
                case 'q':
                    editor.selection.insertHTML(selectedText + "<mark>&nbsp;" + msg.slice(2) + "&nbsp;</mark>"); //editor is a global
                    break;
                case 'x':
                    editor.selection.insertHTML(selectedText + "<mark>&nbsp;" + msg.slice(2) + "&nbsp;</mark>"); //editor is a global
                    break;
                case 'r':
                //   alert ('R msg: ' + msg.slice(2));
                // editor.selection.insertHTML(selectedText+ " " + msg.slice(2) + " ")  //editor is a global. don't want it to write back
                /*
                          var newData = JSON.parse(msg.slice(2));
                
                          gridOptions.api.setRowData(newData);
                          gridOptions.columnApi.autoSizeColumns();
                
                          break;
                */
                case 'y':
                    { }
                    break;
                default:
                    {
                        alert("Editor only default");
                    }
            }
        }
    });
    editor.value = initialText;
}
;
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}
;
function getStrippedSelection(joditEditor) {
    return stripHtml(joditEditor.selection.getHTML());
}
;
function norAndType(joditEditor) {
    var prefix = ':t';
    sendMessage(prefix + getStrippedSelection(joditEditor));
}
function aorAndType(joditEditor) {
    var prefix = ':u';
    sendMessage(prefix + getStrippedSelection(joditEditor));
}
function parseMiniML(joditEditor) { 
    var prefix = ':q'; 
    sendMessage(prefix + getStrippedSelection(joditEditor)); }

function reduce1(joditEditor) {
    var prefix = ':r';
    //sendMessage(prefix + editor.selection.getHTML())
    sendMessage(prefix + getStrippedSelection(joditEditor));
}
function reduceNOR(joditEditor) {
    var prefix = ':n';
    sendMessage(prefix + getStrippedSelection(joditEditor));
}
function reduceAOR(joditEditor) {
    var prefix = ':a';
    sendMessage(prefix + getStrippedSelection(joditEditor));
}
function reduceConstraintsJHM(joditEditor) {
 //    alert('unified scripts reduceConstraintsJHM'); //called properly
    var prefix = ':d';
    sendMessage(prefix + getStrippedSelection(joditEditor));

//    alert('reduceConstraintsJHM' + prefix + getStrippedSelection(joditEditor));
}
function reduceSideBySide(joditEditor) {
    var prefix = ':s';
    sendMessage(prefix + getStrippedSelection(joditEditor));
}
function sendFunction2(joditEditor) { var prefix = ':x'; sendMessage(prefix + getStrippedSelection(joditEditor)); }

function constraints(joditEditor) {
    var prefix = ':c';
    sendMessage(prefix + getStrippedSelection(joditEditor));
}
/*
function constraintsJHM(joditEditor) {

  
    var prefix = ':d';
    sendMessage(prefix + getStrippedSelection(joditEditor));
}
*/

var sendMessage = function (msg) {
    // Make sure you are sending a string, and to stringify JSON
    //window.parent.postMessage('From iFrame: ' +  msg, '*');
    window.parent.postMessage(msg, '*');
};
// jodit selection can contain markup, which mostly we do not want
/**
 * Returns the text from a HTML string
 *
 * @param {html} String The html string
 */
function stripHtml(html) {
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}
;
//////////////////////////////////////////
