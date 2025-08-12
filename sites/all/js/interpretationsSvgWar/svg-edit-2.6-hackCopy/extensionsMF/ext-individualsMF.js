
/* needs TInterpretationBoard.js    */
/* needs TUtilities.js    */



/*
mf I use setConfig to get rid of rulers etc.


svgEditor.setConfig({
	no_save_warning: true,
	extensions: [],
	imgPath: serverImagePath + "cast/images/",
	jGraduatePath: serverImagePath + "svgedit/jgraduate/images/",
	colorPickerCSS: {'left': -10, 'bottom': -15},
	dimensions: [535,325],
	canvas_expansion: 0,
	show_outside_canvas: false,
	showRulers: false,
	selectNew: false
});

*/
/*
 * based on ext-helloworld.js
 *
 * Licensed under the MIT License
 *
 * Copyright(c) 2010 Alexis Deveria
 *
 */
 
/* 
	This is a very basic SVG-Edit extension. It adds a "Hello World" button in
	the left panel. Clicking on the button, and then the canvas will show the
 	user the point on the canvas that was clicked on.
*/

/* Safety check */

var svgCanvas = (typeof svgCanvas === 'undefined') ? null : svgCanvas;


/* new stuff  */

var gIndividualNames= "abcdefghijklmnopqrstuv";;     //defghijklmnopqrstuv";
                                          /*zero-order functors a..v are constants, w..z are variables
                                          the binary predefineds like + are treated as special cases
                                          and there are the numerals 0,1,2; conceptually gFunctors is a
                                          set of char*/

 function augmentSvg(newStr) {
   var prefix=  '<svg width="560" height="400" '+
                    'xmlns="http://www.w3.org/2000/svg">'+
                     '<defs><style type="text/css"><![CDATA[text {fill: black;}]]></style></defs>'+ //make text black through color change                
                    '<g id="svg_1"><title>Shape</title>';
   var prefixEndTag='<title>Shape</title>';
   var interpretation="";
   var startTag='<!--start-->'; // we put this after the svg blurb and the Interpretation Board        
   var suffix=  '</g></svg>';     
   var currentSvg= svgCanvas.getSvgString();
   var minusSuffix= currentSvg.slice(0,-(suffix.length+1));//take off suffix
   
    var index=minusSuffix.indexOf(startTag); //it may or may not have one, first time through it won't
  
    if (index>-1)
        index+=startTag.length;  //include the tag
    else{    
     index=minusSuffix.indexOf(prefixEndTag);   
     if (index>-1)
        index+=prefixEndTag.length; //include the tag
    }
    
    if (index>-1){
 //       index+=startTag.length;     // length of '<title>Layer 1</title>'
   
   //var prefLength=prefix.length;  ///not working for me
       //var trunc=minusSuffix.substring(prefLength);  
       var trunc=minusSuffix.substring(index);
     
 //    var trunc=truncWithBoard.replace(/<g id="svg_IBg">\w*/g,"");   //.*<\/g>
     
       var interpretation=gInterpretationBoard.makeInterpretationBoard(svgCanvas.getSvgString());   
       var augmented= prefix+interpretation+startTag+trunc+newStr+suffix; //the new item is not there yet
           interpretation=gInterpretationBoard.makeInterpretationBoard(augmented);             //update board
           augmented= prefix+interpretation+startTag+trunc+newStr+suffix; //update lot
 
      var test= svgCanvas.setSvgString(augmented);
             
       
 //      svgCanvas.updateCanvas();  //new Aug2  DOES NOT WORK
    }
};
        
var availableNames = function (){
    var available="";   
    var namesInUse=gInterpretationBoard.namesInSvg();
    var indexChar
    
    for (i=0;i<gIndividualNames.length;i++){
        indexChar=gIndividualNames.charAt(i);
       if ((namesInUse.indexOf(indexChar)===-1)&&  //not in universe
            !gInterpretationBoard.isIdentityDuplicate(indexChar)) //not in use as an identity
           available+=gIndividualNames.charAt(i);       
    }
    return available;    
};



//mf 
/*function loadSvg() {  //not being used
            var svgexample = '<svg width="640" height="480" xmlns:xlink="http://www.w3.org/1999/xlink" '+
                    'xmlns="http://www.w3.org/2000/svg"><g id="svg_1"><title>Layer 1</title><rect stroke-width="5" '+
                    'stroke="#000000" fill="#FF0000" id="svg_2" height="35" width="51" y="35" x="32"/>'+
                    '<g><ellipse ry="15" rx="24" '+
                    'stroke-width="5" stroke="#000000" fill="#0000ff" id="svg_3" cy="60" cx="66"/>'+
                    '<text xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24" id="svg_20" y="60" x="60"     fill="#000000">a</text>'+
                    '</g></g></svg>';
            
    
    svgCanvas.setSvgString(svgexample);
        }; */
        
