(function($) {
    if (typeof module != "undefined" && module.exports) {
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
        $el.addClass(options.className);
        var $image = $el.find("img.ip-source-image");
        var widthRatio = 1;
        var heightRatio = 1;
        var $window = $(window);
        var setup = function() {
            widthRatio = self.projection.image.width / self.surface.width;
            heightRatio = self.projection.image.height / self.surface.height;
            self.viewfinder.setSize({
                width: self.surface.width / widthRatio,
                height: self.surface.height / heightRatio
            });
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
            var mousePosition = {};
            mousePosition.left = Math.floor(event.clientX - self.surface.getOffset().left + $window.scrollLeft());
            mousePosition.top = Math.floor(event.clientY - self.surface.getOffset().top + $window.scrollTop());
            self.viewfinder.setPosition(mousePosition);
            var projectionImagePosition = {};
            projectionImagePosition.left = self.viewfinder.position.left * -1 * widthRatio;
            projectionImagePosition.top = self.viewfinder.position.top * -1 * heightRatio;
            self.projection.setImagePosition(projectionImagePosition);
        };
        this.surface = new Surface({
            $image: $image
        });
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
        this.projection.$el.on("ip.projection.imageLoaded", setup);
        this.surface.$el.hover(mouseIn, mouseOut);
        this.surface.$el.mousemove(mouseMove);
        this.destroy = function() {
            self.projection.destroy();
            self.viewfinder.destroy();
            self.surface.destroy();
        };
    };
    if (typeof module != "undefined" && module.exports) module.exports = Container;
    if (typeof module != "undefined" && module.exports) var $ = require("jQuery");
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
            "class": options.className,
            width: self.width,
            height: self.height
        });
        this.getOffset = function() {
            return self.$el.offset();
        };
        this.destroy = function() {
            self.$el.remove();
            self.$el = null;
        };
    };
    if (typeof module != "undefined" && module.exports) module.exports = Surface;
    if (typeof module != "undefined" && module.exports) var $ = require("jQuery");
    var Projection = function(customOptions) {
        "use strict";
        var self = this;
        var options = {};
        var defaultOptions = {
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
        this.$el = $("<div/>", {
            "class": options.className
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
            self.$el.trigger("ip.projection.imageLoaded");
            self.$el.css({
                "background-image": "url('" + self.image.src + "')",
                "background-repeat": "no-repeat"
            });
        };
        this.setImagePosition = function(position) {
            self.$el.css({
                "background-position": position.left + "px " + position.top + "px"
            });
        };
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
    if (typeof module != "undefined" && module.exports) module.exports = Projection;
    if (typeof module != "undefined" && module.exports) var $ = require("jQuery");
    var Viewfinder = function(customOptions) {
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
            "class": options.className
        });
        this.$el.width(options.width);
        this.$el.height(options.height);
        this.position = {};
        var calculatePosition = function(mousePosition) {
            var position = {};
            position.left = mousePosition.left - self.$el.width() / 2;
            position.top = mousePosition.top - self.$el.height() / 2;
            position.left = Math.max(position.left, 0);
            position.top = Math.max(position.top, 0);
            position.left = Math.min(position.left, options.boundaries.width - self.$el.outerWidth());
            position.top = Math.min(position.top, options.boundaries.height - self.$el.outerHeight());
            return position;
        };
        this.setPosition = function(mousePosition) {
            self.position = calculatePosition(mousePosition);
            self.$el.css({
                left: self.position.left + "px",
                top: self.position.top + "px"
            });
        };
        this.setSize = function(size) {
            self.$el.width(size.width);
            self.$el.height(size.height);
        };
        this.show = function() {
            self.$el.addClass(options.className + "--shown");
        };
        this.hide = function() {
            self.$el.removeClass(options.className + "--shown");
        };
        this.destroy = function() {
            self.$el.remove();
            self.$el = null;
        };
    };
    if (typeof module != "undefined" && module.exports) module.exports = Viewfinder;
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
                if (container) {
                    container.destroy();
                }
            });
        }
    };
    $.fn.imageProjection = function(methodName, customOptions) {
        "use strict";
        if (methods[methodName]) {
            return methods[methodName].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodName === "object" || !methodName) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + methodName + " does not exist on this plugin");
        }
    };
})(window.jQuery);