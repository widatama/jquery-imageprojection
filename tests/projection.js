var tape = require("tape");
var $ = require("jQuery");
var Projection = require("../src/projection");

tape("Projection module", function(assert){
  var customOptions = {
    className: "ip-projection",
    // TODO: Set up asynchronous testing
    //imageUrl: "../images/sample-halved.jpg",
    imageUrl: "",
    position: {
      left: 20
    }
  };

  var backgroundImagePosition = {
    left: 20,
    top: 10
  };

  var projection = new Projection(customOptions);

  assert.ok(projection.image, "Image created");
  assert.notEqual(projection.width, undefined, "Width defined");
  assert.notEqual(projection.height, undefined, "Height defined");
  assert.ok(projection.$el, "jQuery object created");
  assert.ok(projection.$el.hasClass(customOptions.className), "jQuery object css class set");

  assert.equal(projection.$el.css("left"), customOptions.position.left + "px", "Left position set");
  assert.equal(projection.$el.css("top"), "", "Top position not set");

  projection.setImagePosition(backgroundImagePosition);
  assert.equal(projection.$el.css("background-position"), backgroundImagePosition.left + "px " + backgroundImagePosition.top + "px", "Image position moved");

  projection.hide();
  assert.notOk(projection.$el.hasClass(customOptions.className + "--shown"), "Element hidden");

  projection.show();
  assert.ok(projection.$el.hasClass(customOptions.className + "--shown"), "Element shown");

  projection.destroy();
  assert.notOk(projection.$el, "jQuery object removed");

  // TODO: Set up asynchronous testing
  //projection.$el.on("ip.projection.imageLoaded", function() {
    //assert.equal(projection.$el.css("background-image"), customOptions.imageUrl, "Background image set");
    //assert.equal(projection.$el.css("background-repeat"), "no-repeat", "Background no-repeat set");
  //});

  assert.end();
});
