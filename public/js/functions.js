function initChangeCar(){
  window.getData()
  alert("here=>>>>>>>>>>>>.")
  $("table#tripLogTable").on('focus', '.carAutoComplete',function() {
    $(this).addClass('stop_loadTripLog');
    var id = $(this).attr('id');
    $(this).on('keyup', function(e) {
        // alert("me too listioning");
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13 && $(this).val() != "") {
            var term = $(this).val();
            var callType = $(this).attr('rel-call_type');
            var currentDispacher = $(this).attr('rel-current-dispacher');
            var loggedInDispacher="<?php echo $dispacherId; ?>";
            var ParentDispacher = $(this).attr('rel-parent-dispacher');
            /**New Route Assign method Start here**/
             if (term == "r" || term == "R") {
                    $.post("/dispatchertriplogs/opentripsroute", {'id':id,'currentDispacher':currentDispacher,'ParentDispacher':ParentDispacher}, function(data) {
                        jQuery.colorbox({
                            width: "300px",
                            height: "300px",
                            speed: 0,
                            html: data,
                            onComplete: function() {
                                indicate_popup_open = 'open';
                                //save the new assigned dispacher
                                $("#DispatcherTriplogDeviceId").change(function(){
                                if($(this).val()){
                                    var tripid=$(this).attr('rel-data');
                                    var assignedDeviceid=$(this).val();
                                    var car_no = jQuery('#DispatcherTriplogDeviceId option[value="' + assignedDeviceid + '"]').text();
                                    var confrm=confirm("Are you sure to reassign this car to selected trip route ?");
                                    if(confrm){
                                        $.ajax({
                                            url:'/dispatchertriplogs/routecarassignaSave',
                                            data:{'tripid':tripid,'assignedDeviceid':assignedDeviceid,'car_no':car_no,"loggedInDispacher":loggedInDispacher,"ParentDispacher":ParentDispacher},
                                            type:'post',
                                            dataType:'json',
                                            success:function(msg){
                                                $("#DispatcherTriplogDispacherIdWrapper").html(msg.msg);
                                            }
                                        });
                                    }
                                }
                            });
                            },
                            onClosed: function() {
                                indicate_popup_open = '';
                                loadTripLog();
                            }
                        });
                    });
                    return false;
                }
            /**Route Assign method end here**/
            if ((loggedInDispacher == currentDispacher && currentDispacher != ParentDispacher)||(loggedInDispacher==ParentDispacher)) {
                if (term == "a" || term == "A") {
                    $.post("/dispatchertriplogs/opentripsparentchild", {'id': id,'currentDispacher':currentDispacher,'ParentDispacher':ParentDispacher}, function(data) {
                        jQuery.colorbox({
                            width: "300px",
                            height: "300px",
                            speed: 0,
                            html: data,
                            onComplete: function() {
                                indicate_popup_open = 'open';
                                //save the new assigned dispacher
                                $("#DispatcherTriplogDispacherId").change(function(){
                                    if($(this).val()){
                                        var tripid=$(this).attr('rel-data');
                                        var assignedDispacherid=$(this).val();
                                        var confrm=confirm("Are you sure to reassign this call to selected company ?");
                                        if(confrm){
                                            $.ajax({
                                              url:'/dispatchertriplogs/reassignaffiliateSave',
                                              data:{'tripid':tripid,'assignedDispacherid':assignedDispacherid},
                                              type:'post',
                                              dataType:'json',
                                              success:function(msg){
                                                  /*if(msg.status=='error'){
                                                      alert(msg.msg);
                                                  }*/
                                                  $("#DispatcherTriplogDispacherIdWrapper").html(msg.msg);
                                            }
                                        });
                                      }
                                  }
                              });

                            },
                            onClosed: function() {
                                indicate_popup_open = '';
                                loadTripLog();
                            }
                        });
                    });
                    return false;
                }
                //validate to CHILD dispacher to dispatch the NET type trip again as NET
                if (term == "N" || term == "n") {
                    alert("Sorry, you don't have permission for this action.");
                    $(this).val('Send To NET');
                    return false;
                }

                $.post("/dispachers/car_autocomplete/", {'term': term}, function(data) {
                    var jsonObj = jQuery.parseJSON(data);
                    var car_no = jsonObj.value;
                    var device_id = jsonObj.id;
                    var call_type_line = jsonObj.call_type_line;
                    var status = jsonObj.status;
                    sendInfoToAffiliatetriplogFlag=true;
                    sendInfoToAffiliatetriplog(car_no, device_id, id, status, call_type_line);
                });

            } else {

                $.post("/dispachers/car_autocomplete/", {'term': term}, function(data) {
                    var jsonObj = jQuery.parseJSON(data);
                    var car_no = jsonObj.value;
                    var device_id = jsonObj.id;
                    var call_type_line = jsonObj.call_type_line;
                    var status = jsonObj.status;
                    sendInfoToCar_triplog(car_no, device_id, id, status, call_type_line);
                });
            }
        }
        else {
            if ($(this).val() == "c" || $(this).val() == "C") {
                $(this).val("Car #");
            }
            if ($(this).val() == "s" || $(this).val() == "S") {
                $(this).val("Send To All");
            }
            if ($(this).val() == "l" || $(this).val() == "L") {
                $(this).val("Line");
            }
            if ($(this).val() == "n" || $(this).val() == "N") {
                $(this).val("Send To NET");
            }
            if ($(this).val() == "d" || $(this).val() == "D") {
                $(this).val("Auto-Dispatch");
            }
        }

    });
});
}

