$(document).ready(function() {	

	//using on('change') so that dynamically added elements are handled
	$(document).on('change', '.erpl-select-driven-display-parent select ', function() {	
		const selectedElementId = $(this).val();
		$(this).closest('.erpl-select-driven-display-parent').find('.select-driven-block').each(function() {
			$(this).toggle($(this).data('block-id') == selectedElementId);
		});
	});		
	
	$(document).on('change', 'select.erpl_open-on-select', function (e) {
		var urlToOpen = $(e.target.selectedOptions).attr("data-auto-open-link");
		var linkTarget = $(e.target.selectedOptions).attr("data-auto-open-target");
		window.open(urlToOpen, linkTarget ? linkTarget : '_blank');
	});
});
