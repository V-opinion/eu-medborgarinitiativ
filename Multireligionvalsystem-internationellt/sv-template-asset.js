svDocReady(function(){$svjq(".sos-accordion").children().next().addClass("sos-accordion__content").hide().attr("role","region");$svjq(".sos-accordion__heading").click(function(){var a=$svjq(this).text();$svjq(this).parents(".sos-accordion").children().next().slideToggle(400);$svjq(this).toggleClass("sos-accordion__heading--open");$svjq(this).hasClass("sos-accordion__heading--open")?$svjq(this).attr("aria-expanded","true").attr("aria-label","St\u00e4ng ytan f\u00f6r "+a):$svjq(this).attr("aria-expanded",
"false").attr("aria-label","\u00d6ppna ytan f\u00f6r "+a)});$svjq(".sos-accordion-blue").children().next().addClass("sos-accordion-blue__content").hide().attr("role","region");$svjq(".sos-accordion-blue__heading").click(function(){var a=$svjq(this).text();$svjq(this).parents(".sos-accordion-blue").children().next().slideToggle(400);$svjq(this).toggleClass("sos-accordion-blue__heading--open");$svjq(this).hasClass("sos-accordion-blue__heading--open")?$svjq(this).attr("aria-expanded","true").attr("aria-label",
"St\u00e4ng ytan f\u00f6r "+a):$svjq(this).attr("aria-expanded","false").attr("aria-label","\u00d6ppna ytan f\u00f6r "+a)})});