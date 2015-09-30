$.fn.imageProjection = function(customOptions) {
  "use strict";

  var self = this;

  var options = {};

  var defaultOptions = {
    className: "ip-container"
  };

  options = $.extend(defaultOptions, customOptions);

  // Container should be relatively positioned, class name is assigned
  // so it can be handled with css
  this.addClass(options.className);

  var $image = this.find(">img");

  //var pWidth = originImage.width;
  //var pHeight = originImage.height;

  // The ratio of original image to projected image, default is one
  var widthRatio = 1;
  var heightRatio = 1;

  var $window = $(window);

  // The surface where viewfinder will be attached
  var surface = new Surface({
    "$image": $image
  });

  // Create the viewfinder and projection
  var viewfinder;
  var projection = new Projection({
    imageUrl: $image.data("pimg") === "" ? $image.attr("src") : $image.data("pimg"),
    width: surface.width,
    height: surface.height,
    position: {
      left: surface.width + 30
    }
  });

  // When projected image is loaded
  projection.$el.on("ip.projection.imageLoaded", function() {

    // Recalculate the ratio
    widthRatio = projection.image.width / surface.width;
    heightRatio = projection.image.height / surface.height;

    // Initiate viewfinder
    viewfinder = new Viewfinder({
      width: surface.width / widthRatio,
      height: surface.height / heightRatio,
      boundaries: {
        width: surface.width,
        height: surface.height
      }
    });

    // TODO: Make sure that there are only one viewfinder and one projection

    // Put viewfinder and projection on their respective places
    // TODO: Improve dom building
    surface.$el.append(viewfinder.$el);
    self.prepend(surface.$el);
    self.append(projection.$el);

  });


  // Toggle the viewfinder and projection whenever the mouse cursor is inside the surface
  surface.$el.hover(
    function(event) {
      viewfinder.show();
      projection.show();
    },
    function(event) {
      viewfinder.hide();
      projection.hide();
    }
  );

  surface.$el.mousemove(function(event){

    // Adjust viewfinder position as we move around the surface

    var mousePosition = {};

    mousePosition.left = Math.floor(event.clientX - surface.getOffset().left + $window.scrollLeft());
    mousePosition.top = Math.floor(event.clientY - surface.getOffset().top + $window.scrollTop());

    viewfinder.setPosition(mousePosition);


    // Adjust the projected image as we move around the viewfinder.

    var projectionImagePosition = {};

    projectionImagePosition.left = viewfinder.position.left * -1 * widthRatio;
    projectionImagePosition.top = viewfinder.position.top * -1 * heightRatio;

    projection.setImagePosition(projectionImagePosition);

  });

  return this;

};

