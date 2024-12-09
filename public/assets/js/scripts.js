$(document).ready(function(){
    'use strict';
    
    var vendor = window.navigator.vendor,
          platform = window.navigator.platform,
          userAgent = window.navigator.userAgent;
        
        var browser;
        
        if (navigator.userAgent.search("OPR") >= 0) {
            browser = 'Opera';
        }
        else if (navigator.userAgent.search("YaBrowser") >= 0) {
            browser = 'Yandex Browser';
        }
        else if (navigator.userAgent.search("Edg") >= 0) {
            browser = 'Edge';
        }
        else if (navigator.userAgent.search("Chrome") >= 0) {
            browser = 'Chrome';
        }
        else if (navigator.userAgent.search("Firefox") >= 0) {
            browser = 'Firefox';
        }
        else if (navigator.userAgent.search("Trident") >= 0) {
            browser = 'IE';
        }
        else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
            browser = 'Safari';
        }
    
    var macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];
        
    var os;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = "os-ios";
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
      } else if (/Windows Phone/.test(userAgent)) {
        os = 'Windows Phone';
      } else if (/Android/.test(userAgent)) {
        os = 'Android';
      } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
      }
    
    //disable and enable scroll
    function disable_scroll() {
        $("html, body").addClass('locked');
        $("body").addClass("margin-fix");
        
        if(os == "os-ios") {
            var scrollTop = $(window).scrollTop();
            var windowH = $(window).innerHeight();
            
            $("body").addClass("pop-up-open");
            $("body").attr("data-top", scrollTop);
            $("body").css({
                "top": "-" + scrollTop + "px"
            });
        } 
    }
    
    function enable_scroll() {
        jQuery("html, body").removeClass('locked');
        jQuery("body").removeClass("margin-fix");
        
        if(os == "os-ios") {
            var scTop = $("body").attr("data-top");
            var suffix = scTop.match(/\d+/);
            $("body").removeClass("pop-up-open");
            $("body").removeAttr("style");
            $("html, body").scrollTop(parseInt(suffix));
        }
    }
    //disable and enable scroll
    
    //get scrollbar width
    function scrollbarWidth() {
        var block = jQuery('<div>').css({'height':'50px','width':'50px'}),
            indicator = jQuery('<div>').css({'height':'200px'});

        jQuery('body').append(block.append(indicator));
        var w1 = jQuery('div', block).innerWidth();    
        block.css('overflow-y', 'scroll');
        var w2 = jQuery('div', block).innerWidth();
        jQuery(block).remove();
        return (w1 - w2);
    }
    
    if (scrollbarWidth() !== 0) {
        jQuery("head").append('<style>'+
            '.margin-fix {margin-right: '+scrollbarWidth()+'px;}'+
            '.margin-fix .overflow-hidden-fix {width: auto !important; right: '+scrollbarWidth()+'px !important;}'+
            '.menu-fix {transform: translateX(-'+scrollbarWidth()+'px);}'+
            '</style>');
    }
    //get scrollbar width
    
//    $(window).on("load", function(){
//        $(".fixed-menu ul").each(function(){
//        var first_li_width = $(this).find("li:first-child").innerWidth(),
//            last_li_width = $(this).find("li:last-child").innerWidth();
//        
//        if (first_li_width > last_li_width) {
//            $(this).find("li:last-child").innerWidth(first_li_width);
//        } else {
//            $(this).find("li:first-child").innerWidth(last_li_width);
//        }
//    });
//    });
    
    
    
    
    //fix css transition onload
    setTimeout(function(){
        $("body").removeClass("transition-off");
    }, 200);
    //fix css transition onload
    
    //Lightgallery function
