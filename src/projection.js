if (typeof module!='undefined' && module.exports) var $ = require("jQuery");

var Projection = function(customOptions) {
  "use strict";

  var
    self = this,
    options = {},
    defaultOptions = {
      className: "ip-projection",
      imageUrl: "",
      width: 0,
      height: 0,
      position: {
        left: 0,
        top: 0
      }
    };

  options = $.extend(defaultOptions, customOptions);

  this.$el = $("<div/>",{
    class: options.className
  });

  this.$el.css({
    left: options.position.left,
    top: options.position.top
  });

  this.image = new Image();

  this.image.src = options.imageUrl;

  this.width = options.width;
  this.height = options.height;

  this.image.onload = function() {
    self.$el.css({
      "background-image": "url('" + self.image.src + "')",
      "background-repeat": "no-repeat"
    });

    self.$el.trigger("ip.projection.imageLoaded");
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
    self.$el = null;
  };

};

if (typeof module!='undefined' && module.exports) module.exports = Projection;
