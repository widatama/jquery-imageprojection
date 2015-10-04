var tape = require("tape");
var $ = require("jQuery");
var Surface = require("../src/surface");

function setup(className) {
  var $img = $("<img/>", {
    src: "../images/sample-halved.jpg"
  });

  return new Surface({
    "$image": $img,
    className: className
  });
}

tape("Surface module", function(assert){
  var className = "ip-surface";
  var surface = setup(className);

  assert.ok(surface.image, "Image created");
  assert.notEqual(surface.width, undefined, "Width defined");
  assert.notEqual(surface.height, undefined, "Height defined");
  assert.ok(surface.$el, "jQuery object created");
  assert.ok(surface.$el.hasClass(className), "jQuery object css class set");
  assert.ok(surface.getOffset(), "Offset returned");

  surface.destroy();
  assert.notOk(surface.$el, "jQuery object removed");

  assert.end();
});
