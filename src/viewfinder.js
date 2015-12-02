// REMOVE START //
if (typeof module!='undefined' && module.exports) var $ = require("jQuery");
// REMOVE END //
var Viewfinder = function(customOptions) {
  "use strict";

  var
    self = this,
    options = {},
    defaultOptions = {
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

  this.$el.width(options.width);
  this.$el.height(options.height);

  this.position = {};

  // Calculate viewfinder position based on mouse position
  function calculatePosition(mousePosition) {
    var position = {};

    // Calculate viewfinder position while keeping the mouse pointer at the center of viewfinder
    position.left = (mousePosition.left - (self.$el.width() / 2));
    position.top = (mousePosition.top - (self.$el.height() / 2));

    // Keep viewfinder from getting out of top or left boundaries
    position.left = Math.max(position.left, 0);
    position.top = Math.max(position.top, 0);

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
  }


  // Instance methods

  $.extend(Viewfinder.prototype, {

    setPosition: function(mousePosition) {
      this.position = calculatePosition(mousePosition);

      this.$el.css({
        left: (this.position.left + "px"),
        top: (this.position.top + "px")
      });
    },

    setSize: function(size) {
      this.$el.width(size.width);
      this.$el.height(size.height);
    },

    // Show/hide viewfinder using class so it can be handled with css
    show: function() {
      this.$el.addClass(options.className + "--shown");
    },

    hide: function() {
      this.$el.removeClass(options.className + "--shown");
    },

    destroy: function() {
      this.$el.remove();
      this.$el = null;
    }

  });

};
// REMOVE START //
if (typeof module!='undefined' && module.exports) module.exports = Viewfinder;
// REMOVE END //
