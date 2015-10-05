module.exports = function(grunt) {

  require("load-grunt-config")(grunt, {
    data: {
      srcDir: "src",
      buildDir: "dist"
    }
  });

  grunt.registerTask("build", ["clean:dist", "uglify", "copy"]);
  grunt.registerTask("dev", ["build", "watch"]);
  grunt.registerTask("default", "build");
};
