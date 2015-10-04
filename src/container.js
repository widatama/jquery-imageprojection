if (typeof module!='undefined' && module.exports) {
  var $ = require("jQuery");
  var Surface = require("./surface");
  var Viewfinder = require("./viewfinder");
  var Projection = require("./projection");
}

var Container = function($el, customOptions) {
  "use strict";

  var self = this;

  var options = {};

  var defaultOptions = {
    className: "ip-container"
  };

  options = $.extend(defaultOptions, customOptions);

  this.$el = $el;

  // Container should be relatively positioned, class name is assigned
  // so it can be handled with css
  $el.addClass(options.className);

  var $image = $el.find("img.ip-source-image");

  // The ratio of original image to projected image, default is one
  var widthRatio = 1;
  var heightRatio = 1;

  var $window = $(window);

  // Event handlers
  var setup = function() {
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
  };

  var mouseIn = function() {
    self.viewfinder.show();
    self.projection.show();
  };

  var mouseOut = function() {
    self.viewfinder.hide();
    self.projection.hide();
  };

  var mouseMove = function(event) {
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
  };

  // Create the surface
  this.surface = new Surface({
    "$image": $image
  });

  // Create the viewfinder and projection
  this.viewfinder = new Viewfinder({
    boundaries: {
      width: self.surface.width,
      height: self.surface.height
    }
  });

  this.projection = new Projection({
    imageUrl: $image.data("pimg") === "" ? $image.attr("src") : $image.data("pimg"),
    width: self.surface.width,
    height: self.surface.height,
    position: {
      left: self.surface.width + 30
    }
  });

  // When projected image is loaded
  this.projection.$el.on("ip.projection.imageLoaded", setup);

  // Toggle the viewfinder and projection whenever the mouse cursor is inside the surface
  this.surface.$el.hover(mouseIn, mouseOut);

  this.surface.$el.mousemove(mouseMove);

  this.destroy = function() {
    self.projection.destroy();
    self.viewfinder.destroy();
    self.surface.destroy();
  };

};

if (typeof module!='undefined' && module.exports) module.exports = Container;
