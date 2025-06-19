/* Debounce
--------------------------------------------------------------------------------------------- */
window.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

jQuery( document ).ready(function() {
    
    if ( ! jQuery( '.behavior-thumbnail-youtube-player' ).length ) {
        return;
    }
    if ( ! jQuery( '.thumbnail-youtube-player' ).length ) {
        return;
    }
    
    window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
    
        jQuery( '.thumbnail-youtube-player' ).each(function() {

            var player,
                self = jQuery( this ),
                youtubeid = self.data( 'youtubeid' ),
                placement = self.find( '.thumbnail-inner' ).find( '.yt-placement' )

            if ( ! placement.length ) {
                self.find( '.thumbnail-inner' ).prepend( '<div class="yt-placement" />' )
                placement = self.find( '.thumbnail-inner' ).find( '.yt-placement' )
            }

            if ( ! placement.attr( 'id' ) ) {
                placement.attr( 'id', 'yt-' + Date.now() )
            }

            var placement_id = placement.attr( 'id' )

            player = new YT.Player( placement_id, {
                videoId: youtubeid,
                height: 720,
                width: 1280,
                events: {
                    onReady: onPlayerReady, 
                    onStateChange: onPlayerStateChange
                }
            });

            function onPlayerReady(event) {

                self.data( 'player', player )
                self.on( 'click', function(e) {
                    event.target.setVolume(0);
                    event.target.playVideo();
                    self.addClass( 'played' );
                    setTimeout( function(){
                        event.target.setVolume(3);  
                    }, 300 )
                })
                self.find( '.thumbnail-inner' ).fitVids()

            }
            function onPlayerStateChange(event) {}

        })

    }
    
});