//    if (jQuery(".lightgallery-on").length) {
//        jQuery(".lightgallery-on").each(function(){
//           var thisGallery = jQuery(this),
//               galleryImage = thisGallery.find("img");
//            
//            
//            thisGallery.addClass("lightgallery");
//        });
//        
//        jQuery(".lightgallery").each(function(){
//            var childrenElement = jQuery(this).children();
//            
//            
//            childrenElement.each(function(){
//                var thisImgSrc = jQuery(this).find("img").attr("src");
//                jQuery(this).attr("href", thisImgSrc);
//            });
//            
//            
//        })
//    }
//    
//    jQuery('.lightgallery').lightGallery({
//        counter: false,
//        enableDrag: false,
//        enableSwipe: true,
//        mousewheel: false,
//        speed: 200
//    });
//    
//    jQuery('.lightgallery').on('onBeforeOpen.lg',function(event){
//        disable_scroll();
//    });
//    
//    jQuery('.lightgallery').on('onCloseAfter.lg',function(event){
//        enable_scroll();
//    });
    //Lightgallery function
    
    
    jQuery("#js-menu-popup li").each(function(key, item){
        jQuery(this).attr("style", "transition-delay: "+(key*0.3)+"s");
    });
    
    var proceedMenu = false;
    
    $(".js-popup-open").on("click", function(e){
        if (!proceedMenu) {
            e.preventDefault();
            
            proceedMenu = true;
            
            $(".main-screen__preview picture").css("margin-right", scrollbarWidth()+"px");
            $(".fixed-menu").css({
                "right": scrollbarWidth()+"px",
                "width": "auto"
            });
            var popupId = $(this).attr("data-popup");
            disable_scroll();
            $(popupId).show();
            setTimeout(function(){
                $(popupId).addClass("opened");
            }, 100);

            setTimeout(function(){
                $(popupId).addClass("removeBorderRadius");
            }, 600);

            setTimeout(function(){
                $(popupId).addClass("openTiles");
            }, 700);

            setTimeout(function(){
                $(popupId).addClass("openedTiles");
                proceedMenu = false;
            }, 1200);
        }
        
    });
    
    $(".js-popup-close").on("click", function(e){
        e.preventDefault();
        
        if (!proceedMenu) {
            proceedMenu = true;
            enable_scroll();
            var popupSection = $(this).closest(".popup-section");
            $(".main-screen__preview picture").removeAttr("style");
            $(".fixed-menu").removeAttr("style");
        
            //popupSection.removeClass("opened");
            $(popupSection).addClass("closing");
            $(popupSection).removeClass("openedTiles");


            setTimeout(function(){
                $(popupSection).removeClass("openTiles");
            }, 100);

            setTimeout(function(){
                $(popupSection).removeClass("opened");
            }, 700);

            setTimeout(function(){
                $(popupSection).removeClass("removeBorderRadius");
            }, 750);

            setTimeout(function(){
                $(popupSection).hide();
                $(popupSection).removeClass("closing");
                
                proceedMenu = false;
            }, 1250);
        }
        
//        
//        setTimeout(function(){
//            $(popupSection).removeClass("opened");
//        }, 150);
        
    });

    //Home main screen slider
    if ($(".collections-slider").length) {
        
        $('.collections-slider').each(function(key, item) {
     
          var sliderIdName = 'collection-slider' + key;
          this.id = sliderIdName;
          var sliderId = '#' + sliderIdName;
            
            var thisParentSection = $(this).parents(".section");
//        var sliderIdName = 'mockup-slider-' + key;
        var sectionIdName = 'collections-section-' + key
//        this.id = sliderIdName;
        thisParentSection.attr("id", sectionIdName);
//        var sliderId = '#' + sliderIdName;
        var sectionId = '#' + sectionIdName;

          $(sliderId).slick({
            arrows: true,
            dots: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            fade: false,
            focusOnSelect: false,
            swipe: true,
            touchMove: false,
            draggable: false,
            autoplay: false,
            variableWidth: true,
            centerMode: false,
            prevArrow: $(sectionId + ' .arrow.prev'),
            nextArrow: $(sectionId + ' .arrow.next'),
            speed: 400,
              responsive: [
                {
                  breakpoint: 1000,
                  settings: {
                    slidesToShow: 2,
                      arrows: false,
                      swipe: false
                  }
                },
                  {
                  breakpoint: 760,
                  settings: {
                    slidesToShow: 1,
                      arrows: false,
                      swipe: false
                  }
                }
              ]
            });
            


        });
        
        
    }
    //Home main screen slider 
    
    //Play btn
    $(".video-block .play-btn").on("click", function(){
        var thisBtn = $(this),
            thisVideo = thisBtn.next(".video").find("video");
        
        thisBtn.hide();
        thisVideo.get(0).play();
        thisVideo.prop("controls", true);
    });
    //Play btn
    
    
    //Home main screen slider
    if ($(".steps-slider").length) {
        
        $('.steps-slider').each(function(key, item) {
     
          var sliderIdName = 'steps-slider' + key;
          this.id = sliderIdName;
          var sliderId = '#' + sliderIdName;
            
            var thisParentSection = $(this).parents(".section");
//        var sliderIdName = 'mockup-slider-' + key;
        var sectionIdName = 'steps-section-' + key
//        this.id = sliderIdName;
        thisParentSection.attr("id", sectionIdName);
//        var sliderId = '#' + sliderIdName;
        var sectionId = '#' + sectionIdName;

          $(sliderId).slick({
            arrows: true,
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            fade: false,
            focusOnSelect: false,
            swipe: true,
            touchMove: false,
            draggable: false,
            autoplay: false,
            variableWidth: true,
            centerMode: false,
            prevArrow: $(sectionId + ' .arrow.prev'),
            nextArrow: $(sectionId + ' .arrow.next'),
            speed: 400,
              responsive: [
            {
              breakpoint: 1368,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 1000,
              settings: {
                swipe: false
              }
            }
          ]
            });


        });
        
        
    }
    //Home main screen slider 
    
