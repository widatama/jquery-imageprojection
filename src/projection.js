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


  // Instance methods

  $.extend(Projection.prototype, {

    setImagePosition: function(position) {
      this.$el.css({
        "background-position": position.left + "px " + position.top + "px"
      });
    },

    // Show/hide viewfinder using class so it can be handled with css
    show: function() {
      this.$el.addClass(options.className + "--shown");
      this.$el.css({
        width: options.width,
        height: options.height
      });
    },

    hide: function() {
      this.$el.removeClass(options.className + "--shown");
      this.$el.css({
        width: 0,
        height: 0
      });
    },

    destroy: function() {
      this.$el.remove();
      this.$el = null;
    }

  });

};

if (typeof module!='undefined' && module.exports) module.exports = Projection;
