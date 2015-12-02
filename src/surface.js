// REMOVE START //
if (typeof module!='undefined' && module.exports) var $ = require("jQuery");
// REMOVE END //
var Surface = function(customOptions) {
  "use strict";

  var
    self = this,
    options = {},
    defaultOptions = {
      className: "ip-surface"
    };

  options = $.extend(defaultOptions, customOptions);

  this.image = new Image();
  this.image.src = options.$image.attr("src");

  this.width = this.image.width;
  this.height = this.image.height;

  this.$el = $("<div/>", {
    class: options.className,
    width: self.width,
    height: self.height
  });


  // Instance methods

  $.extend(Surface.prototype, {

    getOffset: function() {
      return this.$el.offset();
    },

    destroy: function() {
      this.$el.remove();
      this.$el = null;
    }

  });

};
// REMOVE START //
if (typeof module!='undefined' && module.exports) module.exports = Surface;
// REMOVE END //