//    //Mobile menu btn
//    $("#js-menu-btn").on("click", function(){
//        disable_scroll();
//        $("#js-menu").addClass("opened");
//        $("html, body").addClass("mobile-locked");
//    });
//    
//    $("#js-menu .close").on("click", function(){
//        enable_scroll();
//        $("#js-menu").removeClass("opened");
//        $("html, body").removeClass("mobile-locked");
//    });
//    //Mobile menu btn
//    
//    

    
    
    
//    //opening fullscreen video
    if (jQuery(".js-open-fullscreen-video").length) {
        jQuery(".js-open-fullscreen-video").each(function(key){
            var thisVideo = jQuery(this).attr("data-video");
            var newIdName = 'append-video-' + key;
            
            jQuery(this).attr("data-append", newIdName);
            
            jQuery("body").append('<div class="full-video js-full-video" style="display: none;"><video controls class="fullscreen-video" id="'+newIdName+'"><source src="'+thisVideo+'" type="video/mp4"></video></div>');
            
            if (os == "os-ios") {
                document.getElementById(newIdName).addEventListener('webkitendfullscreen', function (e) { 
                    document.getElementById(newIdName).pause();
                    document.getElementById(newIdName).parentNode.style.display = 'none';
                });   
            }
        });
        
        jQuery(".js-open-fullscreen-video").on("click", function(e){
            var thisVideoBlock = jQuery(this).attr("data-append"),
                thisVideoParent = jQuery("#"+thisVideoBlock).parent();
            
            thisVideoParent.addClass("playing");
            
            if (browser == 'Firefox') {
                document.getElementById(thisVideoBlock).mozRequestFullScreen(); 
            } else {
                document.getElementById(thisVideoBlock).webkitEnterFullscreen();
            }

            thisVideoParent.show();
            document.getElementById(thisVideoBlock).play();
        });
    }
    
    if (document.addEventListener) {
            document.addEventListener('fullscreenchange', exitHandler, false);
            document.addEventListener('mozfullscreenchange', exitHandler, false);
            document.addEventListener('MSFullscreenChange', exitHandler, false);
            document.addEventListener('webkitfullscreenchange', exitHandler, false);
        }
        
        function exitHandler() {
            var playingId = jQuery(".js-full-video.playing video").attr("id");
            
            if (document.webkitIsFullScreen === false) {
                
                document.getElementById(playingId).pause();
                jQuery(".js-full-video.playing").hide();
                jQuery(".js-full-video.playing").removeClass("playing");
                
            } else if (document.msFullscreenElement === false) {
                document.getElementById(playingId).pause();
                jQuery(".js-full-video.playing").hide();
                jQuery(".js-full-video.playing").removeClass("playing");
            }
        }
        
        document.addEventListener('fullscreenchange', function(event) {
            var playingId = jQuery(".js-full-video.playing video").attr("id");
            
            if (!document.fullscreenElement) {
                document.getElementById(playingId).pause();
                jQuery(".js-full-video.playing").hide();
                jQuery(".js-full-video.playing").removeClass("playing");
            }
        });
