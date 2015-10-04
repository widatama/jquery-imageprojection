var tape = require("tape");
var $ = require("jQuery");
var Container = require("../src/container");

tape("Container module", function(assert) {
  var customOptions = {
    className: "ip-container"
  };
  var $container = $("<div/>");
  var $image = $("<img/>", {
    src: "../images/sample-halved.jpg",
    class: "ip-source-image"
  });

  $container.append($image);

  var container = new Container($container, customOptions);

  assert.ok(container.$el, "jQuery object created");
  assert.ok(container.$el.hasClass(customOptions.className), "jQuery object css class set");
  assert.ok(container.surface, "Surface created");
  assert.ok(container.viewfinder, "Viewfinder created");
  assert.ok(container.projection, "Projection created");

  assert.end();
});
