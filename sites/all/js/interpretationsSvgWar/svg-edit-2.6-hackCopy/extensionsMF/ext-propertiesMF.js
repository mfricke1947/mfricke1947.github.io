
var propertiesMF=propertiesMF||{};



propertiesMF.gPredicates="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
       
propertiesMF.makeProperty=function (name,x,y){
    
  var style=svgCanvas.getStyle();
// 100 x 100 rect by default
  var property = '<g id="svg_'+name+'g"><rect width="100" height="100" id="svg_'+name+'" y="'+y+'" x="'+x+'" '+
          'fill="'+style.fill+'" '+
          'fill-opacity="'+style.fill_opacity+'" '+
          'opacity="'+style.opacity+'" '+
          'stroke="'+style.stroke+'" '+
          'stroke-opacity="'+style.stroke_opacity+'" '+
          'stroke-width="'+style.stroke_width+'" />'+
                    '<text xml:space="preserve" text-anchor="middle" font-family="serif" font-size="18" '+
                    'id="svg_'+name+'t" y="'+(y+100)+'" x="'+(x+50)+'"    '+
                    ' fill="#000000">'+name+'</text>'+
                    '</g>';
  
    //fill-opacity="0.5" 
  return property;   
}; 

/*

function namesInSvg(){
    var currentSvg= svgCanvas.getSvgString();
   
  return namesInSvgString(currentSvg);  
}

function namesInSvgString(svgString){
    var namesArray= svgString.match(/(svg_)[a-v]\"/g);
    var names="";
    
    if (namesArray!==null){
        for (i=0;i<namesArray.length;i++)
            names+=namesArray[i].charAt(4);     
    };
   
  return names;  
}

function updateSvgIBoard(){   //outsde editing eg delete has changed the Interpreation Board
     augmentSvg("");    

     }


var serverImagePath = "";



        
   */     
 
 
svgEditor.addExtension("Properties", function() {

		return {
			name: "Properties",
			// For more notes on how to make an icon file, see the source of
			// the hellorworld-icon.xml
			svgicons: "extensionsMF/properties-icon.xml",
			
			// Multiple buttons can be added in this array
			buttons: [{
				// Must match the icon ID in helloworld-icon.xml
				id: "properties", 
				
				// This indicates that the button will be added to the "mode"
				// button panel on the left side
				type: "mode", 
				
				// Tooltip text
				title: "Properties", 
				
				// Events
				events: {
					'click': function() {
						// The action taken when the button is clicked on.
						// For "mode" buttons, any other button will 
						// automatically be de-pressed.
						svgCanvas.setMode("property");
					}
				}
			}],
			// This is triggered when the main mouse button is pressed down 
			// on the editor canvas (not the tool panels)
			mouseDown: function() {
				// Check the mode on mousedown
				if(svgCanvas.getMode() == "property") {
				
					// The returned object must include "started" with 
					// a value of true in order for mouseUp to be triggered
					return {started: true};
				}
			},
			
			// This is triggered from anywhere, but "started" must have been set
			// to true (see above). Note that "opts" is an object with event info
			mouseUp: function(opts) {
				// Check the mode on mouseup
				if(svgCanvas.getMode() == "property") {
					var zoom = svgCanvas.getZoom();
					
					// Get the actual coordinate by dividing by the zoom value
					var x = opts.mouse_x / zoom;
					var y = opts.mouse_y / zoom;
					
					var text = "Hello Hello World!\n\nYou clicked here: " 
						+ x + ", " + y;
                                        
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
                                var available=propertiesMF.gPredicates;
                                
                                var reply="";                                     
                                
                                var style=svgCanvas.getStyle();
                                
                                     
                                     while (((reply.length!==1)|| //choose several
                                            available.indexOf(reply)===-1)) //not a permitted choice
                                         {
                                          reply=prompt("Please choose just one single letter property name",available);
                                          
                                          if (reply==null||reply=="")   //jump out
                                              break;                
                                         }
                                         
                                     if (reply!=null&&reply!="") {  //not cancelled 
                                                                             
                                        var property= propertiesMF.makeProperty(reply,x,y);
                                        
                    /*                            '<ellipse ry="15" rx="24" '+
                    'stroke-width="5" stroke="#000000" fill="#0000ff" id="svg_3" cy="'+
                    y+'" '+ 'cx="'+x+'"/>'; */
                                        
                                        augmentSvg(property);
                                        
                                        //loadSvg(); //mf
                                        
                                     };
                                    
				}
			}
		};
});


