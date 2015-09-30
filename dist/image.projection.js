(function($) {
    $.fn.imageProjection = function(customOptions) {
        "use strict";
        var self = this;
        var options = {};
        var defaultOptions = {
            className: "ip-container"
        };
        options = $.extend(defaultOptions, customOptions);
        this.addClass(options.className);
        var $image = this.find(">img");
        var widthRatio = 1;
        var heightRatio = 1;
        var $window = $(window);
        var surface = new Surface({
            $image: $image
        });
        var viewfinder;
        var projection = new Projection({
            imageUrl: $image.data("pimg") === "" ? $image.attr("src") : $image.data("pimg"),
            width: surface.width,
            height: surface.height,
            position: {
                left: surface.width + 30
            }
        });
        projection.$el.on("ip.projection.imageLoaded", function() {
            widthRatio = projection.image.width / surface.width;
            heightRatio = projection.image.height / surface.height;
            viewfinder = new Viewfinder({
                width: surface.width / widthRatio,
                height: surface.height / heightRatio,
                boundaries: {
                    width: surface.width,
                    height: surface.height
                }
            });
            surface.$el.append(viewfinder.$el);
            self.prepend(surface.$el);
            self.append(projection.$el);
        });
        surface.$el.hover(function(event) {
            viewfinder.show();
            projection.show();
        }, function(event) {
            viewfinder.hide();
            projection.hide();
        });
        surface.$el.mousemove(function(event) {
            var mousePosition = {};
            mousePosition.left = Math.floor(event.clientX - surface.getOffset().left + $window.scrollLeft());
            mousePosition.top = Math.floor(event.clientY - surface.getOffset().top + $window.scrollTop());
            viewfinder.setPosition(mousePosition);
            var projectionImagePosition = {};
            projectionImagePosition.left = viewfinder.position.left * -1 * widthRatio;
            projectionImagePosition.top = viewfinder.position.top * -1 * heightRatio;
            projection.setImagePosition(projectionImagePosition);
        });
        return this;
    };
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
        this.$el = $("<div/>", {
            "class": options.className
        });
        this.image = new Image();
        this.image.src = options.imageUrl;
        this.image.onload = function() {
            self.$el.trigger("ip.projection.imageLoaded");
            self.$el.css({
                "background-image": "url('" + self.image.src + "')",
                "background-repeat": "no-repeat",
                left: options.position.left
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
        };
    };
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
    };
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
            self.$el.width(options.width);
            self.$el.height(options.height);
        };
        this.show = function() {
            self.$el.addClass(options.className + "--shown");
        };
        this.hide = function() {
            self.$el.removeClass(options.className + "--shown");
        };
        this.destroy = function() {
            self.$el.remove();
        };
    }
})(window.jQuery);