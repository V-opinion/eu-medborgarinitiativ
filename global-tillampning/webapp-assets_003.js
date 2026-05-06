AppRegistry.registerBundle({applicationId:'marketplace.sitevision.toTop|1.2.3',bundle: {"en":{"small":"Small","settings":"Settings","backgroundColor":"Background color","large":"Large","right":"Right","medium":"Medium","toTop":"To top","colors":"Colors","distanceToTop":"Distance from the top in order for the button to show (px)","size":"Size","left":"Left","visibleInMobile":"Visible in mobile","iconColor":"Icon color","position":"Position","notEmpty":"Field can not be empty"},"sv":{"small":"Liten","settings":"Inställningar","backgroundColor":"Bakgrundsfärg","large":"Stor","right":"Höger","medium":"Mellan","toTop":"Till toppen","colors":"Färger","distanceToTop":"Avstånd från toppen för att knappen ska visas (px)","size":"Storlek","left":"Vänster","visibleInMobile":"Synlig i mobil","iconColor":"Färg för ikon","position":"Position","notEmpty":"Fältet får inte vara tomt"}}});
AppRegistry.registerModule({applicationId:'marketplace.sitevision.toTop|1.2.3',path:'/template/main',module:function(define){define(function(require){var _=require('underscore');return function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a href="#" id="sv-to-top" class="sv-to-top-hide">\n\n  <svg class="env-icon env-bg-color--darker" aria-hidden="true">\n    <use xlink:href="/sitevision/envision-icons.svg#icon-arrow-up"></use>\n  </svg>\n  <span class="env-assistive-text">'+
((__t=( i18n('toTop') ))==null?'':_.escape(__t))+
'</span>\n</a>';
}
return __p;
};});}});
AppRegistry.registerModule({applicationId:'marketplace.sitevision.toTop|1.2.3',path:'/main',module:function(define){'use strict';define(function (require) {
  'use strict';

  var _ = require('underscore');

  var Component = require('Component');

  var template = require('/template/main');

  var transitionToTop = {
    top: 0,
    left: 0,
    behavior: 'smooth'
  };
  return Component.extend({
    template: template,
    onRendered: function onRendered() {
      var distanceToShowIcon = this.state.distanceToShowIconFromTop || 100;
      var toTopEl = document.getElementById('sv-to-top');

      if (!this.state.visibleInMobile && document.getElementsByTagName('html')[0].classList.contains('sv-touch')) {
        return;
      }

      document.addEventListener('scroll', function () {
        var distanceFromTop = isIE() ? window.pageYOffset : window.scrollY;

        if (distanceFromTop >= distanceToShowIcon) {
          toTopEl.classList.remove('sv-to-top-hide');
          toTopEl.classList.add('sv-to-top-show');
        } else {
          toTopEl.classList.remove('sv-to-top-show');
          toTopEl.classList.add('sv-to-top-hide');
        }
      });
      toTopEl.addEventListener('click', function (e) {
        e.preventDefault();
        isIE() ? window.scrollTo(0, 0) : window.scrollTo(transitionToTop);
      });
      toTopEl.classList.add(this.state.position === 'right' ? 'sv-to-top--right' : 'sv-to-top--left');
      var svgItem = toTopEl.firstElementChild;

      if (!isIE()) {
        svgItem.classList.add('env-icon--' + this.state.size);
        svgItem.style.backgroundColor = this.state.backgroundColor;
        svgItem.style.color = this.state.iconColor;
      } else {
        svgItem.style.backgroundColor = this.state.backgroundColor;
        svgItem.style.fill = this.state.iconColor;
        svgItem.setAttribute('class', 'env-icon env-bg-color--darker env-icon--' + this.state.size);
      }
    },
    filterState: function filterState(state) {
      return _.extend({}, {
        distanceToShowIconFromTop: state.distanceToShowIconFromTop,
        backgroundColor: state.backgroundColor,
        iconColor: state.iconColor,
        position: state.position,
        visibleInMobile: state.visibleInMobile,
        size: state.size
      });
    }
  });

  function isIE() {
    var ua = window.navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/

    return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
  }
});}});