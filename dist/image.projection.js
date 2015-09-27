(function($) {
    $.fn.imageProjection = function($image, options) {
        "use strict";
        var originImage = new Image();
        originImage.src = $image.attr("src");
        var projectedImage = new Image();
        var pWidth = originImage.width;
        var pHeight = originImage.height;
        var widthRatio = 1;
        var heightRatio = 1;
        var $window = $(window);
        var $surface = this;
        var surfaceOffset = this.offset();
        $surface.parent().css({
            position: "relative"
        });
        var viewfinder;
        var $projection = $("<div id='ip-projection'></div>");
        projectedImage.onload = function() {
            widthRatio = projectedImage.width / originImage.width;
            heightRatio = projectedImage.height / originImage.height;
            viewfinder = new Viewfinder({
                width: pWidth / widthRatio,
                height: pHeight / heightRatio,
                boundaries: {
                    width: $surface.width(),
                    height: $surface.height()
                }
            });
            $projection.width(pWidth);
            $projection.height(pHeight);
            $projection.css({
                background: "url('" + projectedImage.src + "') no-repeat 0 0",
                display: "none",
                position: "absolute",
                left: $surface.width() + 30,
                top: 0,
                "z-index": 3
            });
            $surface.parent().find("#ip-projection").remove();
            $surface.append(viewfinder.$el);
            $surface.parent().append($projection);
        };
        projectedImage.src = $image.data("pimg") === "" ? $image.attr("src") : $image.data("pimg");
        this.hover(function(event) {
            viewfinder.show(500);
            $projection.fadeIn(500);
        }, function(event) {
            viewfinder.hide(250);
            $projection.fadeOut(250);
        });
        this.mousemove(function(event) {
            var mousePosition = {};
            mousePosition.left = Math.floor(event.clientX - surfaceOffset.left + $window.scrollLeft());
            mousePosition.top = Math.floor(event.clientY - surfaceOffset.top + $window.scrollTop());
            viewfinder.setPosition(mousePosition);
        });
        return this;
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
            var position = calculatePosition(mousePosition);
            self.$el.css({
                left: position.left + "px",
                top: position.top + "px"
            });
        };
        this.setSize = function(size) {
            self.$el.width(options.width);
            self.$el.height(options.height);
        };
        this.show = function(delay) {
            self.$el.addClass("ip-viewfinder--shown");
        };
        this.hide = function(delay) {
            self.$el.removeClass("ip-viewfinder--shown");
        };
    }
})(window.jQuery);