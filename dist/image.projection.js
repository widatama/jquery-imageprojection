(function($) {
    $.fn.imageProjection = function($image, options) {
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
        var $viewfinder = $("<div id='ip-viewfinder'></div>");
        var $projection = $("<div id='ip-projection'></div>");
        projectedImage.onload = function() {
            widthRatio = projectedImage.width / originImage.width;
            heightRatio = projectedImage.height / originImage.height;
            $viewfinder.width(pWidth * (1 / widthRatio));
            $viewfinder.height(pHeight * (1 / heightRatio));
            $viewfinder.css({
                position: "absolute",
                "z-index": 3,
                display: "none"
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
            $surface.find("#viewfinder").remove();
            $surface.parent().find("#projection").remove();
            $surface.append($viewfinder);
            $surface.parent().append($projection);
        };
        projectedImage.src = $image.data("pimg") == "" ? $image.attr("src") : $image.data("pimg");
        this.hover(function(event) {
            $viewfinder.fadeIn(500);
            $projection.fadeIn(500);
        }, function(event) {
            $viewfinder.fadeOut(250);
            $projection.fadeOut(250);
        });
        this.mousemove(function(event) {
            var windowScrollTop = $window.scrollTop();
            var windowScrollLeft = $window.scrollLeft();
            setViewfinderPosition(Math.floor(event.clientX - surfaceOffset.left + windowScrollLeft), Math.floor(event.clientY - surfaceOffset.top + windowScrollTop));
        });
        function setViewfinderPosition(mouseLeft, mouseTop) {
            var viewfinderLeft = mouseLeft - $viewfinder.width() / 2;
            var viewfinderTop = mouseTop - $viewfinder.height() / 2;
            viewfinderLeft = Math.max(viewfinderLeft, 0);
            viewfinderTop = Math.max(viewfinderTop, 0);
            viewfinderLeft = Math.min(viewfinderLeft, $surface.width() - $viewfinder.outerWidth());
            viewfinderTop = Math.min(viewfinderTop, $surface.height() - $viewfinder.outerHeight());
            $viewfinder.css({
                left: viewfinderLeft + "px",
                top: viewfinderTop + "px"
            });
            $projection.css("background-position", viewfinderLeft * -1 * widthRatio + "px" + " " + viewfinderTop * -1 * heightRatio + "px");
        }
        return this;
    };
})(window.jQuery);