"use strict";

(function () {
  //  ---------------------------------------------  DATA PERSONALIZATION ---------------------------------------------
  // PAGE
  var siteFromMeta = document.querySelector('meta[name="trackerName"]');
  var site = siteFromMeta ? tracker_name : 'Factsheets'; // TAG

  var tagUrlFromMeta = document.querySelector('meta[name="tagUrl"]');
  var tagUrl = tagUrlFromMeta ? tagUrlFromMeta : 'https://www.europarl.europa.eu/website/webanalytics/smarttag-factsheets.js'; // Form's id of the search engine

  var id_searchform = 'search'; // Input's id of the search field

  var id_searchfield = 'search-field'; // trackerTag definition

  // Input's id of the search field
  var id_searchfieldInputBar = '';
  // Div's id of the search result container
  var id_searchResultContainer = '';
  var trackerTag;
  var chapt1;
  var chapt2;
  var chapt3;

  //  --------------------------------------------- SEARCH ENGINE MANAGEMENT ---------------------------------------------

  // Add event on the search input 
  function AddSearchEvent() {
    var form = document.getElementById(id_searchform);
    var input = document.getElementById(id_searchfield);
    // Event adding
    if (form !== null && input !== null) {
      form?.addEventListener('submit', function () {
        return trackerTag.events.send('click.action', {
          'click': 'search-header::' + input.value
        });
      });
    }
  }
  // Add event for each search result link
  function AddSearchResultEvent() {
    var input = document.getElementById(id_searchfield);
    var searchResultLinks = document.querySelectorAll('[data-searchResultLink]');
    for (var i = searchResultLinks.length - 1; i >= 0; i--) {
      var searchResultLink = searchResultLinks[i];
      searchResultLink.addEventListener('click', function () {
        return trackerTag.events.send('internal_search_result.click', {
          'ise_keyword': input?.value,
          // TODO => update the ise_page on load more data action
          'ise_page': 1,
          'ise_click_rank': i
        });
      });
    }
  }
  // Send event on search result page display
  function sendSearchResultpageEvent() {
    var searchResultBarContainer = document.getElementById(id_searchfieldInputBar);
    if (searchResultBarContainer) {
      trackerTag.events.send('internal_search_result.display', {
        'ise_keyword': searchResultBarContainer.value,
        // TODO => update the ise_page on load more data action
        'ise_page': 1
      });
    }
  }
  // Add event on load more search result  
  function addLoadMoreSearchResultEvent() {
    var searchResultContainer = document.getElementsByClassName(id_searchResultContainer);
    searchResultContainer[0]?.addEventListener("DOMNodeInserted", function () {
      setTimeout(AddSearchResultEvent(), 1000);
    });
  }
  //  --------------------------------------------- LINKS AND DOCUMENTS MANAGEMENT ---------------------------------------------
  function AddLinkEvents() {
    let linkList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    // Links search
    var regex = new RegExp(window.location.host, 'gi');
    // Links analysis
    for (var i = linkList.length - 1; i >= 0; i--) {
      var link = linkList[i];
      if (link.getAttribute('data-analytics-event-attached') === 'true') return;
      var linkSpan = link.querySelector('span');
      // Multimedia Centre links mangement
      if (link.href.match(/multimediacentre.europarl.europa.eu/gi)) {
        link.addEventListener('click', function () {
          return trackerTag.events.send('click.action', {
            'label': link?.title,
            'span_label': linkSpan?.innerHTML,
            'click': 'body-page::external-link::url(' + this.href + ')::multimediacentre',
            'click_chapter1': chapt1,
            'click_chapter2': chapt2,
            'click_chapter3': chapt3
          });
        });
        // Audiovisual links mangement 
      } else if (link.href.match(/audiovisual.europarl.europa.eu/gi)) {
        link.addEventListener('click', function () {
          return trackerTag.events.send('click.action', {
            'label': link?.title,
            'span_label': linkSpan?.innerHTML,
            'click': 'body-page::external-link::url(' + this.href + ')::audiovisual',
            'click_chapter1': chapt1,
            'click_chapter2': chapt2,
            'click_chapter3': chapt3
          });
        });
        // EuroparlTV links mangement
      } else if (link.href.match(/europarltv.europa.eu/gi)) {
        link.addEventListener('click', function () {
          return trackerTag.events.send('click.action', {
            'label': link?.title,
            'span_label': linkSpan?.innerHTML,
            'click': 'body-page::external-link::url(' + this.href + ')::europarltv',
            'click_chapter1': chapt1,
            'click_chapter2': chapt2,
            'click_chapter3': chapt3
          });
        });
        // Links mangement having "document" extention
      } else if (link.href.match(/.pdf/gi) || link.href.match(/.doc/gi) || link.href.match(/.xls/gi) || link.href.match(/.xml/gi) || link.href.match(/.zip/gi)) {
        link.addEventListener('click', function () {
          return trackerTag.events.send('click.download', {
            'label': link?.title,
            'span_label': linkSpan?.innerHTML,
            'click': 'body-page::document::url(' + this.href + ')',
            'click_chapter1': chapt1,
            'click_chapter2': chapt2,
            'click_chapter3': chapt3
          });
        });
        // Links mangement having "download-centre" keyword but not navigation link
      } else if (link.id === 'download-centre_download-btn') {
        link.addEventListener('click', function () {
          return trackerTag.events.send('click.download', {
            'label': link?.title,
            'span_label': linkSpan?.innerHTML,
            'click': 'body-page::document::url(' + this.href + ')',
            'click_chapter1': chapt1,
            'click_chapter2': chapt2,
            'click_chapter3': chapt3
          });
        });
        // Links mangement targeting the infographics from Europarl
      } else if (link.href.match(/europarl.europa.eu/gi) && (link.href.match('/external/') || link.href.match('/ep_products/'))) {
        link.addEventListener('click', function () {
          return trackerTag.events.send('click.action', {
            'label': link?.title,
            'span_label': linkSpan?.innerHTML,
            'click': 'body-page::media-link::infography::url(' + this.href + ')::infography-dynamic',
            'click_chapter1': chapt1,
            'click_chapter2': chapt2,
            'click_chapter3': chapt3
          });
        });
        //  External Links social network mangement
      } else if (link.href.match(/facebook.com/gi) || link.href.match(/twitter.com/gi) || link.href.match(/linkedin.com/gi)) {
        link.addEventListener('click', function () {
          return trackerTag.events.send('click.exit', {
            'label': link?.title,
            'span_label': linkSpan?.innerHTML,
            'click': 'body-page::external-link::url(' + this.href + ')::link',
            'click_chapter1': chapt1,
            'click_chapter2': chapt2,
            'click_chapter3': chapt3,
            'visit_exitpage': site
          });
        });
        //  External Links mangement
      } else if (!link.href.match(regex)) {
        link.addEventListener('click', function () {
          return trackerTag.events.send('click.exit', {
            'label': link?.title,
            'span_label': linkSpan?.innerHTML,
            'click': 'body-page::external-link::url(' + this.href + ')::link',
            'click_chapter1': chapt1,
            'click_chapter2': chapt2,
            'click_chapter3': chapt3,
            'visit_exitpage': site
          });
        });
        //  Internal Links mangement
      } else if (link.href.match(regex)) {
        link.addEventListener('click', function () {
          return trackerTag.events.send('click.navigation', {
            'label': link?.title,
            'span_label': linkSpan?.innerHTML,
            'click': 'body-page::internal-link::url(' + this.href + ')::link',
            'click_chapter1': chapt1,
            'click_chapter2': chapt2,
            'click_chapter3': chapt3,
            'visit_exitpage': site
          });
        });
        //  Internal Links mangement (relative url)
      } else if (link.indexOf('http://') === 0 || link.indexOf('https://') === 0) {
        link.addEventListener('click', function () {
          return trackerTag.events.send('click.navigation', {
            'label': link?.title,
            'span_label': linkSpan?.innerHTML,
            'click': 'body-page::internal-link::url(' + this.href + ')::link',
            'click_chapter1': chapt1,
            'click_chapter2': chapt2,
            'click_chapter3': chapt3,
            'visit_exitpage': site
          });
        });
      }
      link.setAttribute('data-analytics-event-attached', 'true');
    }
  }
  //  --------------------------------------------- BUTTON MANAGEMENT ---------------------------------------------
  function AddButtonEvents() {
    let buttonList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    for (var i = buttonList.length - 1; i >= 0; i--) {
      var button = buttonList[i];
      if (button.getAttribute('data-analytics-event-attached') === 'true') return;
      var buttonSpan = button.querySelector('span');
      button.addEventListener('click', function () {
        return trackerTag.events.send('click.action', {
          'label': button.innerHTML,
          'span_label': buttonSpan?.innerHTML,
          'button_expand': button.getAttribute('aria-expanded'),
          'click': 'body-page::external-link::url(' + this.href + ')::multimediacentre',
          'click_chapter1': chapt1,
          'click_chapter2': chapt2,
          'click_chapter3': chapt3
        });
      });
      button.setAttribute('data-analytics-event-attached', 'true');
    }
  }
  //  --------------------------------------------- VIDEO MANAGEMENT ---------------------------------------------
  function AddVideoEvents() {
    let videoList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    for (var i = videoList.length - 1; i >= 0; i--) {
      var video = videoList[i];
      if (video.getAttribute('data-analytics-event-attached') === 'true') return;

      // Fires when the audio/video has been started or is no longer paused
      video.addEventListener('play', function (event) {
        // console.log('Play event de la video, EVENT:', event);
        trackerTag.events.send('av.play', {
          'av_content_id': video.id,
          'av_duration': 0,
          'av_positionv': 0
        });
      });
      // Fires when the audio/video has been paused
      video.addEventListener('pause', function (event) {
        // console.log('Pause event de la video, EVENT:', event);
        trackerTag.events.send('av.pause', {
          'av_content_id': video.id,
          'av_duration': 0,
          'av_positionv': 0
        });
      });
      // Fires when the audio/video has been started or is no longer paused
      video.addEventListener('playing', function (event) {
        // console.log('Playing event de la video, EVENT:', event);
        trackerTag.events.send('av.resume', {
          'av_content_id': video.id,
          'av_duration': 0,
          'av_positionv': 0
        });
      });
      // Fires when the current playlist is ended
      video.addEventListener('ended', function (event) {
        // console.log('Ended event de la video, EVENT:', event);
        trackerTag.events.send('av.stop', {
          'av_content_id': video.id,
          'av_duration': 0,
          'av_positionv': 0
        });
      });
      video.setAttribute('data-analytics-event-attached', 'true');
    }
    ;
  }
  //  --------------------------------------------- OBSERVE MUTATIONTION  ---------------------------------------------

  function observeMutations() {
    var previousUrl = location.href;
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (addedNode) {
          if (addedNode.nodeType === Node.ELEMENT_NODE) {
            const linksList = addedNode.querySelectorAll('a');
            const buttonList = addedNode.querySelectorAll('button');
            const videosList = addedNode.querySelectorAll('video');
            if (linksList?.length > 0) AddLinkEvents(linksList);
            if (buttonList?.length > 0) AddButtonEvents(buttonList);
            if (videosList?.length > 0) AddVideoEvents(videosList);
          }
        });
      });
      if (location.href !== previousUrl) {
        previousUrl = location.href;
        if (trackerTag) {
          sendPageDisplayEvent();
        }
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  //  --------------------------------------------- OBSERVE LOCATIONS  ---------------------------------------------

  function observeLocation() {
    window.addEventListener('hashchange', sendPageDisplayEvent);
  }
  //  --------------------------------------------- SEND PAGE DISPLAY EVENT  ---------------------------------------------
  function sendPageDisplayEvent() {
    // Get Page Language
    var language;
    var body = document.body;
    if (body.getAttribute('lang')) {
      language = body.getAttribute('lang');
    } else {
      var html = document.querySelector('html');
      if (html.getAttribute('lang')) {
        language = html.getAttribute('lang');
      }
    }
    if (!language) {
      var metaLanguage = document.querySelector('meta[name="language"]');
      if (metaLanguage?.content) {
        language = metaLanguage.content;
      }
    }
    // Get page => Current page visited
    var splitedUrl = location.href.split('/');
    var page = splitedUrl.pop();
    if (page === language) {
      page = splitedUrl[splitedUrl.length - 1];
    }
    // Get Canonical URL
    var url = document.querySelector('link[rel="canonical"]');
    // Page Chapters

    // Send page information 
    var event = {
      'site': site,
      'page': page,
      'pagename': document.querySelector('#webanalytic-id_pages')?.value,
      'language': language ? language.toLowerCase() : '',
      'url': location.href,
      'url_key': location.href,
      'canonical_url': url ? url.getAttribute('href') : 'No recognized',
      'page_chapter1': chapt1,
      'page_chapter2': chapt2,
      'page_chapter3': chapt3,
      'ep_bodies': document.querySelector('#webanalytic-ep_bodies')?.value,
      'topics_by_weeks': document.querySelector('#webanalytics-topics_by_weeks')?.value,
      'priority_category': document.querySelector('#webanalytics-priority_category')?.value,
      'priority_wordlink': document.querySelector('#webanalytics-priority_wordlink')?.value,
      'internal_keyword': document.querySelector('#news_search-keyword')?.value,
      'referrer': document.referrer
    };
    // console.log('Sended event:',  event)
    trackerTag.events.send('page.display', event);
  }

  //  --------------------------------------------- INITIALIZATION FUNCTION ---------------------------------------------
  function initialization() {
    // Identification du dossier dans lequel se trouve le fichier
    var headElement = document.querySelector('head');
    // stop if we don't find head or if the smarttag is allready in the page
    if (!headElement || document.querySelector('#smarttag_script')) return;
    // inject smarttag
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('id', 'piano-analytics-script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('async', 'true');
    scriptElement.setAttribute('src', tagUrl);
    // init the tracker on load
    scriptElement.addEventListener('load', trackerInitialization);
    headElement.append(scriptElement);
  }
  //  --------------------------------------------- TRACKER INITIALIZATION FUNCTION ---------------------------------------------
  function trackerInitialization() {
    trackerTag = new ATInternet.Tracker.Tag();
    // Page Chapters
    chapt1 = document.querySelector('#webanalytic-id_chapters')?.value;
    chapt2 = document.querySelector('#webanalytic-id_sub-chapters')?.value;
    chapt3 = document.querySelector('#webanalytic-id_sub-sub-chapters')?.value;
    // Events definition to track for search engine
    AddSearchEvent();
    // Events definition to track for search result
    AddSearchResultEvent();
    // Event difinition to track load of new search result
    addLoadMoreSearchResultEvent();
    // Event definition to track links in body's page
    AddLinkEvents(document.body.querySelectorAll('a'));
    // Event definition to track buttons in body's page
    AddButtonEvents(document.body.querySelectorAll('button'));
    // Event definition to track videos in page.
    AddVideoEvents(document.body.querySelectorAll('video'));
    // Send Page display event
    sendPageDisplayEvent();
    // Send search result page
    sendSearchResultpageEvent();
    // Observe mutation on the page
    observeMutations();
    // Observe location url change
    observeLocation();
  }
  //  --------------------------------------------- TRACKER INITIALIZATION CHECKING FUNCTION ---------------------------------------------
  function checkIfTrackerIsInitialized() {
    if (!trackerTag) initialization();
  }
  //  --------------------------------------------- LOADING AND INITIALIZATION FUNCTION CALL ---------------------------------------------
  window.addEventListener('load', initialization);
  setTimeout(checkIfTrackerIsInitialized, 1000);
})();
//# sourceMappingURL=ati-factsheets.js.map