( function( $ ) {
    
    /**
     * Youtube API load for video playing
     */
    $( window ).on( 'elementor/frontend/init', function() {
        
        if ( ! jQuery( '.behavior-thumbnail-youtube-player' ).length ) {
            return;
        }
        if ( ! jQuery( '.thumbnail-youtube-player' ).length ) {
            return;
        }
        
        // only load when we have player button available
        var tag = document.createElement( 'script' );
        tag.id = 'iframe-demo';
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
    })
    
    /**
     * BUTTON BEHAVIOUR
     */
    $( window ).on( 'elementor/frontend/init', function() {
        
        elementorFrontend.hooks.addAction( 'frontend/element_ready/fox_btn.default', function( $scope, $ ) {
        
            $( document ).on( 'click', '.btn-popup', function( e ) {
                e.preventDefault()

                var self = $( this ),
                    popup_selector = self.data( 'popup' )

                if ( ! $( popup_selector ).length ) {
                    return
                }

                $( 'html' ).addClass( 'openning-popup' )
                $( popup_selector ).addClass( 'showing' )

            });

            $( document ).on( 'click', '.el-popup-overlay', function( e ) {
                e.preventDefault()

                var self = $( this ),
                    the_popup = self.prev( '.el-popup' )

                if ( ! $( the_popup ).length ) {
                    return
                }

                $( 'html' ).removeClass( 'openning-popup' )
                the_popup.removeClass( 'showing' )

            });

            $( document ).on( 'click', '.popup-close', function( e ) {
                e.preventDefault()

                var self = $( this ),
                    the_popup = self.closest( '.el-popup' )

                if ( ! $( the_popup ).length ) {
                    return
                }

                $( 'html' ).removeClass( 'openning-popup' )
                the_popup.removeClass( 'showing' )

            });
            
            //  close the form by escape
            // since 1.7.3
            $( document ).on( 'keydown', function( e ) {
                // ESCAPE key pressed
                if (e.keyCode == 27) {
                    $( 'html' ).removeClass( 'openning-popup' )
                    $( '.el-popup' ).removeClass( 'showing' ) // close all
                }
            });
            
        });
        
        /**
         * search form, since 1.7.3
         */
        elementorFrontend.hooks.addAction( 'frontend/element_ready/fox_search.default', function( $scope, $ ) {

            $( document ).on( 'click', '.form-showup-click .search-hit-btn', function( e ) {
                e.preventDefault();
                var form_click = $( this ).closest( '.form-showup-click' )
                form_click.addClass( 'showing_form' )
            })
            
            // close the form
            $( document ).on( 'click', function( e ) {
                if ( ! $( e.target ).is( '.form-showup-click' ) && ! $( e.target ).closest( '.form-showup-click' ).length ) {
                    $( '.form-showup-click' ).removeClass( 'showing_form' )
                } 
            });
            
            //  close the form by escape
            $( document ).on( 'keydown', function( e ) {
                // ESCAPE key pressed
                if (e.keyCode == 27) {
                    $( '.form-showup-click' ).removeClass( 'showing_form' )
                }
            });

        });
        
    });

    /**
     * POST SLIDER
     */
    $( window ).on( 'elementor/frontend/init', function() {

        elementorFrontend.hooks.addAction( 'frontend/element_ready/post-slider.default', function( $scope, $ ) {
        
            if ( ! $().flexslider ) return;
            if ( ! $().imagesLoaded ) return;

            $( '.fox-flexslider.blog-slider' ).each( function() {
                
                var $this = $( this ),
                    defaultOptions = {
                        animation: 'fade',
                        smoothHeight : false,
                        animationSpeed : 500,
                        slideshowSpeed	:	5000,
                        directionNav	:	true,
                        slideshow		:	true,
                        controlNav : false,
                        pauseOnHover: true,
                        
                        prevText : '<i class="fa fa-angle-left"></i>',
                        nextText : '<i class="fa fa-angle-right"></i>',
                        
                        start            :   function( slider ) {
                            $this.addClass('loaded');
                            slider.find( 'img' ).trigger( 'flexslider_complete' );
                        }
                    },
                    args = $( this ).data( 'options' ),
                    options = $.extend( defaultOptions, args );
                    
                $this.imagesLoaded( function() {
                    $this.addClass( 'loaded' )
                    $this.find( '.flexslider' ).flexslider( options );
                });
            
            });
            
        });
        
    });

    var masonry_behavior = function( $scope, $ ) {
        
        if ( ! $().masonry ) return;
        if ( ! $().imagesLoaded ) return;

        var run = debounce( function() {
            
            $( '.fox-masonry' ).each(function() {
                
                var grid = $( this );
                
                grid.imagesLoaded(function() {
                    
                    var itemSelector = '.fox-masonry-item';
                    if ( grid.hasClass( 'blog-newspaper' ) ) {
                        itemSelector = '.post-newspaper';
                    }
                
                    grid
                    .addClass( 'loaded' )
                    .masonry({
                        itemSelector: itemSelector,
                        columnWidth: '.grid-sizer',
                        percentPosition: true,
                    })
                    .find( itemSelector ).each(function() {
                    
                        var item = $( this );
                        
                        item.bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
                            if (isInView) {
                                item.addClass( 'inview' );
                            } // inview
                        }); // bind inview    
                    
                    });
                
                });
                
            });
            
        }, 100 );
        
        run();
        $( window ).resize( function(){ run() });
        
    }

    /**
     * POST MASONRY
     */
    $( window ).on( 'elementor/frontend/init', function() {

        elementorFrontend.hooks.addAction( 'frontend/element_ready/post-masonry.default', masonry_behavior );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/post-newspaper.default', masonry_behavior );
        
    });

    /**
     * HORIZONTAL NAV
     */
    var hnav_behavior = function() {
        var navSelector = $( '.el-nav.hnav > .nav-inner' );
    
        // APPENDING a caret
        navSelector.each(function() {
            $( this ).find( '> ul.menu > li > ul' ).append( '<span class="caret" />' ); // since 4.0
        });
        
        // MEGA
        var setup_mega = function() {

            var outerContainer = navSelector.closest( '.container, .elementor-container' )
            if ( outerContainer.length ) {
                var outerContainerLeft = outerContainer.offset().left,
                    outerContainerWidth = outerContainer.outerWidth()
            } else {
                var outerContainerWidth = screen.width - 100
            }
            
            navSelector.find( 'ul.menu > li.mega' ).each(function() {

                var li = $( this );
                
                // COLUMN
                var col = li.find( '> ul' ).find( ' > li' ).length;
                if ( li.hasClass( 'menu-item-object-category' ) ) col = 3;

                if ( col > 0 ) {
                    li.addClass( 'column-' + col );
                }
                if ( col >= 4 ) {
                    li.addClass( 'mega-full' );
                }

                // please don't add for mega menu
                if ( ! li.hasClass( 'menu-item-object-category' ) && ! li.find( '> ul .mega-sep' ).length ) {
                    for ( var i = 1; i <= col -1; i++ ) {
                        li.find( '> ul' ).append( '<span class="mega-sep mega-sep-' + i + '"></span>' )
                    }
                }

                // ADJUST DROPDOWN ACCORDINGLY
                // MEGA POSITION
                var lis = li.parent().find( '> li' ),
                    li_pos = lis.index( li ),
                    ul = li.find( '>ul' )
                
                // margin left is a formula of column + position
                var marginLeft = 0;
                if ( li_pos == 2 ) {
                    if ( col == 3 ) {
                        marginLeft = 200;
                    }
                } else if ( li_pos + 2 >= lis.length ) {
                    if ( col == 2 ) {
                        marginLeft = 320;
                    } else if ( col == 3 ) {
                        marginLeft = 520;
                    }
                } else if ( li_pos >= 3 ) {
                    if ( col == 2 ) {
                        marginLeft = 200;
                    } else if ( col == 3 ) {
                        marginLeft = 300;
                    }
                }

                if ( col >= 4 ) {

                    li.addClass( 'mega-full' );
                    ul.css('width', outerContainerWidth)
                    var translateX = li.offset().left - outerContainerLeft

                } else {
                
                    /* ------------------- adjust the position of menu correctly */
                    var dropdown_width = ul.outerWidth(),
                        translateX = dropdown_width/2 - li.outerWidth()/2 - 30, // the ideal one, 60 is a small factor
                        li_away_left = li.offset().left - outerContainerLeft,
                        li_away_right = outerContainerWidth - ( li_away_left + li.outerWidth() )

                    // this means it's way too left, so don't translate left too much
                    if ( li_away_left < translateX ) {
                        translateX = li_away_left - 40
                    
                    // this means it's way too right, so we translate left as much as we can
                    } else if ( li_away_right < translateX ) {
                        translateX = dropdown_width - ( outerContainerWidth - li_away_left ) + 40
                    }

                }

                ul.css({
                    transform: 'translate(-' + translateX + 'px,0)',
                })
                
                /**
                 * since 5.6
                 * right edge problem
                 */
                // li.find( '>ul' ).outerWidth() 

                /*
                if ( marginLeft > 0 ) {

                    li.find( '>ul' ).css({
                        left: '50%',
                        'transform': 'translateX(-' + marginLeft + 'px)',
                    });

                    li.find( '> ul > .caret' ).css({
                        left: '-10px',
                        'transform': 'translateX(' + marginLeft + 'px)',
                    });

                }
                */

            });
            
        }
        
        setup_mega();
        
        var run_superfish = function() {
            
            if ( $().superfish ) {
            
                var args = {
                    delay: 0,
                    speed: 400,
                    speedOut: 100,
                    animation: {
                        opacity : 'show',
                    },							   
                };
            
                navSelector.each(function() {

                    $( this ).find( 'ul.menu' ).superfish( args );

                });
                
            }
            
        }
        
        // this runs when window is fully loaded
        run_superfish();
        $( window ).on( 'resize', run_superfish );
        
    }
    
    /**
     * VERTICAL NAV
     */
    var vnav_behavior = function() {
        
        /**
         * dropdown markup first
         */
        $( '.vnav' ).each(function(){
            var self = $( this )
            self.find( 'li.menu-item-has-children' ).each(function(){
                var li = $( this )
                if ( ! li.find( '>a>.caret' ).length ) {
                    li.find( '>a' ).append('<u class="caret"><i class="fa fa-angle-down"></i></u>')
                }
            })
        })
        
        $( document ).on( 'click', '.vnav li.menu-item-has-children > a', function( e ) {
            var self = $( this ),
                href = self.attr( 'href' ),
                target = $( e.target ),
                li = self.parent(),
                ul = li.parent()
            
            if ( ! href || '#' == href ) {
                e.preventDefault()
            }
            
            console.log( target.attr( 'class' ) )
            
            if ( target.hasClass( 'caret' ) || target.parent().hasClass( 'caret' ) ) {
                e.preventDefault()
            }

            // ah, we don't open mega items
            if ( ! li.find('>ul').length ) {
                return
            }

            // if we're clicking to the active one
            if ( li.hasClass( 'active' ) ) {

                li.find( '>ul' ).slideUp( 'fast', 'linear', function() {
                    li.removeClass( 'active' )    
                })

            // otherwise
            } else {

                ul.find( '>li' ).each( function() {
                    var ul_li = $( this )
                    if ( ul_li.hasClass( 'active' ) ) {
                        ul_li.find( '>ul' ).slideUp( 'fast', 'linear', function() {
                            ul_li.removeClass( 'active' );
                        });
                    }
                })

                li.find( '>ul' ).slideDown( 'fast', 'linear', function(){
                    li.addClass( 'active' )   
                })


            }
        });
    }
    $( window ).on( 'elementor/frontend/init', function() {
        vnav_behavior()
        elementorFrontend.hooks.addAction( 'frontend/element_ready/fox_nav.default', function( $scope, $ ) {
            vnav_behavior()
            hnav_behavior()
        });
    })

    /**
     * SHARE
     */
    $( window ).on( 'elementor/frontend/init', function() {
        var Config = {
            Link: "a.share",
            Width: 800,
            Height: 600
        };
     
        $( document ).on( 'click', 'a.share', function( e ) {
     
            e = (e ? e : window.event);
            var t = $(this);
     
            // popup position
            var
                px = Math.floor(((screen.availWidth || 1024) - Config.Width) / 2),
                py = Math.floor(((screen.availHeight || 700) - Config.Height) / 2);
     
            // open popup
            if(t.attr('href')) {
                var popup = window.open(t.attr('href'), "social", 
                    "width="+Config.Width+",height="+Config.Height+
                    ",left="+px+",top="+py+
                    ",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
                if (popup) {
                    popup.focus();
                    if (e.preventDefault) e.preventDefault();
                    e.returnValue = false;
                }
         
                return !!popup;
            }
        }); // click
    })
	
    $( window ).on( 'elementor/frontend/init', function() {
        //hook name is 'frontend/element_ready/{widget-name}.{skin} - i dont know how skins work yet, so for now presume it will
        //always be 'default', so for example 'frontend/element_ready/slick-slider.default'
        //$scope is a jquery wrapped parent element
        
        if ( typeof WITHEMES !== 'undefined' ) {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/post-masonry.default', function( $scope, $ ) {
                WITHEMES.reInit();
            });
            
            elementorFrontend.hooks.addAction( 'frontend/element_ready/post-standard.default', function( $scope, $ ) {
                WITHEMES.reInit();
            });
            
            elementorFrontend.hooks.addAction( 'frontend/element_ready/post-newspaper.default', function( $scope, $ ) {
                WITHEMES.reInit();
            });
            
            /*
            elementorFrontend.hooks.addAction( 'frontend/element_ready/post-slider.default', function( $scope, $ ) {
                WITHEMES.reInit();
            });
            */
            
            elementorFrontend.hooks.addAction( 'frontend/element_ready/post-group-1.default', function( $scope, $ ) {
                WITHEMES.reInit();
            });
            
            elementorFrontend.hooks.addAction( 'frontend/element_ready/post-group-2.default', function( $scope, $ ) {
                WITHEMES.reInit();
            });
        }
        
    });
    
} )( jQuery );


jQuery(document).ready(function( $ ) {
    
    $( '.fox-sticky-section' ).each( function() {
        
        var self = $( this ),
            height_Element = self.next()
        
        if ( ! height_Element.length || ! height_Element.is( 'sticky-section-height' ) ) {
            self.after( '<div class="sticky-section-height" />' )
        }
        height_Element = self.next()
        height_Element.css({
            height: self.outerHeight(),
        })
        
        var self_top = self.offset().top,
            self_height = self.outerHeight()
            
        
        // on scroll
        $( window ).on( 'scroll', function() {
            
            var windowTop = $( window ).scrollTop()

            // a safe distance
            if ( windowTop > self_top + self_height + 200 ) {
                self.addClass('before-sticky is-sticky');
            } else if ( windowTop > self_top + self_height ) {
                self.removeClass('is-sticky');
                self.addClass('before-sticky');
            } else {
                self.removeClass('is-sticky before-sticky');
            }
            
        });
        
        // on resize
        // recompute the height of height element
        $( window ).on( 'resize', function() {
            height_Element.css({
                height: self.outerHeight(),
            })
        })

    }); // seach sticky section
						   
});