//    //opening fullscreen video
//    
//    
//    //input placeholder function
//    jQuery("input.input[placeholder], textarea.input[placeholder]").each(function() {
//        var thisInput = jQuery(this);
//        
//        if (thisInput.val() !== "") {
//            thisInput.parent().addClass("active");
//            thisInput.prev("label").addClass("active");
//        }
//    });
//    
//    jQuery('input.input[placeholder], textarea.input[placeholder]').placeholderLabel();
//    //input placeholder function
//    
//    
//    //Opening modal window
//    $(".js-openModal").on("click", function(e){
//        e.preventDefault();
//        let thisModal = $($(this).attr("data-modal"));
//        $(".modal").not(thisModal).removeClass("opened");
//        thisModal.addClass("opened");
//        $("#overlay").fadeIn(200);
//        $(".top-panel").css({
//            "width": "auto",
//            "right": scrollbarWidth() + "px"
//        })
//        disable_scroll();
//    });
//    //Opening modal window
//    
//    //Close modal window
//    $(".modal .js-close").on("click", function(){
//        $(this).parents(".modal").removeClass("opened");
//        
//        if (!$("#js-menu").hasClass("opened")) {
//            enable_scroll();
//            $("#overlay").fadeOut(200);
//            $(".top-panel").removeAttr("style");
//        }
//    });
//    //Close modal window
//    
//    //menu close on esc
//    $('html').keydown(function(eventObject){
//      if (event.keyCode == 27) { 
//        $(".modal").removeClass("opened");
//        if (!$("#js-menu").hasClass("opened")) {
//            enable_scroll();
//            $("#overlay").fadeOut(200);
//            $(".top-panel").removeAttr("style");
//        }
//      }
//    });
//    //menu close on esc
//    
//    
//    //menu close on click behind
//    if (screen.width > 1024) {
//        $(document).mouseup(function (e){
//            var div = $(".modal");
//            if (!div.is(e.target)
//                && div.has(e.target).length === 0) {
//                    $(".modal").removeClass("opened");
//                    enable_scroll();
//                    $("#overlay").fadeOut(200);
//                    $(".top-panel").removeAttr("style");
//                }
//        });
//    }
//    //menu close on click behind
//    
//    
//    //Slider with mockup in single page
//    $('.mockup-slider').each(function(key, item) {
//        
//        var thisParentSection = $(this).parents(".macbook-mockup-section-slider");
//        var sliderIdName = 'mockup-slider-' + key;
//        var sectionIdName = 'mockup-slider-section-' + key
//        this.id = sliderIdName;
//        thisParentSection.attr("id", sectionIdName);
//        var sliderId = '#' + sliderIdName;
//        var sectionId = '#' + sectionIdName;
//        
//        $(sliderId).slick({
//            arrows: true,
//            dots: false,
//            slidesToShow: 1,
//            slidesToScroll: 1,
//            infinite: true,
//            fade: false,
//            focusOnSelect: false,
//            swipe: true,
//            touchMove: false,
//            draggable: false,
//            autoplay: false,
//            variableWidth: false,
//            centerMode: false,
//            prevArrow: $(sectionId + ' .arrow.prev'),
//            nextArrow: $(sectionId + ' .arrow.next'),
//            speed: 600
//        });
//    });
//    //Slider with mockup in single page
//    
//    
//    //sidebar wrapper
//    if ($(".sidebar").length) {
//        var sidebarItemCount = $(".sidebar-item").length;
//        
//        if (sidebarItemCount % 2 == 0)
//            var sidebar1count = sidebarItemCount / 2;
//            var sidebar2count = sidebarItemCount / 2;
//        if (sidebarItemCount % 2 == 1)
//            var sidebar1count = (sidebarItemCount / 2).toFixed(0);
//            var sidebar2count = sidebarItemCount - sidebar1count;
//        
//        
//        $( ".sidebar-item:lt("+sidebar1count+")" ).wrapAll("<div class='sidebar-part'>");
//        $(".sidebar-part").nextAll().wrapAll("<div class='sidebar-part'>");
//    }
//    //sidebar wrapper
//    
//    
//    //transform tables
//    if ($(".article-content table").length) {
//        $(".article-content table").each(function(key, item){
//            var thisTable = $(this),
//                thisTdCount = thisTable.find("tr:last-child").children("td").length;
//            
//            var newIdName = 'table-n-' + key;
//            
//            thisTable.attr("id", newIdName);
//            thisTable.addClass("count-"+thisTdCount);
//            
//            if (thisTdCount > 2) {
//                thisTable.addClass("large-table");
//            }
//            
//            if ($("#"+newIdName+" th").length) {
//                $("#"+newIdName+" th").parent().addClass("thead");
//                $("#"+newIdName).addClass("with-thead");
//            }
//            
//        });
//        
//        $(".article-content table th").each(function(){
//            var thisText = $(this).text(),
//                thisIndex = $(this).index(),
//                thisTableId = $(this).parents("table").attr("id");
//
//            $("#"+thisTableId+" td:nth-child("+(thisIndex+1)+")").attr("data-title", thisText);
//        });
//    }
//    //transform tables
//    
//    
//    //Accordions
//    $(".accordion-item .accordion-item-title").on("click", function(){
//        var thisTitle = $(this),
//            thisItem = $(this).parent(),
//            thisContent = $(this).next();
//        
//        thisItem.toggleClass("opened");
//        thisContent.slideToggle();
//    });
//    //Accordions
//    
//    //cases count
//    jQuery.Tween.propHooks.number = {
//        get: function ( tween ){
//            var num = tween.elem.innerHTML.replace(/^[^\d-]+/, '');
//            return  parseFloat(num) || 40;
//        },
//
//        set: function( tween ) {
//            var opts = tween.options;
//            tween.elem.innerHTML = (opts.prefix || '')
//            + tween.now.toFixed(opts.fixed || 0)
//            + (opts.postfix || '');
//        }
//    };
//    
//    $('.js-count').each(function(){
//        var psojectsCount = +($(this).text());
//        $(this).text("1");
//
//        $(this).delay(200)
//        .animate({ number: psojectsCount }, {
//            duration: 3000
//        });
//    });
//    //cases count
//    
//    
//    //forms
//    $('.js_form').on('submit', function(e){
//        e.preventDefault();
//        var self = $(this);
//        self.find('.js-submit').prop('disabled',true);
//        var proceed = true;
//        
//        var send_data = $(this).serialize();
//        var send_url = document.location.origin + '/send.php';
//        
//        if ($(this).data('redirect')) {
//            var succes_page = $(this).data('redirect');
//            if (typeof succes_page == "undefined") {
//                
//            }
//        }
//        
//        $.ajax({
//            type: "POST",
//            url: send_url,
//            data: send_data,
//            success: function (data) {
//                $(".modal").not("#modal_success").removeClass("opened");
//                $("#modal_success").addClass("opened");
//                $("#overlay").fadeIn(200);
//                $(".top-panel").css({
//                    "width": "auto",
//                    "right": scrollbarWidth() + "px"
//                });
//                $('.js-submit').removeAttr('disabled');
//                $('.js_form .input').val('');
//                disable_scroll();
//            },
//            error: function (xhr, str) {
//                alert("Error");
//                $('.js-submit').removeAttr('disabled');
//            }
//        });
//    });
    
