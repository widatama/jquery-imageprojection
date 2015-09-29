var Projection = function(customOptions) {
  "use strict";

  var self = this;

  var options = {};

  var defaultOptions = {
    className: "ip-projection",
    imageUrl: "",
    width: 1,
    height: 1,
    position: {
      left: 0,
      top: 0
    }
  };

  options = $.extend(defaultOptions, customOptions);

  this.$el = $("<div/>",{
    class: options.className
  });

  this.image = new Image();

  this.image.src = options.imageUrl;

  this.image.onload = function() {
    self.$el.trigger("ip.projection.imageLoaded");

    self.$el.css({
      "background-image": "url('" + self.image.src + "')",
      "background-repeat": "no-repeat",
      left: options.position.left,
    });
  };

  this.setImagePosition = function(position) {
    self.$el.css({
      "background-position": position.left + "px " + position.top + "px"
    });
  };

  // Show/hide viewfinder using class so it can be handled with css
  this.show = function() {
    self.$el.addClass(options.className + "--shown");
    self.$el.css({
      width: options.width,
      height: options.height
    });
  };

  this.hide = function() {
    self.$el.removeClass(options.className + "--shown");
    self.$el.css({
      width: 0,
      height: 0
    });
  };

  this.destroy = function() {
    self.$el.remove();
  };

};