/*
 * Custom Select Script
 */
function changeCustomSelect() {
  $(".select-selected").remove();
  var x, i, j, selElmnt, a, b, c;
  x = document.getElementsByClassName("custom-select");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);

    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 0; j < selElmnt.length; j++) {
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            if ("createEvent" in document) {
              var evt = document.createEvent("HTMLEvents");
              evt.initEvent("change", false, true);
              s.dispatchEvent(evt);
            } else s.fireEvent("onchange");
            // s.fireEvent("onchange");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
}

function closeAllSelect(elmnt) {
  var x,
    y,
    i,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
document.addEventListener("click", closeAllSelect);
/*_______________________________________________________________________*/

/*
 *	Flexslider Script
 */
// store the slider in a local variable
var $window = $(window),
  flexslider = { vars: {} },
  flexsliderProducts = { vars: {} },
  flexsliderProductsC = { vars: {} };

// tiny helper function to add breakpoints
function getGridSize() {
  return window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 3 : 4;
}
function getGridSizeForProducts() {
  return window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;
}
function getGridSizeForProductsC() {
  return window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 4;
}

function initTestimonialsCarousal() {
  if ($("#testimonialcarousel .item").length) {
    $("#testimonialcarousel").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsiveClass: true,
      nav: true,
      dots: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 3,
          //loop: false,
          margin: 0,
        },
      },
    });
  }
}

function initImagesCarousal() {
  if ($("#imagescarousel .item").length) {
    $("#imagescarousel").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsiveClass: true,
      nav: true,
      dots: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
          //loop: false,
          margin: 0,
        },
      },
    });
  }
}

function initSimilarProductsCarousal() {
  if ($("#similarCarsCarousel .citem").length) {
    $("#similarCarsCarousel").owlCarousel({
      items: 1,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsiveClass: true,
      nav: true,
      dots: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 4,
          margin: 0,
        },
      },
    });
  }
}

function initBlogCarousal() {
  if ($(".blog-slider .slides li").length) {
    $(".blog-slider").flexslider({
      animation: "slide",
      animationSpeed: 2000,
      animationLoop: false,
      itemWidth: 201,
      itemMargin: 50,
      minItems: getGridSize(),
      maxItems: getGridSize(),
      start: function(slider) {
        $("body").removeClass("loading");
        flexslider = slider;
      },
    });
  }
}
/*function initSimilarProductsCarousal(){
	if($('.similar-products-slider .slides li').length){
		$('.similar-products-slider').flexslider({
			animation: "slide",
			animationSpeed: 500,
			animationLoop: false,
			itemWidth: 201,
			itemMargin:50,
			minItems: getGridSizeForProducts(),
			maxItems: getGridSizeForProducts(),
			start: function(slider){
				$('body').removeClass('loading');
				flexsliderProducts = slider;
			}
		});			
	}
}*/

function initSimilarProductsCarousalProductC() {
  if ($(".category_slider").length) {
    $(".category_slider").flexslider({
      animation: "slide",
      animationSpeed: 500,
      animationLoop: false,
      itemWidth: 201,
      itemMargin: 10,
      minItems: getGridSizeForProductsC(),
      maxItems: getGridSizeForProductsC(),
      directionNav: true,
      controlNav: false,
      start: function(slider) {
        $("body").removeClass("loading");
        flexsliderProductsC = slider;
      },
    });
  }
}

$window.load(function() {
  initSimilarProductsCarousal();
  initSimilarProductsCarousalProductC();
  initBlogCarousal();
  productPageSlider();
});

function hideModals() {
  $(".modal").modal("hide");
}

function productPageSlider() {
  if ($(".carousel .slides li").length) {
    $("#carousel").flexslider({
      animation: "slide",
      controlNav: false,
      animationLoop: false,
      slideshow: false,
      itemWidth: 100,
      // itemMargin: 5,
      asNavFor: "#slider",
    });

    $("#slider").flexslider({
      animation: "slide",
      controlNav: false,
      // itemWidth: 385,
      animationLoop: false,
      slideshow: false,
      sync: "#carousel",
    });
  }
}

