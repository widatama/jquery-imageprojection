$.fn.imageProjection = function( $image, options ) {
  "use strict";

  // The image that will be projected
  var originImage = new Image();
  originImage.src = $image.attr("src");

  // The projection of original image
  // Ideally the size is proportional to the original
  var projectedImage = new Image();

  var pWidth = originImage.width;
  var pHeight = originImage.height;

  // The ratio of original image to projected image, defaulted to one
  var widthRatio = 1;
  var heightRatio = 1;

  var $window = $(window);

  // The surface where viewfinder will be attached
  var $surface = this;
  var surfaceOffset = this.offset();

  // Making sure that everything works
  $surface.parent().css({
    position: "relative"
  });

  // Create the viewfinder and projected image container
  var viewfinder;
  var $projection = $("<div id='ip-projection'></div>");

  projectedImage.onload = function(){

    // Recalculate the ratio
    widthRatio = projectedImage.width / originImage.width;
    heightRatio = projectedImage.height / originImage.height;

    // Create viewfinder
    viewfinder = new Viewfinder({
      width: pWidth / widthRatio,
      height: pHeight / heightRatio,
      boundaries: {
        width: $surface.width(),
        height: $surface.height()
      }
    });

    // Set projection size
    $projection.width( pWidth );
    $projection.height( pHeight );

    // Set projection position and place the image as background
    $projection.css({
      background: ("url('" + projectedImage.src + "') no-repeat 0 0"),
      display: "none",
      position: "absolute",
      left: $surface.width() + 30,
      top: 0,
      "z-index": 3
    });

    // Making sure that there are only one viewfinder and one projection
    //$surface.find("#ip-viewfinder").remove();
    $surface.parent().find("#ip-projection").remove();

    // Put viewfinder and projection on their respective places
    // TODO: Improve dom building
    $surface.append(viewfinder.$el);
    $surface.parent().append($projection);

  };

  // Set up the projection image
  projectedImage.src = $image.data("pimg") === "" ? $image.attr("src") : $image.data("pimg");

  // Toggle the viewfinder and projection whenever the mouse cursor is inside the surface
  this.hover(
    function( event ){
      viewfinder.show(500);
      $projection.fadeIn(500);
    },
    function( event ){
      viewfinder.hide(250);
      $projection.fadeOut(250);
    }
  );

  this.mousemove(function(event){

    // Whenever the mouse cursor is hovering the surface, update viewfinder position

    var mousePosition = {};

    mousePosition.left = Math.floor(event.clientX - surfaceOffset.left + $window.scrollLeft());
    mousePosition.top = Math.floor(event.clientY - surfaceOffset.top + $window.scrollTop());

    viewfinder.setPosition(mousePosition);

  });

  // Adjust the projected image as we move around the viewfinder.
  //$projection.css("background-position", ((viewfinderLeft) * -1 * widthRatio) + "px" + " " + ((viewfinderTop) * -1 * heightRatio) + "px");

  return this;

};