function makeIndividual(name,x,y){
// the individuals are unique and so can be used for svg ids 

  var individual = '<g id="svg_'+name+'g"><circle r="11" stroke-width="1" id="svg_'+name+'" cy="'+y+'" cx="'+x+'" stroke="black" fill="none" />'+
                    '<text xml:space="preserve" text-anchor="middle" font-family="serif" font-size="18" '+
                    'id="svg_'+name+'t" y="'+(y+7)+'" x="'+x+'"    '+
                    ' fill="#000000">'+name+'</text>'+
                    '</g>';
  
    //fill-opacity="0.5" 
  return individual;   
}; 



function updateSvgIBoard(){   //outsde editing eg delete has changed the Interpreation Board
     augmentSvg("");    
     };


var serverImagePath = "";

svgEditor.setConfig({
	no_save_warning: true,
	extensions: ['ext-markers.js'/*,'ext-connector.js'*/],         //mf just removes eyedrop, connector
//	imgPath: serverImagePath + "cast/images/",
//	jGraduatePath: serverImagePath + "svgedit/jgraduate/images/",


initFill: {
					color: 'FF0000',  // solid red
					opacity: 0.5
				},
				initStroke: {
					width: 1,
					color: '000000',  // solid black
					opacity: 0.5
				},


	colorPickerCSS: {'left': -10, 'bottom': -15},
	dimensions: [535,325],
	canvas_expansion: 0,
	show_outside_canvas: false,
	showRulers: false,              //like this
	selectNew: false
}); 

        
        
 

//  var svgCanvas = new embedded_svg_edit(window.frames['svgedit']);

 
 
svgEditor.addExtension("Individuals", function() {

		return {
			name: "Individuals",
			// For more notes on how to make an icon file, see the source of
			// the hellorworld-icon.xml
			svgicons: "extensionsMF/individuals-icon.xml",
			
			// Multiple buttons can be added in this array
			buttons: [{
				// Must match the icon ID in individuals-icon.xml
				id: "individuals", 
				
				// This indicates that the button will be added to the "mode"
				// button panel on the left side
				type: "mode", 
				
				// Tooltip text
				title: "Individuals", 
				
				// Events
				events: {
					'click': function() {
						// The action taken when the button is clicked on.
						// For "mode" buttons, any other button will 
						// automatically be de-pressed.
						svgCanvas.setMode("individual");
					}
				}
			}],
			// This is triggered when the main mouse button is pressed down 
			// on the editor canvas (not the tool panels)
			mouseDown: function() {
				// Check the mode on mousedown
				if(svgCanvas.getMode() == "individual") {
				
					// The returned object must include "started" with 
					// a value of true in order for mouseUp to be triggered
					return {started: true};
				}
			},
			
			// This is triggered from anywhere, but "started" must have been set
			// to true (see above). Note that "opts" is an object with event info
			mouseUp: function(opts) {
				// Check the mode on mouseup
				if(svgCanvas.getMode() == "individual") {
					var zoom = svgCanvas.getZoom();
					
					// Get the actual coordinate by dividing by the zoom value
					var x = opts.mouse_x / zoom;
					var y = opts.mouse_y / zoom;
					
	/*				var text = "Hello Hello World!\n\nYou clicked here: " 
						+ x + ", " + y; */
                                        
      /*                                  svgCanvas.setSvgString("clearSelection")(function(data, error){
  if(error){
    //there was an error
  }else{
    //handle data
    console.log("Cleaer selection");
  }
});  */
                                        
						
					// Show the text using the custom alert function
				//	$.alert(text);
                                
                                var choice="";
                                var available=availableNames();
                                
                                //need to check if any are 
                                
                                if(available.length===0)
                                    alert("Sorry, there are no more individuals");
                                else
                                    {
                                     var reply="";                                   
                                     
                                     while (((reply.length!==1)|| //not choose 1, choose several
                                            available.indexOf(reply)===-1)) //not a permitted choice
                                         {
                                          reply=prompt("Please choose just one individual that is not already in the diagram",available);
                                          
                                          if (reply==null||reply=="")
                                              break;          //jumpout          
                                         }
                                         
                                     if (reply!=null&& reply!="") {  //not cancelled 
                                                                             
                                        var individual= makeIndividual(reply,x,y);

                                        augmentSvg(individual);
                                        //remove
                                //        var polyline='<polyline se:connector="svg_ag svg_bg" fill="none" stroke-width="5" stroke="#000000" points="132.5 135.982 190.5 182.299 248.5 228.615" id="svg_5"/>';
                            			
                            	//		augmentSvg(polyline);
                            			
                            	//nov 2013		alert(polyline);
                                       
                                        
                                     };
                                    }
				}
			}
		};
});

