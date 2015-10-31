if (typeof module!='undefined' && module.exports) {
  var $ = require("jQuery");
  var Surface = require("./surface");
  var Viewfinder = require("./viewfinder");
  var Projection = require("./projection");
}

var Container = function($el, customOptions) {
  "use strict";

  var
    self = this,
    options = {},
    $image = {},
    // The ratio of original image to projected image, default is one
    widthRatio = 1,
    heightRatio = 1,
    $window = $(window),
    defaultOptions = {
      className: "ip-container"
    };

  // Event handlers
  function buildDOM() {
    // Recalculate the ratio
    widthRatio = self.projection.image.width / self.surface.width;
    heightRatio = self.projection.image.height / self.surface.height;

    // Set viewfinder size
    self.viewfinder.setSize({
      width: self.surface.width / widthRatio,
      height: self.surface.height / heightRatio
    });

    // TODO: Make sure that there is only one viewfinder and one projection

    // Put viewfinder and projection on their respective places
    // TODO: Improve dom building
    self.surface.$el.append(self.viewfinder.$el);
    self.$el.prepend(self.surface.$el);
    self.$el.append(self.projection.$el);
  }

  function mouseIn() {
    self.viewfinder.show();
    self.projection.show();
  }

  function mouseOut() {
    self.viewfinder.hide();
    self.projection.hide();
  }

  function mouseMove(event) {
    // Adjust viewfinder position as we move around the surface

    var mousePosition = {};

    mousePosition.left = Math.floor(event.clientX - self.surface.getOffset().left + $window.scrollLeft());
    mousePosition.top = Math.floor(event.clientY - self.surface.getOffset().top + $window.scrollTop());

    self.viewfinder.setPosition(mousePosition);


    // Adjust the projected image as we move around the viewfinder.

    var projectionImagePosition = {};

    projectionImagePosition.left = self.viewfinder.position.left * -1 * widthRatio;
    projectionImagePosition.top = self.viewfinder.position.top * -1 * heightRatio;

    self.projection.setImagePosition(projectionImagePosition);
  }

  options = $.extend(defaultOptions, customOptions);

  this.$el = $el;

  // Container should be relatively positioned, class name is assigned so it can be handled with css
  $el.addClass(options.className);

  $image = $el.find("img.ip-source-image");

  // Create the surface
  this.surface = new Surface({
    "$image": $image
  });

  // Create the viewfinder
  this.viewfinder = new Viewfinder({
    boundaries: {
      width: self.surface.width,
      height: self.surface.height
    }
  });

  // Create the projection
  this.projection = new Projection({
    imageUrl: $image.data("pimg") === "" ? $image.attr("src") : $image.data("pimg"),
    width: self.surface.width,
    height: self.surface.height,
    position: {
      left: self.surface.width + 30
    }
  });

  // Build DOM when projection image is loaded
  this.projection.$el.on("ip.projection.imageLoaded", buildDOM);

  // Show/hide the viewfinder and projection when the mouse cursor is inside/outside the surface
  this.surface.$el.hover(mouseIn, mouseOut);

  // Handle viewfinder and projection display whenever the mouse cursor is moving inside the surface
  this.surface.$el.mousemove(mouseMove);


  // Instance methods

  $.extend(Container.prototype, {

    destroy: function() {
      this.projection.destroy();
      this.viewfinder.destroy();
      this.surface.destroy();
    }

  });

};

if (typeof module!='undefined' && module.exports) module.exports = Container;
