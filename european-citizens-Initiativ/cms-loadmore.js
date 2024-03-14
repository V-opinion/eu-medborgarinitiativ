// script used to show more html data specific blocks of content using an async call
// parent block should have class europarl-expandable-parent-async
// each slice size is setup using data-exapendable-step attribute on europarl-expandable-parent-async
// the "load more" button should have class europarl-expandable-loadmore 
$(document).ready(function() {
	
	// handle click on load more button
	$(".erpl-loadmore-button-container").click(function(e) {
	
		e.preventDefault();
		// get the parent container
		const groupContainer = $(this).closest(".erpl-product-group-container");
		
		// already loading ?
		if ($(groupContainer).attr('data-async-call-loading') === 'true') {
			return false;
		}
		
		$(groupContainer).attr('data-async-call-loading', 'true');
			
		// hide button
		const currentButton = $(this);
		$(currentButton).hide();
		
		var url = $(this).attr('data-cms-loadmore-url');
		
		// call REST endpoint
		evostrap.loading(true);
		$.get( url, function( data ) {
				const newElements = $(data).find(".erpl-cms-product-group-content-wrapper");
				const firstSeparator = $(groupContainer).find(".erpl-cms-product-group-content-wrapper > .separator:first");
				const currentLastItem = $(groupContainer).find('.erpl-cms-product-group-content-wrapper').last();
				currentLastItem.after(firstSeparator, newElements);
				
				const hasMore = $(data).find(".erpl-product-group-loadmore-button").length !== 0;
				if (hasMore) {
					const newUrl = $($(data).find(".erpl-loadmore-button-container")[0]).attr("data-cms-loadmore-url");
					$(currentButton).attr('data-cms-loadmore-url', newUrl);
					$(currentButton).show();
				}
				
				$(groupContainer).attr('data-async-call-loading', 'false');
			}
		).always(function() {
			evostrap.loading(false);
		});
		
		return false;
	});
});