/******************** Interpretation Board

package us.softoption.interpretation;

import java.awt.*;
import java.awt.geom.*;


import us.softoption.infrastructure.*; import static us.softoption.infrastructure.Symbols.*; import static us.softoption.parser.TFormula.*;
import us.softoption.editor.*;
import us.softoption.parser.*;

// read Jan 2nd

public class TInterpretationBoard extends TBox{   // this is like a rectangle

static int fMinWidth=150;

private TSemantics fSemantics=null;

public TInterpretationBoard(){
    fTypeID = IDInterpretationBoard;
    fColor=Color.white;
    fName = chBlank;
    fXCoord=5;
    fYCoord=0;
    fWidth=200;
    fHeight=30;

    fSelected=false;
    fSemantics=null;


  }


public TInterpretationBoard(TSemantics theSemantics){
   this();

   fSemantics=theSemantics;
     }

   public TShape copy(){
      TInterpretationBoard newShape=new TInterpretationBoard();

      copyFieldsTo(newShape);
       return
           newShape;
        }

public void copyFieldsTo(TShape newShape){  // subclasses need to call super and just copy the fields
                                               // that your class defines
        super.copyFieldsTo(newShape);

        ((TInterpretationBoard)newShape).fSemantics=fSemantics;
                }


public void setSemantics(TSemantics theSemantics){
  fSemantics=theSemantics;

}

public TSemantics getSemantics(){
  return
      fSemantics;
}


    public void drawFrame(Graphics2D graphic){

// we'll make sure it's big enough first

      updateSize();

      graphic.draw(new Rectangle2D.Double(fXCoord-1, fYCoord-1,fWidth+1, fHeight+1));
      }



  public void drawInterior(Graphics2D graphic){
    int leftMargin = fXCoord + 5;
    int currentHeightMargin = fYCoord + 12;
    String tempStr;

    Composite originalComposite = graphic.getComposite();

    graphic.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER,
                                                    0.5F)); //half transparent

    graphic.fill(new Rectangle2D.Double(fXCoord, fYCoord, fWidth, fHeight));

    graphic.setComposite(originalComposite);

    graphic.setPaint(Color.black);

    tempStr = fSemantics.getCurrentUniverse();

    tempStr = TUtilities.separateStringWithCommas(tempStr);

    graphic.drawString("Universe= {" + tempStr + "} ", leftMargin,
                       currentHeightMargin);

    currentHeightMargin += 11;


    String[] currentProperties = fSemantics.getCurrentProperties();
    String possibleProperties = fSemantics.getPossibleProperties();

    for (int i = 0; i < currentProperties.length; i++) {
      if (currentProperties[i].length() > 0) {
        tempStr = currentProperties[i];
        tempStr = TUtilities.separateStringWithCommas(tempStr);

        graphic.drawString(possibleProperties.charAt(i) + "= {" + tempStr + "} ",
                           leftMargin, currentHeightMargin);

        currentHeightMargin += 11;
      }

    }


    String[] currentRelations = fSemantics.getCurrentRelations();
    String possibleRelations = fSemantics.getPossibleRelations();

    for (int i = 0; i < currentRelations.length; i++) {
      if (currentRelations[i].length() > 0) {
        tempStr = currentRelations[i];
        tempStr = TUtilities.intoOrderedPairs(tempStr);

        graphic.drawString(possibleRelations.charAt(i) + "= {" + tempStr + "} ",
                           leftMargin, currentHeightMargin);

        currentHeightMargin += 11;
      }

    }

    if (true) /*TPreferences.fIdentity||
       fUseIdentity)  This only draws if there are any*/ /* {
      String[] currentFunctions = fSemantics.getCurrentFunctions();
      String possibleFunctions = fSemantics.getPossibleFunctions();
      boolean functionsExist=false;

      String fancySuper= chSuperscript1+ "= {";


      for (int i = 0; i < currentFunctions.length; i++) {
        if (currentFunctions[i].length() > 0) {
          functionsExist=true;

          tempStr = currentFunctions[i];
          tempStr = TUtilities.intoOrderedPairs(tempStr);

          graphic.drawString(possibleFunctions.charAt(i) + fancySuper + tempStr + "} ",
                             leftMargin, currentHeightMargin);

          currentHeightMargin += 11;
        }

      }

      char[] currentIdentities = fSemantics.getCurrentIdentities();
      String possibleIdentities = fSemantics.getPossibleIdentities();

      for (int i = 0; i < currentIdentities.length; i++) {
         if (currentIdentities[i]!=' ') {

    graphic.drawString(possibleIdentities.charAt(i) + "= {" + currentIdentities[i] + "} ",
                       leftMargin, currentHeightMargin);

    currentHeightMargin += 11;
  }

}


      if (functionsExist){
        currentHeightMargin += 5;

        graphic.drawString("Instances of a function", leftMargin,currentHeightMargin);
        currentHeightMargin += 11;

        graphic.drawString("default to identity", leftMargin,currentHeightMargin);
        currentHeightMargin += 11;

      }

    }
  }


      public void resize(Point anchor, Point end){ //cannot resize board
                                               // we'll let them just follow the mouse
     // moveBy(end.x-(fXCoord+fWidth/2),end.y-(fYCoord+fHeight/2));

      }


void updateSize(){          // this makes it the right size for display, called by drawFrame
   int width;
   int height=2;

   width= fSemantics.getCurrentUniverse().length();

   String[] currentProperties=fSemantics.getCurrentProperties();

   for (int i=0;i<currentProperties.length;i++){    // look through all the possible properties here,
     if (currentProperties[i].length() > 0) { // not just the instantiated ones
       height += 1;
     }
   }

   String[] currentRelations=fSemantics.getCurrentRelations();

     for (int i=0;i<currentRelations.length;i++){    // look through all the possible properties here,
       int relationWidth=currentRelations[i].length();

       if (relationWidth>0){
         if (((2 * relationWidth) - 6 ) > width)
            width = ((2 * relationWidth) - 6);
         height+=1;
       }

   }

   String[] currentFunctions=fSemantics.getCurrentFunctions();
   boolean functionsExist=false;

     for (int i=0;i<currentFunctions.length;i++){    // look through all the possible properties here,
       int functionWidth=currentFunctions[i].length();

       if (functionWidth>0){
         functionsExist=true;
         if (((2 * functionWidth) - 6 ) > width)
            width = ((2 * functionWidth) - 6);
         height+=1;
       }
   }
   if (functionsExist)
     height+=2;       // this is to allow enough room for the default warning label

   char[] currentIdentities=fSemantics.getCurrentIdentities();

   for (int i=0;i<currentIdentities.length;i++){    // look through all the possible properties here,
     if (currentIdentities[i]!=chBlank) { // not just the instantiated ones
       height += 1;
     }
   }


   fHeight = (height + 1) * 10;

   width= 80 + width * 11 ;

   if (width < fMinWidth)
      width = fMinWidth;

   if (functionsExist)
     width+=5;       // this is to allow enough room for the default warning label

   fWidth=width;


      }


}




 */





