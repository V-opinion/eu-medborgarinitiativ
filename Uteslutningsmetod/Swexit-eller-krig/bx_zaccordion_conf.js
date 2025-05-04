var xaraSwidgets_zaccordionTemplates = {

entry:		'<img src="{image}" width="100%" height="100%" alt="" />',

trigger:	'{trigger}',
auto:		'{auto}',
pause:		'{pause}',
speed:		'{speed}',

main:		'<div id="{component_id}OuterDiv" class="">'
			+ 	'{entryhtml}'
			+	'</div>'
			
			
};


function xsw_cs_htmlbr(str) {
	if (str == undefined)
		return '';
    var lines = str.split("\n");
    for (var t = 0; t < lines.length; t++) {
        lines[t] = $("<p>").text(lines[t]).html();
    }
    return lines.join("<br/>");
}


// this is the constructor for a component
// it loops through each 'entry' in the array of data and compiles the entry template for it
// it then applies the resulting HTML to the main template before writing the whole lot to the div on the page
// it then initialises the actual jquery plugin for the div (that now contains the required HTML as a result of writing the template to it)
function xaraSwidgets_zaccordionConstructor(divID, data)
{
	var entryHTML = '';
	
	// loop through each entry in the array and compile the entry template for it
	for(var i=1; i<data.length; i++)
	{
//	 data[i].desc = xsw_cs_htmlbr(data[i].desc);
	entryHTML += xaraSwidgets_compileTemplate(xaraSwidgets_zaccordionTemplates.entry, data[i]);
	trigger = (data[0].trigger);
	auto = (data[0].auto);
	timeout = (data[0].timeout);
	speed = (data[0].speed);

	}
	
	var defaultTrigger = 1;
		var enteredTrigger = parseInt(trigger);
		var trigger = isNaN(enteredTrigger) ? defaultTrigger : enteredTrigger
		var trigger = parseInt(trigger);
		if(!isNaN(trigger))
			{
			useTrigger = trigger;
			}	
		if (trigger ==1){
			trigger ='click'
			}
		else if (trigger ==2){
			trigger ='mouseover'
			}

		var defaultAuto = 1;
		var enteredAuto = parseInt(auto);
		var auto = isNaN(enteredAuto) ? defaultAuto : enteredAuto
		var auto = parseInt(auto);
		if(!isNaN(auto))
			{
			useAuto = auto;
			}	
		if (auto ==1){
			auto = true
			}
		else if (auto ==2){
			auto = false
			}

					// get the timeout value 	
		var enteredTimeout = parseInt(timeout)*1000;
		var defaultTimeout = '4500';
		var timeout = isNaN(enteredTimeout) ? defaultTimeout : enteredTimeout
		
		// get the speed value 
		var enteredSpeed = parseInt(speed)*1000;
		var defaultSpeed = '700';
		var speed = isNaN(enteredSpeed) ? defaultSpeed : enteredSpeed

			
	//	entryHTML = xsw_ea_htmlbr(entryHTML);
	// now lets compile the 'main' template which acts as a wrapper for each entry
	
	var mainData = {
		component_id:divID,
		entryhtml:entryHTML,
		
	};
	
	var mainTemplate = xaraSwidgets_compileTemplate(xaraSwidgets_zaccordionTemplates.main, mainData);
	
	// now lets apply the resulting HTML for the whole component to the main DIV that was exported by XARA
	
	
	$('#' + divID).html(mainTemplate);
	
	/*
	// get the theme color value 
	var $p = $("<p class='xr_c_Theme_Color_1'></p>").hide().appendTo("body");
    var overcolor = $p.css("color");
//	console.log(overcolor);
		var overcolor = $p.css("color");
		var defaultovercolor = '#981a0f';
		var enteredovercolor = overcolor;
		
		if (enteredovercolor !== '' )
		{
		var overcolor= enteredovercolor
		}
		else 
		{
		var overcolor= defaultovercolor;
		}
		
    $p.remove();
	// get the panel color value 
	
	var $p1 = $("<p class='xr_c_Panel_Color_1'></p>").hide().appendTo("body");
    var panelcolor = $p1.css("color");
	var defaultpanelcolor = '#e6e6db';
	var enteredpanelcolor = panelcolor;
		
		if (enteredpanelcolor !== '' )
		{
		var panelcolor= enteredpanelcolor
		}
		else 
		{
		var panelcolor= defaultpanelcolor;
		}
		
//	console.log(panelcolor);
    $p1.remove();

*/
	// get the dimensions of the parent div  
	
	var width = $('#' + divID).parent('div').width();
	var height1 = Math.round(width*33.11/100);
//	var height = $('#' + divID).parent('div').height();
	
	$('head').append("<style>#"+ divID +"OuterDiv {z-index:0;}</style>");
	$('#' + divID).parent('div').css('overflow', 'visible');							
// write the css values to the doc  
/*	
	$('#' + divID).css('height',height);
	$('#' + divID).css('width',width);
	$('head').append("<style>."+ divID +"InnerDiv {background: url(arrow.png) -1px 40px no-repeat "+overcolor+"}</style>");	
	$('head').append("<style>#"+ divID +"OuterDiv {border:"+panelcolor+" solid 10px;}</style>");						
	//	$('#' + divID + 'OuterDiv').css('border' ,panelcolor+'solid 10px');
	$('head').append("<style>."+ divID +"InnerDiv {top: "+ panel +"; left: 0;}</style>");	
*/
	// invoke the effect 
		$('#' + divID + 'OuterDiv').zAccordion({
						
					auto: auto,
					tabWidth: "10%",
					speed: speed,
					timeout: timeout,			
					width: "100%",
					height: height1,
					trigger: trigger
				});							
		}
