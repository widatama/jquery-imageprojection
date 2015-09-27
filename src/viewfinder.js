function Viewfinder(customOptions) {
  "use strict";

  var self = this;

  var options = {};

  var defaultOptions = {
    className: "ip-viewfinder",
    width: 1,
    height: 1,
    boundaries: {
      width: 100,
      height: 100
    }
  };

  options = $.extend(defaultOptions, customOptions);

  this.$el = $("<div/>", {
    class: options.className
  });

  //this.$el.css(options.style);

  this.$el.width(options.width);
  this.$el.height(options.height);

  // Calculate viewfinder position based on mouse position
  var calculatePosition = function(mousePosition) {
    var position = {};

    // Calculate viewfinder position while keeping the mouse pointer at the center of viewfinder
    position.left = (mousePosition.left - (self.$el.width() / 2));
    position.top = (mousePosition.top - (self.$el.height() / 2));

    // Keep viewfinder from getting out of top or left boundaries
    position.left = Math.max( position.left, 0 );
    position.top = Math.max( position.top, 0 );

    // Keep viewfinder from getting out of bottom or right boundaries
    position.left = Math.min(
      position.left,
      (options.boundaries.width - self.$el.outerWidth())
    );
    position.top = Math.min(
      position.top,
      (options.boundaries.height - self.$el.outerHeight())
    );

    return position;
  };

  // public

  this.setPosition = function(mousePosition) {
    var position = calculatePosition(mousePosition);

    self.$el.css({
      left: (position.left + "px"),
      top: (position.top + "px")
    });
  };

  this.setSize = function(size) {
    self.$el.width(options.width);
    self.$el.height(options.height);
  };

  // Show/hide viewfinder using class so it can be handled with css
  this.show = function(delay) {
    self.$el.addClass(options.className + "--shown");
  };

  this.hide = function(delay) {
    self.$el.removeClass(options.className + "--shown");
  };

  this.destroy = function() {
    self.$el.remove();
  };

}
