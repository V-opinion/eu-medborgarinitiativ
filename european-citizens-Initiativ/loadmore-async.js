// polyfill for startsWith method, useful for IE11
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position){
		position = position || 0;
		return this.substr(position, searchString.length) === searchString;
	};
}

$(document).ready(function() {

	// handle click on load more button
	$("main").on("click", ".europarl-expandable-async-loadmore", function(e) {

		e.preventDefault();

		// get the parent container
		const parent = $(this).closest(".europarl-expandable-async-parent");
		const button = $(this);

		// already loading ?
		if ($(parent).attr('data-async-call-loading') === 'true') {
			return false;
		}

		var targetElementsSelector = $(parent).data('async-target-elements-selector');
		if (!targetElementsSelector) {
			targetElementsSelector = '.europarl-expandable-item';
		}

		$(button).hide();

		var urlString = $(parent).attr('data-async-call-url');
		var paramName = $(parent).attr('data-async-call-index-param');
		if (!paramName) {
			paramName = 'page';
		}

		var currentIndex = 0;
		var currentIndexStr = $(parent).attr('data-async-call-current-index');
		if (currentIndexStr) {
			currentIndex = parseInt(currentIndexStr, 10);
		}


		if (!currentIndex) {
			currentIndex = 0;
		}

		if (!urlString) {
			urlString = window.location.href;
		}

		// enfore https if current url is https
		// we do not use startsWith since IE has no support for it
		if (window.location.href.startsWith("https") && urlString.startsWith("http:")) {
			urlString = urlString.replace("http:", "https:");
		}


//		Requires url-polyfill !
		var url = new URL(urlString);
		//add param to URL object
		url.searchParams.set(paramName, currentIndex+1);

		$(parent).attr('data-async-call-loading', 'true');

		evostrap.loading(true);
		$.get( url, function( data ) {
				//if (data) {
				// retain only target elements
				const newElements = $(data).find(targetElementsSelector);
				const hasMore = $(data).find('.europarl-expandable-async-loadmore').length != 0;
				const lastItem = $(parent).find(targetElementsSelector).last();

				// append new elements to last item
				lastItem.after(newElements);

				$(parent).attr('data-async-call-current-index', currentIndex+1);
				$(parent).attr('data-async-call-loading', 'false')

				//other block to replace
				var blockIdToReplace = $(parent).data('async-call-replaceblock-id');
				if(blockIdToReplace) {
					$('#' + blockIdToReplace).text($(data).find('#' + blockIdToReplace).text());
				}

				if (hasMore) {
					$(button).show();
				} else {
					$(button).remove();
				}

				// initialise new es_select
				evostrap.load.esSelect(true).then(function(EsSelect) {
					$(newElements).find('.es_select').each(function () {
						new EsSelect(this);
					});
				});
			}
		).always(function() {
			evostrap.loading(false);
		});
		return false;
	});
});