//    $(".gallery-wrap").each(function(){
//        var thisWrap = $(this),
//            thisImagesWrap = thisWrap.find(".scroll"),
//            thisImagesHtml = thisImagesWrap.html();
//        
//        thisImagesWrap.append(thisImagesHtml+thisImagesHtml+thisImagesHtml+thisImagesHtml);
//    });
//    
//    if ($(".gallery-section").length) {
//        var galleryOffset = $(".gallery-section").offset().top;
//    }
//    
//    var slide = true;
//
//    $(window).on("scroll", function() {
//        var scroll = $(window).scrollTop();
//
//        //var div2 = $("#div2").offset().top;
//        var windowH = $(window).innerHeight();
//
//
//        if (scroll>=(galleryOffset-windowH)) {
//            if (slide == true) {
//                scroll_img = setInterval(function(){scrollImg($elmt);}, 20);
//                scroll_img2 = setInterval(function(){scrollImg2($elmt2);}, 20);
//            }
//            slide = false;
//        
//        } else {
//        clearInterval(scroll_img);
//        clearInterval(scroll_img2);
//            slide = true;
//            //alert("остановлен");
//        }
//    });
//    
//    $(".gallery-wrap .slide:first-child").addClass("active");
//    
//    
//        var scroll_img;
//        var $elmt = $(".gallery-wrap-1");
//        //scroll_img = setInterval(function(){scrollImg($elmt);}, 20);
//        //clearInterval(scroll_text);
//    
//        var scrollImg = function($elmt){
//        var scrollDiv = $elmt.find('.scroll'),
//            scrollDivWidth = scrollDiv.width(),
//            imagesDiv = $elmt.find('.images'),
//            imagesDivWidth = imagesDiv.width(),
//            difference = scrollDivWidth - imagesDivWidth;
//
//        var left = scrollDiv.position().left - 1;
//        if (left <= -(difference)) {
//            scrollDiv.css({
//                left: -(difference)
//            });
//        } else {
//           scrollDiv.css({
//                left: left
//            }); 
//        }
//    };
//    
//    var scroll_img2;
//        var $elmt2 = $(".gallery-wrap-2");
//    $(".gallery-wrap-2 .scroll").css("left", -(($(".gallery-wrap-2 .scroll").width())-($(".gallery-wrap-2 .images").width())));
//        //scroll_img2 = setInterval(function(){scrollImg2($elmt2);}, 20);
//        //clearInterval(scroll_text);
//    
//        var scrollImg2 = function($elmt2){
//        var scrollDiv2 = $elmt2.find('.scroll'),
//            scrollDivWidth2 = scrollDiv2.width(),
//            imagesDiv2 = $elmt2.find('.images'),
//            imagesDivWidth2 = imagesDiv2.width(),
//            difference2 = scrollDivWidth2 - imagesDivWidth2;
//            
//
//        var left = scrollDiv2.position().left + 1;
//        if (left <= -(difference2)) {
//            scrollDiv2.css({
//                left: -(difference2)
//            });
//        }
//            
//            if (left == 0) {
//                clearInterval(scroll_img2);
//                left: left
//            }
//            
//            else {
//           scrollDiv2.css({
//                left: left
//            }); 
//        }
//    };
    
    
    // работает ========
