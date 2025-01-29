   
   var playerYouTube1;
   function onYouTubeIframeAPIReady() {
      playerYouTube1 = new YT.Player('YouTube1', {
         events: {
         }
      });
   }
   
   document.addEventListener('DOMContentLoaded', function(event)
   {
      var Carousel1 = new bootstrap.Carousel('#Carousel1', {interval: 3000, pause: false});
      var ThemeableMenu1_dropdownToggle = document.querySelectorAll('#ThemeableMenu1 .dropdown-toggle');
      ThemeableMenu1_dropdownToggle.forEach(item => 
      {
         var dropdown = new bootstrap.Dropdown(item, {popperConfig:{placement:item.getAttribute('data-bs-placement')}});
      });
      var ThemeableMenu1_dropdown = document.querySelectorAll('#ThemeableMenu1 .dropdown');
      ThemeableMenu1_dropdown.forEach(item => 
      {
         item.addEventListener('shown.bs.dropdown', function(e)
         {
            e.currentTarget.classList.add('show');
         });
         item.addEventListener('hidden.bs.dropdown', function(e)
         {
            e.currentTarget.classList.remove('show');
         });
      });
      document.addEventListener('click', function (e)
      {
         var isChildOfDropdownMenu = false;
         var target = e.target;
         while (target !== null)
         {
            if (target.classList && target.classList.contains('ThemeableMenu1-navbar-collapse') && target.classList.contains('show'))
            {
               isChildOfDropdownMenu = true;
               break;
            }
            target = target.parentNode;
         }
         if (isChildOfDropdownMenu)
         {
            if (e.target.tagName.toLowerCase() === 'a' && !e.target.classList.contains('dropdown-toggle'))
            {
               const dropdownMenu = document.querySelector('.ThemeableMenu1-navbar-collapse');
               if (dropdownMenu)
               {
                  const collapseInstance = bootstrap.Collapse.getInstance(dropdownMenu);
                  if (collapseInstance)
                  {
                     collapseInstance.hide();
                  }
               }
            }
         }
      });
      var Carousel2 = new bootstrap.Carousel('#Carousel2', {interval: 3000, pause: false});
   });
   
   $(document).ready(function()
   {
      var sliderSlideShow2 = $('#SlideShow2-gallery').lightSlider(
      {
         controls: false,
         gallery: true,
         item: 1,
         loop: true,
         thumbItem: 3,
         thumbMargin: 5,
         galleryMargin: 5,
         pause: 3000,
         auto: true
   });
      $("a[href*='#LayoutGrid8']").click(function(event)
      {
         event.preventDefault();
         $('html, body').stop().animate({ scrollTop: $('#wb_LayoutGrid8').offset().top-88 }, 600, 'easeOutCirc');
      });
      $("#SlideShow1").slideshow(
      {
         interval: 3000,
         type: 'sequence',
         effect: 'none',
         direction: '',
         pagination: false,
         effectlength: 2000
      });
      $("#RollOverText1").hover(function()
      {
         var y = $(this).height() - $(".caption", this).outerHeight();
         $(".caption", this).css("top", y);
         $(".caption", this).stop().animate({opacity: 0.60},{queue:false, duration:500});
      }, function()
      {
         $(".caption", this).stop().animate({opacity: 0},{queue:false, duration:500});
      });
   });
