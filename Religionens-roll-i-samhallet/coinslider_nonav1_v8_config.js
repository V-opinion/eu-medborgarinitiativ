var xaraSwidgets_coinSliderNonav_v8Templates = {
	
	entry:		'<a href="{link}">'
			+	'<img src="{image}">'
			+	'<span>{desc}</span>'
			+	'</a>',
	
	main:		'<div id="{component_id}OuterDiv" class="coin-slider_nonav">'
			+ 	'{entryhtml}'
            + 	'</div>'
            
		
	        
};

function xsw_csnn_htmlbr(str) {
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
function xaraSwidgets_coinSliderNonav_v8Constructor(divID, data)
{
	var entryHTML = '';
	
	// loop through each entry in the array and compile the entry template for it
	for(var i=0; i<data.length; i++)
	{
	    data[i].desc = xsw_csnn_htmlbr(data[i].desc);
		entryHTML += xaraSwidgets_compileTemplate(xaraSwidgets_coinSliderNonav_v8Templates.entry, data[i]);
	}
	
	// now lets compile the 'main' template which acts as a wrapper for each entry
	var mainData = {
		component_id:divID,
		entryhtml:entryHTML
	};
	
	var mainTemplate = xaraSwidgets_compileTemplate(xaraSwidgets_coinSliderNonav_v8Templates.main, mainData);

	// now lets apply the resulting HTML for the whole component to the main DIV that was exported by XARA
	$('#' + divID).html(mainTemplate);
	
	// work out the required dimensions for width and height.
	
	var cs2_height = $('#' + divID).parent('div').height()
	var cs2_width = $('#' + divID).parent('div').width()

	// now we have the components DOM on the page - we can use the 'OuterDiv' as the jquery initiation point
	$('#' + divID + 'OuterDiv').coinslider({ 
    	width: cs2_width, height:cs2_height, effect: 'random', navigation: false // random, swirl, rain, straight   
	    });
}