var tape = require("tape");

tape("abcd", function(assert){
  assert.pass("pass");
  assert.end();
})

//if (typeof module!='undefined' && module.exports) module.exports = MyObj;
