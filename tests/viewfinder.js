var tape = require("tape");
var $ = require("jQuery");
var Viewfinder = require("../src/viewfinder");

tape("Viewfinder module", function(assert) {
  var customOptions = {
    className: "ip-viewfinder"
  };

  var viewfinder = new Viewfinder(customOptions);

  assert.ok(viewfinder.$el, "jQuery object created");
  assert.ok(viewfinder.$el.hasClass(customOptions.className), "jQuery object css class set");
  assert.ok(viewfinder.$el.width(), "Element width set");
  assert.ok(viewfinder.$el.height(), "Element height set");

  var currentPosition = viewfinder.position;
  var mousePosition = {left: 50, top: 60};
  viewfinder.setPosition(mousePosition);
  assert.notEqual(viewfinder.position, currentPosition, "Element moved");

  var newSize = {width: 200, height: 200};
  viewfinder.setSize(newSize);
  assert.equal(viewfinder.$el.width(), newSize.width, "Element width changed");
  assert.equal(viewfinder.$el.height(), newSize.height, "Element height changed");

  viewfinder.hide();
  assert.notOk(viewfinder.$el.hasClass(customOptions.className + "--shown"), "Element hidden");

  viewfinder.show();
  assert.ok(viewfinder.$el.hasClass(customOptions.className + "--shown"), "Element shown");

  viewfinder.destroy();
  assert.notOk(viewfinder.$el, "jQuery object removed");

  assert.end();
});