//    var gallery1_count = $(".gallery-wrap-1 .slide").length;
//    var slide_width = $(".gallery-wrap-1 .slide").eq(0).innerWidth();
//    
//    $(".gallery-wrap").each(function(key, item){
//        var thisWrap = $(this),
//            thisImagesWrap = thisWrap.find(".scroll"),
//            thisImagesHtml = thisImagesWrap.html();
//        
//        thisImagesWrap.append(thisImagesHtml);
//        
//        var galleryIdName = 'gallery-carousel-' + key;
//        thisImagesWrap.attr("id", galleryIdName);
//    });
//    
//    
//    
//    var value = 1;
//    var scrolled_pictures_count = 0;
//    
//    function updateClock() {
//        value += 1;
//        
//        if (value % slide_width == 0) {
//            if (scrolled_pictures_count == gallery1_count - 1) {
//                value = 0;
//                
//                scrolled_pictures_count = 0;
//                
//            } else {
//                scrolled_pictures_count += 1;
//            }
//        }
//        
//        $(".gallery-wrap:nth-child(odd) .scroll").css({
//            left: -value
//        });
//        $(".gallery-wrap:nth-child(even) .scroll").css({
//            left: value
//        });
//      }
//
//      updateClock();
//      var timeinterval = setInterval(updateClock, 50);
    // работает ========
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//        var value = 1;
//    var scrolled_pictures_count = 0;
//    var slide_width = $(".gallery-wrap:nth-child(1) .slide").eq(0).innerWidth();
//    
//    for (var i = 0; i < $(".gallery-wrap").length; i++) {
//        var thisWrap = $(".gallery-wrap").eq(i),
//            thisImagesWrap = thisWrap.find(".scroll"),
//            thisGalleryCount = $(".gallery-wrap:nth-child("+(i+1)+") .slide").length,
//            thisImagesHtml = thisImagesWrap.html();
//        
//        thisImagesWrap.append(thisImagesHtml);
//        
//        
//        var galleryIdName = 'gallery-carousel-' + i;
//        thisImagesWrap.attr("id", galleryIdName);
//        initializeClock(i, thisGalleryCount);
//    }
//    
//    
//    function initializeClock(id, count) {
//      
//
//      function updateClock() {
//        value += 1;
//        
//        if (value % slide_width == 0) {
//            if (scrolled_pictures_count == count - 1) {
//                value = 0;
//                
//                scrolled_pictures_count = 0;
//                
//            } else {
//                scrolled_pictures_count += 1;
//            }
//        }
//          
//          if (id % 2 == 0) {
//              $("#gallery-carousel-"+id).css({
//                    left: -value
//                });
//          } else {
//              $("#gallery-carousel-"+id).css({
//                    left: value
//                });
//          }
//        
//        
//      }
//
//      updateClock();
//      var timeinterval = setInterval(updateClock, 50);
//    }
//    
//    
//    if ($(".gallery-section").length) {
//        var galleryOffset = $(".gallery-section").offset().top;
//        var nextSectionFromGallery = $(".gallery-section").offset().top + $(window).innerHeight();
//        
//        var slide = true;
//        
//        $(window).on("scroll", function() {
//            var scroll = $(window).scrollTop();
//            var windowH = $(window).innerHeight();
//
//
//            if (scroll >= (galleryOffset-windowH) && scroll < (nextSectionFromGallery)) {
//                if (slide == true) {
//                    slide = false;
//                    //запускаем слайдер
//                    $(".gallery-section").addClass("enabled");
//                }
//                
//
//            } 
//            
//            if (scroll>=nextSectionFromGallery || scroll < (galleryOffset-windowH)) {
//                if (slide == false) {
//                    slide = true;
//                    //убиваем слайдер
//                    $(".gallery-section").removeClass("enabled");
//                }
//            }
//        });
//    }
    
    
    if ($(".gallery-section").length) {
                //var value = 1;
    //var scrolled_pictures_count = 0;
    var slide_width = $(".gallery-wrap:nth-child(1) .slide").eq(0).innerWidth();
        
        var galleryOffset = $(".gallery-section").offset().top;
        var galleryNextOffset = $(".gallery-section").offset().top + $(".gallery-section").innerHeight();
        
        $(".gallery-wrap .scroll").each(function(key, item){
            var galleryIdName = 'gallery-carousel-' + key;
            $(this).attr("id", galleryIdName);
            $(this).attr("data-value", 0);
            $(this).attr("data-scrolled-images", 0);
        });
        
        for (var i = 0; i < $(".gallery-wrap").length; i++) {
            var thisImagesWrap = $("#gallery-carousel-" + i),
                thisGalleryCount = $("#gallery-carousel-" + i + " .slide").length,
                thisImagesHtml = thisImagesWrap.html();

            thisImagesWrap.append(thisImagesHtml);
        }
    }
    
    var slide = true;
    var scroll_img;
    
    var video_did_load = false;

    $(window).on("scroll", function() {
        var scroll = $(window).scrollTop();
        var windowH = $(window).innerHeight();

        if (scroll>=(galleryOffset-windowH) && scroll < galleryNextOffset) {
            if (slide == true) {
                
                scroll_img = setInterval(scrollImg, 20);
                    //scroll_img2 = setInterval(function(){scrollImg2($elmt2);}, 20);
                    console.log("запуск");
                
                
            }
            slide = false;
        
        } 
        
        if (scroll<(galleryOffset-windowH) || scroll >= galleryNextOffset) {
            if (slide == false) {
                clearInterval(scroll_img);
                //scroll_img = setInterval(function(){scrollImg($elmt);}, 20);
                //scroll_img2 = setInterval(function(){scrollImg2($elmt2);}, 20);
                console.log("стоп");
            }
            slide = true;
        }
        
//        else {
//        clearInterval(scroll_img);
//        clearInterval(scroll_img2);
//            slide = true;
//        }
        
        
        if ($(".video-section").length) {
            var video_section_offset = $(".video-section").offset().top
            
            if (scroll >= video_section_offset - windowH && !video_did_load) {
                video_did_load = true;
                
                var videoShort = document.querySelectorAll(".video-preload");
        
                for (let video of videoShort) {
                    var videoLink = video.getAttribute('data-video');
                    video.innerHTML = '<video loop autoplay muted playsinline class="fullscreen-bg__video lazy-hidden" id="video1" poster="video/stop.jpg"><source src="'+videoLink+'" type="video/mp4"></video>';
                }
            }
            
        }
    });
    
    var scrollImg = function(){
        
        
            //value += 1;
        
//            var thisElement = $("#gallery-carousel-" + i);
//            var thisElementCount = $("#gallery-carousel-" + i + " .slide").length / 2;
//            console.log(thisElementCount);
        
        $(".gallery-wrap .scroll").each(function(key, item){
            var value = parseInt($("#gallery-carousel-" + key).attr("data-value"));
            value = value + 1;
            var scrolled_pictures_count = parseInt($("#gallery-carousel-" + key).attr("data-scrolled-images"));
            $("#gallery-carousel-" + key).attr("data-value", value);
            var thisElementCount = $("#gallery-carousel-" + key + " .slide").length / 2;
            
            
            //console.log(value);
            
            if (value % parseInt(slide_width) == 0) {
                scrolled_pictures_count += 1;
                $("#gallery-carousel-" + key).attr("data-scrolled-images", scrolled_pictures_count)
            
                if (scrolled_pictures_count == thisElementCount) {
                    value = 0;
                    $("#gallery-carousel-" + key).attr("data-value", 0);

                    scrolled_pictures_count = 0;
                    $("#gallery-carousel-" + key).attr("data-scrolled-images", 0)

                }
                    console.log("в "+key+" скролле проскролено "+scrolled_pictures_count+" картинок");


            } else {
                if (key % 2 == 0) {
                  $("#gallery-carousel-"+key).css({
                        left: -value
                    });
              } else {
                  $("#gallery-carousel-"+key).css({
                        left: value
                    });
              }
            }
        });
            
        
          
          
            
        
    };
    
    
    $(".accordion-item .accordion-item-header").on("click", function(){
       var thisHeader = $(this),
           thisItem = $(this).closest(".accordion-item"),
           thisBody = $(this).next(".accordion-item-body");
        
        thisItem.toggleClass("opened");
        thisBody.slideToggle();
    });
    
    $(".js-anchor").on("click",function(e){
        e.preventDefault();
        var thisHref = $(this).attr("href");
        var plansOffset=$(thisHref).offset().top;
        $("html, body").animate({
            scrollTop:plansOffset
        },500);
        
        if ($(this).hasClass("in-menu")) {
            enable_scroll();
            var popupSection = $(".popup-section");
            $(".main-screen__preview picture").removeAttr("style");
            $(".fixed-menu").removeAttr("style");
        
            //popupSection.removeClass("opened");
            popupSection.addClass("closing");
            popupSection.removeClass("openedTiles");


            setTimeout(function(){
                popupSection.removeClass("openTiles");
            }, 100);

            setTimeout(function(){
                popupSection.removeClass("opened");
            }, 700);

            setTimeout(function(){
                popupSection.removeClass("removeBorderRadius");
            }, 750);

            setTimeout(function(){
                popupSection.hide();
                popupSection.removeClass("closing");
                
                proceedMenu = false;
            }, 1250);
        }
    });
    
    
    window.setInterval(function(){

    var randomColor = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
    
    $('.main-screen').css({
      'background-color' : randomColor,
    });

  }, 3000);
});	