// check grid size on resize event
$window.resize(function() {
  var gridSize = getGridSize();
  var gridSizeProducts = getGridSizeForProducts();
  var gridSizeProductsC = getGridSizeForProductsC();
  flexslider.vars.minItems = gridSize;
  flexslider.vars.maxItems = gridSize;
  flexsliderProducts.vars.minItems = gridSizeProducts;
  flexsliderProducts.vars.maxItems = gridSizeProducts;
  flexsliderProductsC.vars.minItems = gridSizeProductsC;
  flexsliderProductsC.vars.maxItems = gridSizeProductsC;
});
/*_______________________________________________________________________*/

/*
 *	Bootstrap carousel Script
 */
// Initiate the Bootstrap carousel
$(".multi-item-carousel").carousel({
  interval: false,
});

// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item.
$(".multi-item-carousel .item").each(function() {
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(":first");
  }
  next
    .children(":first-child")
    .clone()
    .appendTo($(this));

  if (next.next().length > 0) {
    next
      .next()
      .children(":first-child")
      .clone()
      .appendTo($(this));
  } else {
    $(this)
      .siblings(":first")
      .children(":first-child")
      .clone()
      .appendTo($(this));
  }
});
/*_______________________________________________________________________*/

function openProductCollapse() {
  var h = document.getElementById("headingOne");
  if (h) h.querySelector("a").click();
}

/*_______________________________________________________________________*/

/*
 *	Footer links slideup
 */
$(document).ready(function() {
  $(".page_links h5").click(function() {
    if ($(window).width() < 768) {
      $(this)
        .siblings(".list")
        .slideToggle();
      $(this).toggleClass("active");
      $(this)
        .parent(".page_links")
        .siblings()
        .find(".list")
        .slideUp();
      $(this)
        .parent(".page_links")
        .siblings()
        .find("h5")
        .removeClass("active");
    }
  });
  $(".navbar-default .navbar-toggle").click(function() {
    $("header").toggleClass("header_bg");
  });
  $(document).on("mouseenter", ".car_list", function() {
    // $('.car_list .list-overlay').show(); $(this).children('.list-overlay').hide();
  });
  $(document).on("mouseleave", ".car_list", function() {
    // $('.car_list .list-overlay').hide();
  });
});

$(document).on("click", function(e) {
  if (
    $(".autocomplete .list-group").length &&
    e.target.tagName.toLowerCase() != "input"
  ) {
    $(".autocomplete .list-group").css({ display: "none" });
  }
});
$(document).on("focus", ".autocomplete input", function() {
  $(".autocomplete .list-group").css({ display: "block" });
});

$(document).on("click", "header a", function() {
  $(".header_bg .navbar-toggle").trigger("click");
});

$(document).on(
  "click",
  "#prevTesimonial,#nextTesimonial,#carousel-example-generic .carousel-indicators li",
  function() {
    stopVideo(document);
    return;
  }
);

var stopVideo = function(element) {
  element.querySelectorAll("iframe").forEach(function(iframe) {
    var iframeSrc = iframe.src;
    iframe.src = iframeSrc;
  });
};

function initVideoSlider() {
  $("#carousel-example-generic").carousel({ interval: false });
}

function darkHeader(add) {
  if (add) {
    $("header").addClass("productDarkHeader");
  } else {
    $("header").removeClass("productDarkHeader");
  }
}
function resetFaqTab() {
  $(".panel.found").each(function(i, el) {
    if (i === 0) {
      var id = $(this)
        .parents(".tab-pane")
        .attr("id");
      console.log(id);
      $("a[href$='" + id + "']").click();
    }
  });
}

function notifyNow(title, body) {
  //   if(!title || !body) return;
  //   $.notify({
  //       title: title,
  //       body: body,
  //       destroy: true,
  //       showTime: 400,
  //       timeout: 3000,
  //       position: 'bottom-left',
  //       image : '/images/header.png',
  //       closeClick: true
  //     });
}

/*function resizeIframe(id) {
	obj =  document.getElementById(id);
	console.log(obj.contentWindow.document.documentElement.scrollHeight);
	obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
}*/

function initCountries(selector) {
  if ($(selector).length) {
    $(selector).countrySelect({
      defaultCountry: "fr",
      preferredCountries: ["ca", "gb", "us"],
    });
  }
}

function initLightbox(selector, options) {
  console.log(options);
  if ($(selector).length) $(selector).magnificPopup(options);
}

$(document).ready(function() {
  $(".dropdown-menu a.dropdown-toggle").on("click", function(e) {
    if (
      !$(this)
        .next()
        .hasClass("show")
    ) {
      $(this)
        .parents(".dropdown-menu")
        .first()
        .find(".show")
        .removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass("show");

    $(this)
      .parents("li.nav-item.dropdown.show")
      .on("hidden.bs.dropdown", function(e) {
        $(".dropdown-submenu .show").removeClass("show");
      });

    return false;
  });
});

function initDatePicker(elmt) {
  $("#" + elmt).datepicker({
    format: "mm/dd/yyyy",
    startDate: "-3d",
  });
}