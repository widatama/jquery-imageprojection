var Surface = function(customOptions) {
  "use strict";

  var self = this;

  var options = {};

  var defaultOptions = {
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

  this.getOffset = function() {
    return self.$el.offset();
  };

  this.destroy = function() {
    self.$el.remove();
  };

};
