var methods = {

  init: function(customOptions) {
    "use strict";

    return this.each(function(idx, el) {
      var container = new Container($(el), {
        className: "ip-container"
      });

      $(el).data("imageProjection", container);

    });

  },

  destroy: function() {
    "use strict";

    return this.each(function(idx, el) {
      var container = $(el).data("imageProjection");

      if(container) {
        container.destroy();
      }
    });

  }
};

$.fn.imageProjection = function(methodName, customOptions) {
  "use strict";

  if(methods[methodName]) {
    return methods[methodName].apply(this, Array.prototype.slice.call(arguments, 1));
  }
  else if(typeof methodName === "object" || !methodName) {
    return methods.init.apply(this, arguments);
  }
  else {
    $.error("Method " + methodName + " does not exist on this plugin");
  }

};

