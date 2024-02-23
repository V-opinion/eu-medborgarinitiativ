/*!
 * 
 * PRC Parent Theme
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
 * @link https://github.com/wpcomvip/pewresearch-org
 * @license GPL
 * 
 * Copyright (c) 2023 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcParentthemeJsonp=window.wpackioprcParentthemeJsonp||[]).push([[7],{160:function(e,t,n){n(27),e.exports=n(161)},161:function(e,t,n){"use strict";n.r(t);var o=n(35),r=n(17),c=n.n(r),i=n(50),a=n.n(i);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d=function(e,t){var n=e.querySelector(".caret.icon"),o=n.classList.contains("down");e.classList.toggle("active"),o?(n.classList.add("up"),n.classList.remove("down")):(n.classList.add("down"),n.classList.remove("up")),console.log("toggleMegaMenuState",e,t,n,o),a()(t).transition("fade")},l=function(e){var t=document.getElementById("js-desktop-mega-menu-trigger"),n=document.getElementById("desktop-mega-menu");console.log("Document click with active menu... click:",e.target),t.contains(e.target)||n.contains(e.target)||d(t,n)},m=function(e){if("Escape"===e.key){var t=document.getElementById("js-desktop-mega-menu-trigger"),n=document.getElementById("desktop-mega-menu");d(t,n)}},g=function(e,t){var n=t.querySelector(".close.icon");e.addEventListener("click",(function(){d(e,t)})),n&&n.addEventListener("click",(function(){d(e,t)})),new MutationObserver((function(e){e.forEach((function(e){if("class"===e.attributeName){var t=e.target.classList;console.log("Observer change: ",t),t.contains("active")?(document.addEventListener("click",l),document.addEventListener("keydown",m)):(document.removeEventListener("click",l),document.removeEventListener("keydown",m))}}))})).observe(e,{attributes:!0})};c()((function(){var e,t;e=document.getElementById("js-desktop-mega-menu-trigger"),t=document.getElementById("desktop-mega-menu"),g(e,t),function(){var e={context:document.querySelector(".pushable"),exclusive:!0,dimPage:!0,scrollLock:!0,onChange:function(){document.querySelector(".pushable").classList.toggle("active")}};a()("#mobile-nav").sidebar(u({},e)).sidebar("attach events","#js-mobile-nav-trigger");var t=document.getElementById("js-mobile-mega-menu-trigger"),n=document.getElementById("mobile-mega-menu"),o=n.querySelector(".ui.accordion");a()(o).accordion(),g(t,n),a()("#mobile-search").sidebar(u({},e)).sidebar("setting","transition","overlay").sidebar("attach events","#js-mobile-search-trigger")}()}))},17:function(e,t){e.exports=window.wp.domReady},27:function(e,t,n){var o="prcParentdist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},35:function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return o}))},50:function(e,t){e.exports=window.jQuery}},[[160,0]]]);
//# sourceMappingURL=masthead-1b8110fe.js.map