//
//// frame element
//const frame = document.querySelector('.frame');
//
//// overlay (SVG path element)
//const overlayPath = document.querySelector('.overlay__path');
//
//// menu (wrap) element
//const menuWrap = document.querySelector('.menu-wrap');
//
//// menu items
//const menuItems = menuWrap.querySelectorAll('.menu__item');
//
//// open menu button
//const openMenuCtrl = document.querySelector('.button-menu');
//
//// close menu button
//const closeMenuCtrl = menuWrap.querySelector('.button-close');
//
//// big title elements
//const title = {
//    main: document.querySelector('.content__title-main'),
//    sub: document.querySelector('.content__title-sub')
//};
//
//let isAnimating = false;
//
//// opens the menu
//const openMenu = ()  => {
//    
//    if ( isAnimating ) return;
//    isAnimating = true;
//
//}
//
//// closes the menu
//const closeMenu = ()  => {
//    
//    if ( isAnimating ) return;
//    isAnimating = true;
//    gsap.timeline({
//            onComplete: () => isAnimating = false
//        })
//        .set(overlayPath, {
//            attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
//        })
//        .to(overlayPath, { 
//            duration: 0.8,
//            ease: 'power4.in',
//            attr: { d: 'M 0 0 V 50 Q 50 100 100 50 V 0 z' }
//        }, 0)
//        .to(overlayPath, { 
//            duration: 0.3,
//            ease: 'power2',
//            attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' },
//            onComplete: () => {
//                frame.classList.remove('frame--menu-open');
//                menuWrap.classList.remove('menu-wrap--open');
//            }
//        })
//        // now reveal
//        .set(overlayPath, { 
//            attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' }
//        })
//        .to(overlayPath, { 
//            duration: 0.3,
//            ease: 'power2.in',
//            attr: { d: 'M 0 100 V 50 Q 50 100 100 50 V 100 z' }
//        })
//        .to(overlayPath, { 
//            duration: 0.8,
//            ease: 'power4',
//            attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
//        })
//        // title elements
//        .to([title.main, title.sub], { 
//            duration: 1.1,
//            ease: 'power4',
//            y: 0,
//            stagger: -0.05
//        }, '>-=1.1')
//        // menu items translate animation
//        .to(menuItems, { 
//            duration: 0.8,
//            ease: 'power2.in',
//            y: 100,
//            opacity: 0,
//            stagger: -0.05
//        }, 0)
//
//}
//
//
//// click on menu button
//openMenuCtrl.addEventListener('click', openMenu);
//// click on close menu button
//closeMenuCtrl.addEventListener('click', closeMenu);



//    //preload video
//    window.onload = function () { 
//    var videoShort = document.querySelectorAll(".video-preload");
//        
//        for (let video of videoShort) {
//            var videoLink = video.getAttribute('data-video');
//            video.innerHTML = '<video loop autoplay muted playsinline class="fullscreen-bg__video lazy-hidden" id="video1"><source src="'+videoLink+'" type="video/mp4"></video>';
//        }
//    }
//    //preload video