/*  Old or unused code
 * 
 * 
 * 
 * 
 * //     svgCanvas.setSvgString(test); //mf need only remove suffix
     
   /*
    * 
 
    * 
    * 
    */  
     
    
     
     /*       var svgexample = '<svg width="640" height="480" xmlns:xlink="http://www.w3.org/1999/xlink" '+
                    'xmlns="http://www.w3.org/2000/svg"><g id="svg_1"><title>Layer 1</title><rect stroke-width="5" '+
                    'stroke="#000000" fill="#FF0000" id="svg_2" height="35" width="51" y="35" x="32"/>'+
                    '<g><ellipse ry="15" rx="24" '+
                    'stroke-width="5" stroke="#000000" fill="#0000ff" id="svg_3" cy="60" cx="66"/>'+
                    '<text xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24" id="svg_20" y="60" x="60"     fill="#000000">a</text>'+
                    '</g></g></svg>'; 
 *   // return prefix+currentSvg+newStr+suffix; 
  
    var ellipse='<ellipse ry="61" rx="90" id="svg_2" cy="123.5" cx="170" fill-opacity="0.5" stroke-opacity="0.5" stroke="#000000" fill="#FF0000"/>';

  var x=50; var y=50;
     
     var new2Str= '<ellipse ry="15" rx="24" '+
                    'stroke-width="5" stroke="#000000" fill="#0000ff" id="svg_3" cy="'+
                    y+'" '+ 'cx="'+x+'"/>';
 * 
 * 
 * 
 *   
  
  var test=
  '<svg width="640" height="480" xmlns="http://www.w3.org/2000/svg">'+
 '<g id="svg_1">'+
  '<title>Layer 1</title>'+
  '<ellipse ry="61" rx="90" id="svg_2" cy="123.5" cx="170" fill-opacity="0.5" stroke-opacity="0.5" stroke="#000000" fill="#FF0000"/>'+
 '</g>'+
'</svg>';
 * 
 */