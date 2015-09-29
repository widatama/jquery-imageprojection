$.fn.imageProjection = function( $image, options ) {
  "use strict";

  // The image that will be projected
  var originImage = new Image();
  originImage.src = $image.attr("src");

  var pWidth = originImage.width;
  var pHeight = originImage.height;

  // The ratio of original image to projected image, default is one
  var widthRatio = 1;
  var heightRatio = 1;

  var $window = $(window);

  // The surface where viewfinder will be attached
  var $surface = this;
  var surfaceOffset = this.offset();

  // Making sure that viewfinder and projection positioning works
  $surface.parent().css({
    position: "relative"
  });

  // Create the viewfinder and projection
  var viewfinder;
  var projection = new Projection({
    imageUrl: $image.data("pimg") === "" ? $image.attr("src") : $image.data("pimg"),
    width: originImage.width,
    height: originImage.height,
    position: {
      left: $surface.width() + 30
    }
  });

  // When projected image is loaded
  projection.$el.on("ip.projection.imageLoaded", function() {

    // Recalculate the ratio
    widthRatio = projection.image.width / originImage.width;
    heightRatio = projection.image.height / originImage.height;

    // Initiate viewfinder
    viewfinder = new Viewfinder({
      width: pWidth / widthRatio,
      height: pHeight / heightRatio,
      boundaries: {
        width: $surface.width(),
        height: $surface.height()
      }
    });

    // TODO: Make sure that there are only one viewfinder and one projection

    // Put viewfinder and projection on their respective places
    // TODO: Improve dom building
    $surface.append(viewfinder.$el);
    $surface.parent().append(projection.$el);

  });


  // Toggle the viewfinder and projection whenever the mouse cursor is inside the surface
  this.hover(
    function( event ){
      viewfinder.show();
      projection.show();
    },
    function( event ){
      viewfinder.hide();
      projection.hide();
    }
  );

  this.mousemove(function(event){

    // Adjust viewfinder position as we move around the surface

    var mousePosition = {};

    mousePosition.left = Math.floor(event.clientX - surfaceOffset.left + $window.scrollLeft());
    mousePosition.top = Math.floor(event.clientY - surfaceOffset.top + $window.scrollTop());

    viewfinder.setPosition(mousePosition);


    // Adjust the projected image as we move around the viewfinder.

    var projectionImagePosition = {};

    projectionImagePosition.left = viewfinder.position.left * -1 * widthRatio;
    projectionImagePosition.top = viewfinder.position.top * -1 * heightRatio;

    projection.setImagePosition(projectionImagePosition);

  });


  return this;

};

